import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

process.on('unhandledRejection', (reason) => {
  console.warn('Recovered from unhandled network/promise rejection:', reason);
});

// Safely resolve Gemini API Key from environment variables
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '').trim();

if (GEMINI_API_KEY) {
  console.log('Gemini API key loaded successfully from environment variables.');
} else {
  console.warn('⚠️ Warning: GEMINI_API_KEY is not defined in environment variables. Coach features will use intelligent rule-based fallback responses.');
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY || 'unconfigured_key',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for fallback coach advice if API key is not yet set or model request fails
function generateFallbackFeedback(testResult: any, playerName: string = 'كابتن البادل') {
  // Find pillar with lowest score percentage
  const pillars = testResult?.pillarBreakdown || {};
  const pillarKeys = ['serve_return', 'net_volleys', 'overhead_shots', 'wall_defense', 'tactics_positioning'];
  
  let lowestPillarKey = 'wall_defense';
  let lowestScore = 999;
  
  for (const key of pillarKeys) {
    if (pillars[key] && typeof pillars[key].percentage === 'number') {
      if (pillars[key].percentage < lowestScore) {
        lowestScore = pillars[key].percentage;
        lowestPillarKey = key;
      }
    }
  }

  const pillarNames: Record<string, string> = {
    serve_return: 'الإرسال واستقبال الإرسال (Serve & Return)',
    net_volleys: 'لعب الشبكة والكرات الهوائية (Net Play & Volleys)',
    overhead_shots: 'الكرات العلوية - البانديخا والفيبورا (Overhead Shots)',
    wall_defense: 'ارتداد الزجاج واللعب الدفاعي (Wall Defense)',
    tactics_positioning: 'التمركز التكتيكي والتناغم مع الزميل (Court Tactics)',
  };

  const adviceByPillar: Record<string, any> = {
    wall_defense: {
      headlineAr: `كوتش التحليل الفني: ارتداد الزجاج هو مفتاح صعودك لمستوى Playtomic أعلى!`,
      urgencyReasonAr: 'أظهرت إجاباتك تردداً عند كرات الزجاج المزدوج (Doble Pared) والكرات ذات الارتداد العميق. التحكم في دفاع الزجاج يمنحك هدوءاً يربك المنافسين ويقلل أخطاءك السهلة بنسبة 40%.',
      playtomicGrowthPotential: '+0.50 إلى +0.75 درجة Playtomic',
      detailedAnalysisAr: `تحليلك يوضح أنك تهاجم بشكل جيد عند الشبكة، لكن عند إجبارك على العودة إلى الخط الخلفي تبدأ المعاناة. الخطأ الشائع هو ضرب الكرة قبل اكتمال ارتدادها من الزجاج أو الوقوف قريباً جداً من الزجاج الخلفي. يحتاج تركيزك التدريبي هذا الأسبوع إلى تمارين الترقب، وانتظار الكرة لتتجاوز جسمك مع قراءة زاوية الخروج.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين الزجاج الخلفي الفردي (Pared de Fondo)',
          repsOrDuration: '20 دقيقة - 3 جولات',
          focusGoalAr: 'انتظار الكرة لتصل إلى قمة ارتدادها بعد الزجاج قبل تسديد اللوب أو الباخادا.',
          proTipAr: 'حافظ على ركبتيك مثنيتين ووجه المضرب مائلاً للأعلى قليلاً لتوليد لوب عميق.'
        },
        {
          titleAr: 'قراءة الزجاج المزدوج الافتتاحي (Doble Pared que abre)',
          repsOrDuration: '15 دقيقة',
          focusGoalAr: 'الدوران مع مسار الكرة بدلاً من ملاحقتها بالعين فقط.',
          proTipAr: 'اتبع الكرة بحركة دائرية سريعة بالقدمين لتكون دائماً خلف الكرة عند خروجها من الزاوية.'
        },
        {
          titleAr: 'لعبة الحفاظ على النقطة من الخط الخلفي',
          repsOrDuration: '25 دقيقة مباراة تدريبية',
          focusGoalAr: 'ممنوع لعب كرات هجومية متسرعة؛ الهدف هو كسب النقطة باللوب المتقن والكرات المنخفضة في الأرجل (Chiquita).'
        }
      ],
      partnerTacticsAr: 'تواصل صوتياً بوضوح مع زميلك ("كرتي" أو "لك") عند الكرات في منتصف الزوايا، وامنحه الثقة لتغطية الشبكة أثناء إعادة بنائك للنقطة من الزجاج.',
      motivationalQuoteAr: 'في البادل، من يتقن الزجاج يمتلك مفاتيح الملعب! الصبر والدقة يكسران أشرس الهجمات.'
    },
    overhead_shots: {
      headlineAr: `كوتش التحليل الفني: تطوير البانديخا والفيبورا سيحول دفاعك إلى هجوم كاسح!`,
      urgencyReasonAr: 'الكرات العلوية لديك إما تفتقر إلى الأمان أو تنتهي بسماش متسرع يمنح الخصم فرصة هجوم مرتد. البانديخا الآمنة هي صمام الأمان للاعب البادل المتطور.',
      playtomicGrowthPotential: '+0.45 إلى +0.65 درجة Playtomic',
      detailedAnalysisAr: `عندما يرفع الخصم كرة عالية (لوب)، هدفك الأول ليس بالضرورة إنهاء النقطة بضربة ساحقة، بل الحفاظ على موقع الشبكة وإرسال كرة عميقة بزاوية تلتصق بالزجاج الخلفي للمنافس. التدرب على تكنيك ضرب الكرة بجانب الرأس مع دوران جانبي (Slice) سيجعلك لاعباً لا يُقهر عند الشبكة.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين تكنيك البانديخا (Bandeja Placement)',
          repsOrDuration: '20 دقيقة',
          focusGoalAr: 'توجيه الكرة بهدوء نحو الزاوية العكسية مع ارتداد منخفض جداً من الزجاج.',
          proTipAr: 'اضرب الكرة على مستوى الأذن ببطء، لا تبحث عن السرعة بل عن العمق والانخفاض.'
        },
        {
          titleAr: 'تمرين الانتقال من اللوب إلى السماش أو الفيبورا',
          repsOrDuration: '15 دقيقة',
          focusGoalAr: 'التمييز بين الكرة التي تسمح بالسماش الفائز وتلك التي تتطلب بانديخا دفاعية.',
          proTipAr: 'إذا كانت الكرة خلف رأسك، العب دائماً بانديخا أمان؛ لا تسدد السماش وأنت تتحرك للخلف!'
        }
      ],
      partnerTacticsAr: 'عند لعب البانديخا العميقة، تقدم فوراً مع زميلك خطوتين للأمام لإغلاق المساحات عند الشبكة وقطع أي رد سريع.',
      motivationalQuoteAr: 'البانديخا ليست مجرد ضربة، إنها إعلان سيطرة على مجريات الشوط!'
    },
    net_volleys: {
      headlineAr: `كوتش التحليل الفني: إتقان الفولي الهجومي سيحسم لك 70% من النقاط الحاسمة!`,
      urgencyReasonAr: 'أنت تخسر نقاطاً سهلة عند الشبكة بسبب ضربات فولي عشوائية ترتد للأعلى، مما يعطي الخصم فرصة للانقضاض.',
      playtomicGrowthPotential: '+0.40 إلى +0.60 درجة Playtomic',
      detailedAnalysisAr: `اللعب عند الشبكة في البادل يتطلب قبضة قوية ورسغاً ثابتاً، مع نقل وزن الجسم للأمام في اتجاه الكرة. تدريبات الفولي القاطع الموجه نحو أقدام المنافس والزجاج الجانبي سترفع كفاءتك الهجومية بشكل فوري.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين الفولي القاطع العميق (Deep Slice Volley)',
          repsOrDuration: '20 دقيقة',
          focusGoalAr: 'إبقاء الكرة منخفضة بعد الارتداد عن طريق ضربها بحركة من الأعلى إلى الأسفل بحجم مضرب صغير.',
          proTipAr: 'لا تؤرجح المضرب للخلف كثيراً؛ جهز المضرب أمام صدرك واعتمد على قوة اندفاع الكرة.'
        }
      ],
      partnerTacticsAr: 'حافظ على مسافة متساوية مع زميلك عند الشبكة وكأن بينكما حبلاً مشدوداً بطول 3 أمتار.',
      motivationalQuoteAr: 'الشبكة هي قلعة البادل، من يدافع عنها بذكاء يحصد النصر حتماً!'
    },
    serve_return: {
      headlineAr: `كوتش التحليل الفني: تحسين الإرسال واستقبال الإرسال سيمنحك أفضلية فورية!`,
      urgencyReasonAr: 'بداية كل شوط هي التي تحدد من يسيطر على الشبكة. إرسالك واستقبالك يحتاجان إلى ثبات وتوجيه دقيق نحو الزجاج الجانبي.',
      playtomicGrowthPotential: '+0.35 إلى +0.55 درجة Playtomic',
      detailedAnalysisAr: `استقبال الإرسال بنجاح يعني إرجاع كرة منخفضة أو لوب عميق يجبر الخصم على التراجع عن الشبكة، بينما الإرسال المتقن يضمن لك ولزميلك الوصول إلى موقع الشبكة قبل ارتداد الكرة.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين دقة الإرسال نحو الزجاج الجانبي (Cristal Lateral)',
          repsOrDuration: '15 دقيقة - 50 إرسالاً',
          focusGoalAr: 'إسقاط الكرة في آخر 30 سم من مربع الإرسال لترتطم بالزجاج الجانبي مباشرة.',
          proTipAr: 'اضرب الكرة عند مستوى الحزام مع دوران خفيف واصعد مباشرة نحو الشبكة بعد التسديد.'
        }
      ],
      partnerTacticsAr: 'تفق مع زميلك قبل الإرسال على نوع الضربة واتجاه الصعود لضمان تغطية كاملة للملعب.',
      motivationalQuoteAr: 'الإرسال الممتاز نصف شوط، والرد الذكي يسرق المبادرة في ثوانٍ!'
    },
    tactics_positioning: {
      headlineAr: `كوتش التحليل الفني: التمركز الذكي والتناغم هو الفارق بين اللاعب العادي والمحترف!`,
      urgencyReasonAr: 'المهارات الفردية جيدة، لكن ترك مساحات شاغرة في منتصف الملعب أو عدم التحرك كوحدة واحدة يكلفكم مباريات كاملة.',
      playtomicGrowthPotential: '+0.50 إلى +0.70 درجة Playtomic',
      detailedAnalysisAr: `البادل لعبة مساحات وزوايا وليست قوة عضلية. عندما يتحرك زميلك لإنقاذ كرة في الزاوية، يجب أن تغطي أنت منتصف الملعب فوراً. تطبيق مبدأ "الحبل المشدود" والتواصل المستمر سيضاعف ثقتكما في المباريات التنافسية.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين مبدأ الحبل المشدود وتغطية الوسط (Principio de la Cuerda)',
          repsOrDuration: '25 دقيقة مباراة تدريبية',
          focusGoalAr: 'التحرك معاً للأمام وللخلف وللجانبين ككتلة واحدة.',
          proTipAr: 'عين زميلك هي عينك؛ راقب موقعه قبل اتخاذ قرار التقدم أو التراجع.'
        }
      ],
      partnerTacticsAr: 'التواصل الكلامي المستمر ("أمامك"، "ارجع"، "لوحده") يزيل الشك ويسرّع اتخاذ القرار.',
      motivationalQuoteAr: 'لاعبان متوسطان متناغمان يفوزان دائماً على لاعبين موهوبين غير متفاهمين!'
    }
  };

  const advice = adviceByPillar[lowestPillarKey] || adviceByPillar.wall_defense;
  
  return {
    headlineAr: advice.headlineAr,
    recommendedPillarKey: lowestPillarKey,
    recommendedPillarNameAr: pillarNames[lowestPillarKey] || lowestPillarKey,
    urgencyReasonAr: advice.urgencyReasonAr,
    playtomicGrowthPotential: advice.playtomicGrowthPotential,
    detailedAnalysisAr: advice.detailedAnalysisAr,
    weeklyActionPlan: advice.weeklyActionPlan,
    partnerTacticsAr: advice.partnerTacticsAr,
    motivationalQuoteAr: advice.motivationalQuoteAr,
    source: 'fallback',
  };
}

// POST /api/coach-feedback
app.post('/api/coach-feedback', async (req, res) => {
  try {
    const { testResult, playerName, customQuestion } = req.body;

    if (!testResult) {
      return res.status(400).json({ error: 'Missing testResult in request body' });
    }

    // Check if API key is present
    if (!GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not set. Serving high-fidelity rule-based coach feedback.');
      const fallback = generateFallbackFeedback(testResult, playerName);
      return res.json(fallback);
    }

    const pillarBreakdownStr = JSON.stringify(testResult.pillarBreakdown || {}, null, 2);
    const strengths = (testResult.strengths || []).join(', ');
    const weaknesses = (testResult.weaknesses || []).join(', ');

    const prompt = `
You are an elite World Padel Tour (Premier Padel) Technical Master Coach and Playtomic Certified Evaluator analyzing the player's diagnostic results.

Player Name: ${playerName || 'كابتن البادل'}
Total Score: ${testResult.totalScore}/80 (${testResult.percentage}%)
Platform Level: Level ${testResult.levelNumber} - ${testResult.levelTitle}
Playtomic Score: ${testResult.playtomicScore || 'N/A'} (Tier: ${testResult.playtomicTier || 'N/A'})
Diagnosed Strengths: ${strengths || 'متوازن'}
Diagnosed Weaknesses: ${weaknesses || 'يحتاج تقييم شامل'}

5 Technical Pillars Breakdown:
${pillarBreakdownStr}

${customQuestion ? `Specific tactical question from the player: "${customQuestion}"` : ''}

Analyze the scores across the 5 Padel Pillars:
1. 'serve_return' (Serve & Return / الإرسال واستقبال الإرسال)
2. 'net_volleys' (Net Play & Volleys / لعب الشبكة والكرات الهوائية)
3. 'overhead_shots' (Overhead Shots: Bandeja, Víbora, Smash / الكرات العلوية)
4. 'wall_defense' (Wall Rebounds & Defense / ارتداد الزجاج واللعب الدفاعي)
5. 'tactics_positioning' (Tactics & Positioning / التمركز التكتيكي والتناغم)

Identify which SINGLE pillar is the most urgent constraint holding back this player from jumping to the next Playtomic tier.
Provide an inspiring, rigorous, and highly actionable diagnostic coach report in Arabic.
`;

    const config = {
      systemInstruction: `You are an elite Spanish-Arabic Premier Padel Master Coach. You provide deeply authentic, motivating, and tactically precise coaching advice in clear, engaging Arabic. Use proper padel terminology (Bandeja, Víbora, Chiquita, Globo/Lob, Bajada de pared, Doble pared, Rulo, Golden Point, etc.). Always output strictly valid JSON conforming to the requested schema.`,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headlineAr: {
            type: Type.STRING,
            description: 'Catchy and inspiring headline in Arabic from the coach',
          },
          recommendedPillarKey: {
            type: Type.STRING,
            description: 'The key of the pillar to prioritize: serve_return, net_volleys, overhead_shots, wall_defense, or tactics_positioning',
          },
          recommendedPillarNameAr: {
            type: Type.STRING,
            description: 'Arabic title of the recommended pillar',
          },
          urgencyReasonAr: {
            type: Type.STRING,
            description: 'Tactical rationale explaining why this pillar is currently capping their performance',
          },
          playtomicGrowthPotential: {
            type: Type.STRING,
            description: 'Estimated Playtomic rating surge potential (e.g. +0.45 إلى +0.65 درجة Playtomic)',
          },
          detailedAnalysisAr: {
            type: Type.STRING,
            description: 'In-depth tactical evaluation of the player current state and court habits in Arabic',
          },
          weeklyActionPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                titleAr: { type: Type.STRING },
                repsOrDuration: { type: Type.STRING },
                focusGoalAr: { type: Type.STRING },
                proTipAr: { type: Type.STRING },
              },
              required: ['titleAr', 'repsOrDuration', 'focusGoalAr', 'proTipAr'],
            },
          },
          partnerTacticsAr: {
            type: Type.STRING,
            description: 'How to coordinate with doubles partner regarding this technical area',
          },
          motivationalQuoteAr: {
            type: Type.STRING,
            description: 'Inspirational coach quote in Arabic',
          },
        },
        required: [
          'headlineAr',
          'recommendedPillarKey',
          'recommendedPillarNameAr',
          'urgencyReasonAr',
          'playtomicGrowthPotential',
          'detailedAnalysisAr',
          'weeklyActionPlan',
          'partnerTacticsAr',
          'motivationalQuoteAr',
        ],
      },
    };

    let parsedData: any = null;
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    for (const m of modelsToTry) {
      try {
        const fetchPromise = ai.models.generateContent({
          model: m,
          contents: prompt,
          config,
        });
        fetchPromise.catch(() => {});
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        const text = response.text?.trim() || '{}';
        parsedData = JSON.parse(text);
        if (parsedData?.headlineAr) break;
      } catch {
        // Continue to fallback model
      }
    }

    if (parsedData?.headlineAr) {
      return res.json({ ...parsedData, source: 'gemini' });
    }

    const fallback = generateFallbackFeedback(req.body?.testResult, req.body?.playerName);
    return res.json(fallback);
  } catch {
    const fallback = generateFallbackFeedback(req.body?.testResult, req.body?.playerName);
    return res.json(fallback);
  }
});

// POST /api/coach-ask (Quick interactive follow-up question)
app.post('/api/coach-ask', async (req, res) => {
  try {
    const { question, currentPillar, playerName } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.json({
        answerAr: `كوتش البادل يجيبك: التركيز على ${currentPillar || 'الأساسيات الفنية'} يتطلب دائماً ثني الركبتين، تثبيت رسغ اليد، واللعب بهدوء نحو المساحات المفتوحة. احرص على تكرار الحركة 50 مرة في تدريب السبت القادم!`,
        source: 'fallback',
      });
    }

    const promptText = `Player (${playerName || 'كابتن'}) asks coach: "${question}". Current focus pillar: ${currentPillar || 'General padel tactics'}. Give a concise, professional 3-sentence tactical answer in Arabic.`;
    const sysInstruction = 'You are an elite Premier Padel coach answering a quick technical query in concise Arabic with tactical terms.';

    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    for (const m of modelsToTry) {
      try {
        const fetchPromise = ai.models.generateContent({
          model: m,
          contents: promptText,
          config: { systemInstruction: sysInstruction },
        });
        fetchPromise.catch(() => {});
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 2500)
        );
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        const ans = response.text?.trim();
        if (ans) {
          return res.json({ answerAr: ans, source: 'gemini' });
        }
      } catch {
        // Continue to fallback
      }
    }

    return res.json({
      answerAr: 'حافظ على هدوئك في الملعب، وتذكر أن التمركز السليم يسبق قوة الضربة دائماً!',
      source: 'fallback',
    });
  } catch {
    return res.json({
      answerAr: 'حافظ على هدوئك في الملعب، وتذكر أن التمركز السليم يسبق قوة الضربة دائماً!',
      source: 'fallback',
    });
  }
});

// POST /api/coach-chat-stream (Multi-turn streaming AI Padel Coach)
app.post('/api/coach-chat-stream', async (req, res) => {
  const { message, history = [], userContext = {} } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Set SSE streaming headers with proxy unbuffering
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  let isClientConnected = true;
  res.on('close', () => {
    isClientConnected = false;
  });

  const writeSSEChunk = (text: string) => {
    try {
      if (isClientConnected && !res.writableEnded) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
        (res as any).flush?.();
      }
    } catch {
      isClientConnected = false;
    }
  };

  const closeSSEStream = () => {
    try {
      if (!res.writableEnded) {
        res.write(`data: [DONE]\n\n`);
        (res as any).flush?.();
        res.end();
      }
    } catch {
      // ignore
    }
  };

  const playerName = userContext.playerName || 'كابتن البادل';
  const currentLevel = userContext.currentLevel || 1;
  const levelTitle = userContext.levelTitle || 'المستوى الأولي';
  const playtomicRating = userContext.playtomicRating || 'غير متوفر بعد';
  const progressPercentage = userContext.progressPercentage ?? 0;
  const watchedVideosCount = userContext.watchedVideosCount ?? 0;
  const totalVideos = userContext.totalVideos ?? 14;

  const systemInstruction = `أنت "كوتش بادل برو" (Coach PadelPro) - المدرب الذكي التفاعلي لمنصة PadelLevel Pro. أنت مدرب بادل محترف معتمد دولياً وخبير تكتيكي في Premier Padel والمدارس الإسبانية الرائدة.

[هيكل المستويات الخمسة المعتمد في المنصة]:
- المستوى 1 (المبتدئ / Novice): مسكة المضرب القارية المحايدة (Continental Grip)، وضعية الاستعداد المنخفضة (Ready Stance) وخفة الحركة، التمركز الدفاعي الصحيح لتجنب المنطقة الميتة (No-Man's Land)، والإرسال القانوني تحت الخصر نحو الزجاج الجانبي للمنافس.
- المستوى 2 (التأسيسي / Foundation): ميكانيكا الفورهاند والباكهاند بالتحضير القصير (Short Backswing) ونقل الوزن، ميكانيكا اللوب الدفاعي (The Lob) والتحكم بارتفاع وعمق الكرة لانتزاع السيطرة، تمارين الجدار الفردية لبناء التوافق العصبي العضلي.
- المستوى 3 (المتوسط / Intermediate): تناغم الشركاء (Tandem) وسد ثغرة الوسط، الفولي السريع عند الشباك، الدفاع بالزجاج الخلفي (Back Glass) وتوقيت خروج الكرة، أساسيات ضربة البانديخا (Bandeja) لتهدئة اللعب وتثبيت الخصوم واستعادة موقع الشبكة.
- المستوى 4 (المتقدم / Advanced): الدفاع المعقد عن الزاوية المزدوجة (Doble Pared que abre / que cierra)، ضربة الباخادا الهجومية (Bajada de Pared) وأماكن التسديد الحاسمة، ضربة الفيبورا الحادة (The Vibora) بالدوران الجانبي القاطع لزحف الكرة على الزجاج.
- المستوى 5 (الاحترافي والتنافسي / Elite Pro): ضربة الرولو العلوية الساقطة على الشبك المعدني (The Rulo into the Fence)، تكتيكات السحق الاحترافي (Flat, Kick, Por 3, Por 4) لإخراج الكرة خارج القفص، كرات الشكيكا (Chiquita) المنخفضة في أقدام الخصوم، وتكتيكات حسم النقطة الذهبية (Punto de Oro).

[الأركان الفنية الخمسة للتقييم]:
1. الإرسال واستقبال الإرسال (Serve & Return)
2. لعب الشبكة والكرات الهوائية (Net Play & Volleys)
3. الكرات العلوية (Overhead Shots: Bandeja, Víbora, Smash, Rulo)
4. ارتداد الزجاج واللعب الدفاعي (Wall Defense & Glass Rebounds)
5. التمركز التكتيكي والتناغم مع الزميل (Tactics & Positioning)

[بيانات اللاعب الحالية التي يجب أن تستند إليها في نصائحك]:
- اسم اللاعب: ${playerName}
- المستوى الحالي: Level ${currentLevel} (${levelTitle})
- تصنيف Playtomic التقديري: ${playtomicRating}
- نسبة إنجاز التمارين المرئية: ${progressPercentage}% (${watchedVideosCount} من أصل ${totalVideos} تمريناً مكتملة)
${userContext.pillarBreakdown ? `- تقييم أركان اللاعب: ${JSON.stringify(userContext.pillarBreakdown)}` : ''}

[قواعد وتوجيهات الإجابة]:
- وجّه الحديث مباشرة للاعب مستعيناً بمستواه الحالي (Level ${currentLevel}) ونسبة تقدمه، مع تقديم توصيات وحلول ملموسة تناسب مهارات هذا المستوى تحديداً.
- استخدم مصطلحات البادل الرسمية باللغتين العربية واللاتينية (مثل: Bandeja, Víbora, Chiquita, Globo, Bajada, Doble pared, Por 3, Por 4, Rulo, Split step, No-Man's land).
- اقترح دائماً تمارين عملية وتمارين شركاء (Partner drills) أو فردية مع الجدار تناسب مستواه لمساعدته في الترقية للمستوى التالي.
- نسق الإجابات بنقاط واضحة ومنظمة وتنسيق جميل يسهل قراءته مع استخدام علامات الترقيم المناسبة.
- كن حماسياً وإيجابياً وملهماً كمدرب بادل رياضي حقيقي!`;

  try {
    if (!GEMINI_API_KEY) {
      // High-quality simulated streaming fallback when API key is missing in local sandbox
      const fallbackResponse = `أهلاً بك يا ${playerName}! كمدربك في منصة PadelLevel Pro، أرى أنك حالياً في **المستوى ${currentLevel} (${levelTitle})** بنسبة إنجاز **${progressPercentage}%** في التمارين المرئية.

بناءً على هذا المستوى، إليك توجيهاتي الفنية والتكتيكية المباشرة:
1. **التركيز الأساسي لمستواك**: احرص على إتقان ${
        currentLevel === 1 
          ? 'القبضة القارية المحايدة (Continental Grip) وتجنب الوقوف في المنطقة الميتة (No-Man\'s Land).' 
          : currentLevel === 2 
          ? 'تقصير حركة التحضير (Short Backswing) للفورهاند والباكهاند واللوب الدفاعي العالي.'
          : currentLevel === 3
          ? 'التحرك التزامني مع زميلك (Tandem) وهدوء ضربة البانديخا العميقة.'
          : currentLevel === 4
          ? 'قراءة ارتداد الزاوية المزدوجة (Doble Pared) والتسديد الهجومي بالباخادا والفيبورا.'
          : 'الرولو الساقط على الشبك وحسم النقطة بالسحق Por 3.'
      }
2. **روتين التمرين المقترح**: خصص 15 دقيقة قبل أي مباراة لتبادل كرات مستقيمة وهادئة، وركز على حركة القدمين (Split Step) قبل ضرب الكرة.
3. **تكتيك الشريك**: حافظ على التواصل الصوتي ("كرتي" أو "لك") عند الكرات المشتركة في المنتصف.

كيف تشعر بضرباتك الأخيرة في الملعب؟ هل تواجه صعوبة في ضربة معينة؟ أنا هنا لمساعدتك خطوة بخطوة!`;

      const words = fallbackResponse.split(' ');
      for (const word of words) {
        if (!isClientConnected) break;
        res.write(`data: ${JSON.stringify({ text: word + ' ' })}\n\n`);
        await new Promise((r) => setTimeout(r, 25));
      }
      res.write(`data: [DONE]\n\n`);
      return res.end();
    }

    // Build contents for multi-turn chat
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && item.text && (item.role === 'user' || item.role === 'model')) {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    // Append the latest user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Multi-model streaming cascade: try gemini-3.8-flash first, then gemini-3.1-flash-lite
    let streamSucceeded = false;
    const modelsToStream = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

    for (const modelName of modelsToStream) {
      if (!isClientConnected) break;
      try {
        const streamPromise = ai.models.generateContentStream({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });

        // Catch potential rejected promise immediately
        streamPromise.catch(() => {});

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Model initial stream timeout')), 3500)
        );

        const responseStream = await Promise.race([streamPromise, timeoutPromise]);
        const iterator = responseStream[Symbol.asyncIterator]();

        let modelEmittedAnyChunk = false;
        while (isClientConnected) {
          const nextPromise = iterator.next();
          nextPromise.catch(() => {});

          const chunkTimeout = new Promise<IteratorResult<any>>((_, reject) =>
            setTimeout(() => reject(new Error('Chunk read timeout')), 3000)
          );

          const nextResult = await Promise.race([nextPromise, chunkTimeout]);
          if (nextResult.done) break;
          if (nextResult.value?.text) {
            modelEmittedAnyChunk = true;
            writeSSEChunk(nextResult.value.text);
          }
        }

        if (modelEmittedAnyChunk) {
          streamSucceeded = true;
          break;
        }
      } catch {
        // Continue to fallback model if this model had rate limits or timeout
      }
    }

    if (streamSucceeded) {
      closeSSEStream();
      return;
    }

    // If both models were unavailable or rate-limited, smoothly use the coach advice generator
    throw new Error('FallbackToContextualCoach');
  } catch {
    console.log('Serving coach response via contextual coaching fallback engine.');
    
    // Generate intelligent contextual response based on user question, level and progress
    let answer = '';
    const q = (message || '').toLowerCase();
    
    if (q.includes('بانديخا') || q.includes('bandeja')) {
      answer = `أهلاً بك يا ${playerName}! ضربة **البانديخا (Bandeja)** هي صمام الأمان الأول عند الشبكة في المستوى ${currentLevel}.\n\nإليك أسرار إتقانها وتثبيت المنافسين:\n1. **نقطة التلامس**: اضرب الكرة بجانب رأسك (بارتفاع الأذن) بوضعية صينية التقديم المفتوحة، وتجنب ضربها فوق الرأس مباشرة حتى لا تتحول لسماش ضعيف.\n2. **العمق والزاوية**: لا تبحث عن السرعة بل وجّه الكرة بعمق نحو الزاوية المتقاطعة للزجاج الخلفي للمنافس حتى ترتد بارتفاع منخفض جداً يمنعه من الرد الهجومي.\n3. **استعادة الشبكة**: فور متابعة الضربة، خذ خطوتين سريعتين للأمام لتأمين الفولي القادم.\n\n💡 **تمرين ميداني**: تدرب على تسديد 20 تكرار بانديخا هادئة مع زميل يرفع لك كرات لوب عالية، مع التركيز على إسقاط الكرة في المتر الأخير من الملعب.`;
    } else if (q.includes('فيبورا') || q.includes('vibora')) {
      answer = `ضربة **الفيبورا (Víbora)** يا ${playerName} هي الضربة الهجومية الأكثر شراسة عند الشبكة.\n\nأهم نقاط التنفيذ:\n1. **الدوران الجانبي (Sidespin)**: التف وجه المضرب حول الجانب الأيمن للكرة بزاوية قاطعة لتجعلها تدور وتزحف على الزجاج بارتفاع سنتيمترات معدودة.\n2. **الهدف القاتل**: استهدف دائماً أقدام المنافسين في خط الدفاع أو زاوية التقاء الزجاجين (Doble Pared).\n3. **قوة الجذع**: استخدم دوران الجذع والكتفين لتوليد القوة ولا تعتمد على مفصل المعصم فقط لحمايته من الإجهاد.`;
    } else if (q.includes('زجاج') || q.includes('wall') || q.includes('glass') || q.includes('pared')) {
      answer = `التعامل الهادئ مع **ارتداد الزجاج** يا ${playerName} هو ما يمنحك الترقية لمستويات Playtomic المتقدمة!\n\nقواعد ذهبية لدفاع الزجاج:\n1. **اترك مسافة أمان**: لا تلتصق بالزجاج الخلفي؛ تراجع بالتوازي مع مسار الكرة واترك مسافة ذراع بينك وبين الجدار.\n2. **الصبر والهدوء**: انتظر خروج الكرة من الزجاج ووصولها لذروة ارتدادها قبل ضربها.\n3. **الزاوية المزدوجة (Doble Pared)**: حدد ترتيب الارتطام (جانبي ثم خلفي أو العكس) ودُر دائماً مع اتجاه دوران الكرة.\n4. **الرد الأنسب**: عندما تكون تحت ضغط هجومي، أفضل خيار هو تسديد لوب دفاعي عالٍ جداً وعميق (Globo) لإجبار الخصوم على التراجع.`;
    } else if (q.includes('شريك') || q.includes('زميل') || q.includes('partner') || q.includes('تمركز') || q.includes('no-man')) {
      answer = `التناغم مع الشريك والتمركز الهندسي هما سر الفوز في البادل يا ${playerName}!\n\nتوجيهات تكتيكية أساسية:\n1. **مبدأ الحبل المتصل (Tandem)**: تحرك مع زميلك ككتلة واحدة؛ إذا صعد للشبكة اصعد معه، وإذا تراجع للدفاع تراجع معه لسد الخطوط.\n2. **تغطية ثغرة المنتصف**: الكرة المشتركة في الوسط تكون من نصيب اللاعب الذي يتمركز بالفورهاند (اليد القوية) في المنتصف.\n3. **التواصل الصريح**: نادِ بوضوح ("كرتي" أو "لك") فور انطلاق الكرة من مضرب المنافس.\n4. **تجنب المنطقة الميتة**: لا تتوقف أبداً في منتصف الملعب (No-Man's Land)؛ تمركزك الدفاعي هو خطوة ونصف خلف خط الإرسال، وتمركزك الهجومي هو مترين إلى 3 أمتار من الشباك.`;
    } else if (q.includes('سماش') || q.includes('smash') || q.includes('رولو') || q.includes('rulo') || q.includes('por 3')) {
      answer = `تسديدات السحق الهجومية يا ${playerName} تتطلب حسماً وتقدير مسافة دقيق:\n\n1. **السحق المستقيم (Flat Smash)**: استخدمه عندما تكون قريباً جداً من الشبكة والكرة ساقطة للأمام، واضرب الكرة في أعلى نقطة لترتد من ملعب الخصم وتعود لملعبك.\n2. **سحق Por 3**: يتطلب ضرب الكرة في أعلى نقطة مع تدوير علوي وجانبي حاد لتخرج فوق الجدار الجانبي (3 أمتار).\n3. **الرولو (The Rulo)**: خيار ذكي ومنخفض المخاطر؛ إسقاط الكرة بدوران علوي على الشبك السلكي الجانبي لإحداث ارتداد عشوائي مستحيل الصد.`;
    } else {
      answer = `أهلاً بك يا ${playerName}! بصفتي مدربك الفني في منصة PadelLevel Pro لمستواك الحالي **Level ${currentLevel} (${levelTitle})**:\n\nبناءً على تحليلي لتقدمك الحالي (إنجاز ${progressPercentage}% من مكتبة التمارين المرئية):\n1. **الهدف الفني الأبرز**: العمل على ترقية مستواك عبر التطبيق المستمر للأركان الخمسة (الإرسال والاستقبال، لعب الشبكة، الكرات العلوية، دفاع الزجاج، والتمركز).\n2. **نصيحة تدريبية لمستواك**: ركز على أداء القفزة التحضيرية (Split Step) في لحظة ملامسة مضرب الخصم للكرة، وتجهيز المضرب مبكراً قبل وصول الكرة إليك.\n3. **التطبيق الميداني**: استعرض التمارين المخصصة لمستواك في قسم الفيديوهات وطبق كل تمرين 20 تكراراً في حصتك القادمة.\n\nما هي الضربة أو الموقف التكتيكي الذي ترغب في تحليله ومناقشته الآن بالتفصيل؟`;
    }

    const words = answer.split(' ');
    for (const w of words) {
      if (!isClientConnected) break;
      writeSSEChunk(w + ' ');
      await new Promise(r => setTimeout(r, 10));
    }
    closeSSEStream();
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PadelLevel Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
