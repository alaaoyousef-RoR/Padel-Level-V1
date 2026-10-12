export interface GlossaryTerm {
  id: string;
  termAr: string;
  termOriginal: string;
  category: 'overhead' | 'walls' | 'tactics' | 'general';
  categoryAr: string;
  shortDefinition: string;
  tacticalContext: string;
  courtPositionAr: string;
  proTip: string;
}

export const PADEL_GLOSSARY_ITEMS: GlossaryTerm[] = [
  // --- الضربات الهوائية والإنهاء (Overhead & Attack Shots) ---
  {
    id: 'glossary-bandeja',
    termAr: 'البانديخا (Bandeja)',
    termOriginal: 'Bandeja',
    category: 'overhead',
    categoryAr: 'الضربات الهوائية والإنهاء',
    shortDefinition: 'ضربة دفاعية/تكتيكية هوائية تحافظ على موقعك عند الشبكة عبر إرسال كرة مقطوعة (Slice) عميقة باتجاه زوايا الخصم دون إعطاء فرصة للخصم للتقدم.',
    tacticalContext: 'تُستعمل عندما يلعب الخصم لوب عالي وأنت متمركز عند الشبكة وتريد تفادي التراجع الكامل للخلف مع الحفاظ على المبادرة والسيطرة.',
    courtPositionAr: 'منطقة الانتقال (Transition Zone) أو خلف الشبكة بقليل',
    proTip: 'البانديخا ليست ضربة قاضية، بل هي ضربة بناء وتحكم لتثبيت الخصم في عمق الملعب.'
  },
  {
    id: 'glossary-vibora',
    termAr: 'الفيبورا (Víbora)',
    termOriginal: 'Víbora (The Viper)',
    category: 'overhead',
    categoryAr: 'الضربات الهوائية والإنهاء',
    shortDefinition: 'ضربة هجومية حادة مقطوعة بقوة تشبه حركة الأفعى، تهدف للإنهاء أو إجبار الخصم على دفاع ضعيف مع دوران جانبي عالٍ (Side-spin).',
    tacticalContext: 'تُنفذ من جانب الرأس مع حركة كرباجية سريعة تجعل الكرة تزحف على الأرض بعد اصطدامها بالزجاج الخلفي للخصم.',
    courtPositionAr: 'منطقة الشبكة والمنتصف',
    proTip: 'استخدم الفيبورا عندما تكون الكرة عالية بما يكفي ولديك توازن كامل لمفاجأة الخصم بكرة جانبية حادة.'
  },
  {
    id: 'glossary-smash',
    termAr: 'السماتش (Smash / Remate)',
    termOriginal: 'Remate / Smash',
    category: 'overhead',
    categoryAr: 'الضربات الهوائية والإنهاء',
    shortDefinition: 'ضربة ساحقة قوية تُنفذ بأقصى قوة في أعلى نقطة فوق الرأس لإنهاء النقطة وإخراج الكرة خارج الملعب (Por 3 / Por 4).',
    tacticalContext: 'تُستخدم حصرياً عندما يرتفع لوب الخصم بشكل قصير وعالٍ جداً قرب شبكتك ويسمح لك بالارتقاء.',
    courtPositionAr: 'منطقة الشبكة',
    proTip: 'لا تقم بالسماتش القوي إلا إذا كانت الكرة مرتفعة كفاية؛ وإلا فسترتد الكرة من الزجاج لصالح الخصم.'
  },
  {
    id: 'glossary-gancho',
    termAr: 'الغانتشو (Gancho)',
    termOriginal: 'Gancho (Hook)',
    category: 'overhead',
    categoryAr: 'الضربات الهوائية والإنهاء',
    shortDefinition: 'ضربة هوائية جانبية تشبه الخطاف تُستخدم للكرات المرتفعة فوق الكتف الأيسر للاعب الأيمن أو الأيمن للاعب الأيسر.',
    tacticalContext: 'تُعتبر بديلاً سريعاً للبانديخا عندما لا يكون هناك وقت كافٍ للالتفاف الجانبي الكامل.',
    courtPositionAr: 'منتصف الملعب',
    proTip: 'حافظ على ثبات ذراعك واستخدم حركة المعصم والكتف لتوجيه الكرة نحو زوايا الخصم.'
  },

  // --- الدفاع والجدار الزجاجي (Wall Defense & Glass) ---
  {
    id: 'glossary-bajada',
    termAr: 'باخادا دي باريد (Bajada de Pared)',
    termOriginal: 'Bajada de Pared',
    category: 'walls',
    categoryAr: 'الدفاع والجدار الزجاجي',
    shortDefinition: 'ضربة نازلة من الجدار الخلفي للكرة المرتتدة ببطء، وتعتبر سلاح هجومي قوي يتحول فيه الدفاع إلى هجوم.',
    tacticalContext: 'تُستعمل عندما يتجاوزك لوب الخصم وترتد الكرة من الزجاج الخلفي بارتفاع مناسب.',
    courtPositionAr: 'أمام الزجاج الخلفي مباشرة',
    proTip: 'لا تنتظر الكرة حتى تسقط على الأرض؛ اضربها عند أعلى نقطة ارتداد وهي خارجة من الزجاج.'
  },
  {
    id: 'glossary-vidrio',
    termAr: 'الارتداد من الزجاج (Vidrio / Glass Rebound)',
    termOriginal: 'Vidrio / Rebote',
    category: 'walls',
    categoryAr: 'الدفاع والجدار الزجاجي',
    shortDefinition: 'قراءة زوايا ارتداد الكرة من الزجاج الخلفي والجانبي لتنفيذ ضربات دقيقة من وضعيات صعبة ودفاعية.',
    tacticalContext: 'الزجاج هو صديق المدافع الأول؛ فهو يمتص سرعة الكرة ويمنحك وقتاً إضافياً للتمركز والتفكير.',
    courtPositionAr: 'منطقة الخط الخلفي والزوايا',
    proTip: 'لا تلصق ظهرك بالزجاج؛ اترك دائماً مسافة متر لتتمكن من أرجحة المضرب بحرية أمام جسمك.'
  },
  {
    id: 'glossary-chiquita',
    termAr: 'التشيكيتا (Chiquita)',
    termOriginal: 'La Chiquita',
    category: 'walls',
    categoryAr: 'الدفاع والجدار الزجاجي',
    shortDefinition: 'ضربة خفيفة وناعمة تُرسل نحو أقدام اللاعبين الواقفين عند الشبكة لإجبارهم على رفع الكرة أو ارتكاب خطأ.',
    tacticalContext: 'تكسر هيمنة الخصم على الشبكة عبر إسقاط الكرة في المنطقة الميتة بين الشبكة وأقدامهم.',
    courtPositionAr: 'الخط الخلفي',
    proTip: 'التشيكيتا الناجحة يجب أن يرافقها صعود فوري للشبكة لاغتنام الكرة المرتفعة المتوقعة من الخصم.'
  },

  // --- التكتيك والتمركز في الملعب (Tactics & Positioning) ---
  {
    id: 'glossary-four-regla',
    termAr: 'التمركز القياسي (Four de Regla)',
    termOriginal: 'Four de Regla / Pareja',
    category: 'tactics',
    categoryAr: 'التكتيك والتمركز',
    shortDefinition: 'الحفاظ على التوازي والتحرك كوحدة واحدة مع الزميل (نهاجم معاً وندافع معاً بمحافظة على مسافة 3 أمتار).',
    tacticalContext: 'الأساس التكتيكي لمنع الخصم من إيجاد ثغرات في منتصف الملعب أو الخطوط الجانبية.',
    courtPositionAr: 'الملعب بالكامل',
    proTip: 'إذا تقدم زميلك خطوة، تقدم معه؛ الفجوات بين الشريكين هي أول ما يستغله المحترفون.'
  },
  {
    id: 'glossary-por-3-4',
    termAr: 'بور 3 / بور 4 (Por 3 / Por 4)',
    termOriginal: 'Por 3 / Por 4',
    category: 'tactics',
    categoryAr: 'التكتيك والتمركز',
    shortDefinition: 'إخراج الكرة خارج الملعب نهائياً؛ عبر السياق الجانبي بارتفاع 3 أمتار (Por 3) أو فوق الزجاج الخلفي 4 أمتار (Por 4).',
    tacticalContext: 'ضربة إنهاء حاسمة تُعلن انتهاء النقطة لصالحك فور خروج الكرة خارج حدود الملعب.',
    courtPositionAr: 'منطقة الشبكة',
    proTip: 'تتطلب قوة هائلة ودوران سفلي ممتاز مع توجيه دقيق للأعلى.'
  },
  {
    id: 'glossary-jugador-reves',
    termAr: 'توزيع الأدوار (Drive & Revés)',
    termOriginal: 'Drive y Revés',
    category: 'tactics',
    categoryAr: 'التكتيك والتمركز',
    shortDefinition: 'توزيع اللاعبين في الملعب؛ لاعب الجانب الأيمن (Drive) يركز على البناء والتحكم، ولاعب الجانب الأيسر (Revés) يركز على الهجوم والإنهاء.',
    tacticalContext: 'في معظم الأحيان يلعب الأيمن في اليمين والأيسر في اليسار (أو بالعكس في اللعب المعكوس Zuazo style).',
    courtPositionAr: 'الجانب الأيمن والجانب الأيسر',
    proTip: 'اعرف دورك بوضوح وتواصل مع زميلك لتجنب التداخل في منتصف الملعب.'
  },
  {
    id: 'glossary-presion-volley',
    termAr: 'الضغط المزدوج بالفولي (Volea de Presión)',
    termOriginal: 'Presión en la Red',
    category: 'tactics',
    categoryAr: 'التكتيك والتمركز',
    shortDefinition: 'إجبار الخصم على التراجع للخلف عبر الحفاظ على عمق الفولي والانقضاض المستمر على الكرات القصيرة.',
    tacticalContext: 'تضييق الخناق على الخصم وحرمانه من مساحة اللعب المريح حتى يرتكب خطأ أو يرسل لوب ضعيف.',
    courtPositionAr: 'منطقة الشبكة',
    proTip: 'اضغط بكرات موجهة لأقدام الخصم ولا تمنحه فرصة لالتقاط أنفاسه.'
  }
];
