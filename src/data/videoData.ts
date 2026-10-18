import { VideoTutorial } from '../types';

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  // =========================================================================
  // LEVEL 1: المبتدئ تماماً (Novice / Starter)
  // التركيز: مسكة المضرب، وضعية الاستعداد، التمركز، والإرسال الأساسي
  // =========================================================================
  {
    id: 'vid-l1-grip-ready',
    youtubeId: 'wCAqvaqrnZ4',
    youtubeUrl: 'https://www.youtube.com/watch?v=wCAqvaqrnZ4',
    thumbnailUrl: 'https://img.youtube.com/vi/wCAqvaqrnZ4/hqdefault.jpg',
    titleAr: 'المستوى 1: مسكة المضرب القارية (Continental Grip) ووضعية الاستعداد',
    titleEn: 'Level 1: Continental Grip & Ready Stance Fundamentals',
    category: 'basic',
    categoryAr: 'الأساسيات والميكانيكا',
    topicCategory: 'fundamentals',
    topicCategoryAr: 'أساسيات وميكانيكا اللعب',
    level: 'مبتدئ',
    levelNumbers: [1],
    levelBadgeText: 'المستوى 1 (Level 1)',
    duration: '09:40 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Padel Starter Series',
    courtDiagramType: 'baseline',
    descriptionAr: 'الدرس الأساسي لضبط مسكة المطرقة المحايدة التي تتيح لك تسديد كافة الكرات دون تغيير القبضة، وضبط وقفة الاستعداد المنخفضة.',
    keyTakeaways: [
      'حرف V بين الإبهام والسبابة يستقر على الحافة العلوية لمقبض المضرب',
      'ثني الركبتين ورفع رأس المضرب أمام الصدر بكلتا اليدين لتسريع رد الفعل',
      'تنفيذ القفزة التحضيرية (Split Step) لحظة ملامسة مضرب الخصم للكرة'
    ],
    drillSteps: [
      'تثبيت قبضة المضرب بزاوية 90 درجة مع الساعد وفحصها قبل كل إرسال.',
      'التدرب على 20 قفزة تحضيرية سريعة في خط الدفاع بالتزامن مع ضربات الزميل.'
    ],
    equipmentNeeded: 'مضرب بادل + كرة تدريب'
  },
  {
    id: 'vid-l1-positioning',
    youtubeId: 'NRVnfbe4Ox4',
    youtubeUrl: 'https://www.youtube.com/watch?v=NRVnfbe4Ox4',
    thumbnailUrl: 'https://img.youtube.com/vi/NRVnfbe4Ox4/hqdefault.jpg',
    titleAr: 'المستوى 1: التمركز الدفاعي وتجنب الوقوف في المنطقة الميتة (No-Man\'s Land)',
    titleEn: 'Level 1: Defensive Court Positioning & No-Man\'s Land',
    category: 'tactics',
    categoryAr: 'التكتيك والتمركز',
    topicCategory: 'fundamentals',
    topicCategoryAr: 'أساسيات وميكانيكا اللعب',
    level: 'مبتدئ',
    levelNumbers: [1],
    levelBadgeText: 'المستوى 1 (Level 1)',
    duration: '08:15 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Padel Starter Series',
    courtDiagramType: 'full',
    descriptionAr: 'تعلم أبعاد الملعب الدفاعية؛ أين تقف خلف خط الإرسال والمسافة الآمنة من الجدار الجانبي لتفادي الوقوع في مصيدة منتصف الملعب.',
    keyTakeaways: [
      'نقطة الدفاع الأساسية: خطوة ونصف خلف خط الإرسال ونصف متر بعيداً عن الجدار الجانبي',
      'تجنب التوقف في منتصف الملعب حتى لا تسقط الكرة مباشرة عند قدميك',
      'التحرك بخطوات جانبية سلسة دون تقاطع القدمين'
    ],
    drillSteps: [
      'وضع علامة تمركز في الملعب والتدرب على الرجوع السريع إليها بعد كل ضربة.'
    ],
    equipmentNeeded: 'ملعب بادل كامل + مخاريط'
  },
  {
    id: 'vid-l1-serve',
    youtubeId: 'BIsD8Kg0yfs',
    youtubeUrl: 'https://www.youtube.com/watch?v=BIsD8Kg0yfs',
    thumbnailUrl: 'https://img.youtube.com/vi/BIsD8Kg0yfs/hqdefault.jpg',
    titleAr: 'المستوى 1: إتقان الإرسال القانوني وتوجيه الكرة للزجاج الجانبي',
    titleEn: 'Level 1: Legal Underhand Serve & Direction Control',
    category: 'serve_return',
    categoryAr: 'الإرسال والاستقبال',
    topicCategory: 'fundamentals',
    topicCategoryAr: 'أساسيات وميكانيكا اللعب',
    level: 'مبتدئ',
    levelNumbers: [1],
    levelBadgeText: 'المستوى 1 (Level 1)',
    duration: '07:50 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Core Padel Shots',
    courtDiagramType: 'baseline',
    descriptionAr: 'كيفية أداء الإرسال السليم تحت مستوى الخصر، وتوجيه الكرة بقصة خفيفة باتجاه الزجاج الجانبي للمنافس لبدء النقطة بأمان.',
    keyTakeaways: [
      'إسقاط الكرة وتركها ترتد للأرض قبل ضربها بارتفاع الحزام',
      'توجيه الإرسال نحو الزجاج الجانبي لتعقيد زاوية الرد على الخصم',
      'الانطلاق بخطوات سريعة للأمام فور تسديد الكرة'
    ],
    drillSteps: [
      'تنفيذ 20 إرسال موجه نحو الزجاج الجانبي و20 إرسال نحو زاوية المنتصف T.'
    ],
    equipmentNeeded: 'سلة كرات بادل'
  },

  // =========================================================================
  // LEVEL 2: المتوسط الأولي (Foundation / Improver)
  // التركيز: الضربات الأرضية، اللوب الدفاعي، والتدريب الفردي مع الجدار
  // =========================================================================
  {
    id: 'vid-l2-groundstrokes',
    youtubeId: 'OWgxm7Ob65g',
    youtubeUrl: 'https://www.youtube.com/watch?v=OWgxm7Ob65g',
    thumbnailUrl: 'https://img.youtube.com/vi/OWgxm7Ob65g/hqdefault.jpg',
    titleAr: 'المستوى 2: ميكانيكا الفورهاند والباكهاند بالتحضير القصير (Short Backswing)',
    titleEn: 'Level 2: Forehand & Backhand Groundstroke Mechanics',
    category: 'basic',
    categoryAr: 'الأساسيات والميكانيكا',
    topicCategory: 'fundamentals',
    topicCategoryAr: 'أساسيات وميكانيكا اللعب',
    level: 'متوسط أولي',
    levelNumbers: [2],
    levelBadgeText: 'المستوى 2 (Level 2)',
    duration: '10:05 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Groundstroke Mastery',
    courtDiagramType: 'baseline',
    descriptionAr: 'ضبط حركة سحب المضرب القصيرة لتفادي التأخر في استقبال الكرات السريعة، مع تدوير الجذع ونقل الوزن للأمام.',
    keyTakeaways: [
      'تقصير حركة سحب المضرب لمنع التأخر في استقبال الكرات السريعة',
      'نقل ثقل الجسم من الساق الخلفية إلى الأمامية عند التلامس مع الكرة',
      'إنهاء حركة المضرب نحو الكتف المعاكس بنعومة للتحكم بارتفاع الكرة'
    ],
    drillSteps: [
      'أداء 25 كرة فورهاند أرضية منخفضة ترتد قبل خط الإرسال للمنافس.',
      'أداء 25 كرة باكهاند دفاعية مركزة على زاوية الخصم البعيدة.'
    ],
    equipmentNeeded: 'سلة كرات بادل + مضرب'
  },
  {
    id: 'vid-l2-lob-mechanics',
    youtubeId: '3dzag7521pU',
    youtubeUrl: 'https://www.youtube.com/watch?v=3dzag7521pU',
    thumbnailUrl: 'https://img.youtube.com/vi/3dzag7521pU/hqdefault.jpg',
    titleAr: 'المستوى 2: ميكانيكا ضربة اللوب الدفاعية (The Lob) للخروج من الضغط',
    titleEn: 'Level 2: Defensive Lob Execution & Height Control',
    category: 'tactics',
    categoryAr: 'التكتيك والتمركز',
    topicCategory: 'fundamentals',
    topicCategoryAr: 'أساسيات وميكانيكا اللعب',
    level: 'متوسط أولي',
    levelNumbers: [2],
    levelBadgeText: 'المستوى 2 (Level 2)',
    duration: '08:35 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Defensive Fundamentals',
    courtDiagramType: 'full',
    descriptionAr: 'تعلم استخدام الساقين في رفع الكرات الدفاعية عالياً وعميقاً فوق لاعبي الشبكة لإجبارهم على التراجع واستعادة السيطرة.',
    keyTakeaways: [
      'استخدام قوة الساقين في رفع الكرة وليس حركة المعصم فقط',
      'استهداف الزاوية العميقة فوق كتف الخصم غير الضارب',
      'التحضير السريع والانطلاق للشبكة بمجرد تجاوز الكرة لمستوى الخصوم'
    ],
    drillSteps: [
      'تغذية كرات أرضية وإسقاط 15 كرة لوب متتالية داخل المتر الأخير من الملعب.'
    ],
    equipmentNeeded: 'سلة كرات + شريك'
  },
  {
    id: 'vid-l2-solo-wall-drills',
    youtubeId: '3rpgg3IIzyg',
    youtubeUrl: 'https://www.youtube.com/watch?v=3rpgg3IIzyg',
    thumbnailUrl: 'https://img.youtube.com/vi/3rpgg3IIzyg/hqdefault.jpg',
    titleAr: 'المستوى 2: تمارين الجدار الفردية لضبط التوافق العضلي ولمس الكرة',
    titleEn: 'Level 2: Solo Wall Rebound Conditioning & Control',
    category: 'footwork',
    categoryAr: 'تدريب فردي ورشاقة',
    topicCategory: 'solo',
    topicCategoryAr: 'تدريب فردي ورشاقة وقدمين',
    level: 'متوسط أولي',
    levelNumbers: [2],
    levelBadgeText: 'المستوى 2 (Level 2)',
    duration: '13:20 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Solo Mastery',
    courtDiagramType: 'walls',
    descriptionAr: 'تمارين فردية بواسطة الحائط لتعويد اليد على دقة لمس الكرة وسرعة حركة القدمين دون الحاجة لمدرب أو شريك.',
    keyTakeaways: [
      'ضرب الكرة المتكرر على الجدار الزجاجي يرفع حساسية لمس الكرة وسرعة المعصم',
      'تدريبات الخطوات الجانبية السريعة على أطراف الأصابع تزيد خفة الحركة',
      'تحسين التوازن الجسدي قبل الشروع في أداء أي ضربة'
    ],
    drillSteps: [
      '50 ضربة متتالية على الجدار بارتداد أرضي واحد.',
      '30 ضربة فولي هوائي مباشر على الجدار دون ارتداد.'
    ],
    equipmentNeeded: 'جدار زجاجي أو حائط تدريب + مضرب + 3 كرات'
  },

  // =========================================================================
  // LEVEL 3: المتوسط (Intermediate)
  // التركيز: التحرك التزامني للشركاء، فولي الشبكة، والزجاج الخلفي
  // =========================================================================
  {
    id: 'vid-l3-partner-movement',
    youtubeId: 'KyakdKHsbnk',
    youtubeUrl: 'https://www.youtube.com/watch?v=KyakdKHsbnk',
    thumbnailUrl: 'https://img.youtube.com/vi/KyakdKHsbnk/hqdefault.jpg',
    titleAr: 'المستوى 3: التحرك التزامني للشركاء كحبل واحد (Tandem) وتبادل الفولي',
    titleEn: 'Level 3: Tandem Partner Court Movement & Volley Drills',
    category: 'tactics',
    categoryAr: 'تمارين ثنائية للشركاء',
    topicCategory: 'partner',
    topicCategoryAr: 'تمارين ثنائية للشركاء',
    level: 'متوسط',
    levelNumbers: [3],
    levelBadgeText: 'المستوى 3 (Level 3)',
    duration: '11:45 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Drills for Pairs',
    courtDiagramType: 'full',
    descriptionAr: 'تمارين عملية للاعبين اثنين لضبط صعود وهبوط الخطوط معاً عند الهجوم والدفاع، مع إغلاق ثغرة الوسط.',
    keyTakeaways: [
      'مبدأ الحبل المتصل: تحرك الشريكين بنفس المسافة للحفاظ على توازن الخط الدفاعي والهجومي',
      'التواصل الصوتي الصريح لكرات المنتصف (كرتي / كرتك)',
      'تثبيت قبضة المضرب عند تبادل الكرات الهجومية السريعة عند الشباك'
    ],
    drillSteps: [
      'تبادل 30 كرة فولي متتالية وجهاً لوجه دون ارتداد الكرة على الأرض.'
    ],
    equipmentNeeded: 'ملعب بادل + شريك + 10 كرات'
  },
  {
    id: 'vid-l3-back-glass',
    youtubeId: 'd2rml7MoJhk',
    youtubeUrl: 'https://www.youtube.com/watch?v=d2rml7MoJhk',
    thumbnailUrl: 'https://img.youtube.com/vi/d2rml7MoJhk/hqdefault.jpg',
    titleAr: 'المستوى 3: إتقان الدفاع بالزجاج الخلفي (Back Glass Mastery)',
    titleEn: 'Level 3: Back Glass Rebound Timing & Defense',
    category: 'walls',
    categoryAr: 'الجدران الزجاجية',
    topicCategory: 'walls',
    topicCategoryAr: 'الجدران الزجاجية والدفاع',
    level: 'متوسط',
    levelNumbers: [3],
    levelBadgeText: 'المستوى 3 (Level 3)',
    duration: '09:20 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Glass Defense Specialty',
    courtDiagramType: 'walls',
    descriptionAr: 'قراءة سرعة الكرة بعد ارتطامها بالزجاج الخلفي، ترك مسافة كافية للخروج، وتسديد ضربات دفاعية دقيقة.',
    keyTakeaways: [
      'التحرك للخلف بالتوازي مع مسار الكرة وترك مسافة كافية بينك وبين الزجاج',
      'انتظار خروج الكرة من الزجاج والوصول لقمة ارتدادها قبل ضربها',
      'تجهيز المضرب مبكراً أسفل مستوى الركبتين للضربات المنخفضة'
    ],
    drillSteps: [
      'تغذية 25 كرة قطرية ترتد من الزجاج الخلفي والرد بلوب دفاعي عميق.'
    ],
    equipmentNeeded: 'ملعب بزجاج خلفي + كرات تدريب'
  },
  {
    id: 'vid-l3-intro-bandeja',
    youtubeId: 'fXx8SflbEIQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=fXx8SflbEIQ',
    thumbnailUrl: 'https://img.youtube.com/vi/fXx8SflbEIQ/hqdefault.jpg',
    titleAr: 'المستوى 3: أساسيات ضربة البانديخا (Bandeja) لاستعادة الشبكة',
    titleEn: 'Level 3: Introductory Bandeja Technique & Net Recovery',
    category: 'overhead',
    categoryAr: 'اللعب عند الشبكة والتكتيك',
    topicCategory: 'net_tactics',
    topicCategoryAr: 'اللعب عند الشبكة والتكتيك المتقدم',
    level: 'متوسط',
    levelNumbers: [3],
    levelBadgeText: 'المستوى 3 (Level 3)',
    duration: '10:40 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Overhead Mastery',
    courtDiagramType: 'net',
    descriptionAr: 'الخطوات الفنية لتنفيذ البانديخا بهدوء؛ ضرب الكرة بجانب الرأس بزاوية قطع مسطحة لتثبيت المنافسين في الخلف واستعادة موقع الهجوم.',
    keyTakeaways: [
      'ضرب الكرة بجانب الجسم وبارتفاع الرأس بوضعية صينية التقديم المفتوحة',
      'توجيه الكرة بعمق نحو الزجاج المتقاطع للخصم لمنع ارتدادها العالي',
      'التقدم الفوري للشبكة فور إتمام متابعة الضربة'
    ],
    drillSteps: [
      'تنفيذ 20 تكرار بانديخا متتالية مع التركيز على العمق والهدوء بدلاً من القوة العشوائية.'
    ],
    equipmentNeeded: 'مضرب بادل + سلة كرات'
  },

  // =========================================================================
  // LEVEL 4: المتقدم (Advanced)
  // التركيز: الزاوية المزدوجة، ضربة الباخادا الهجومية، والفيبورا السريعة
  // =========================================================================
  {
    id: 'vid-l4-double-glass',
    youtubeId: '5KMcj7Qjhso',
    youtubeUrl: 'https://www.youtube.com/watch?v=5KMcj7Qjhso',
    thumbnailUrl: 'https://img.youtube.com/vi/5KMcj7Qjhso/hqdefault.jpg',
    titleAr: 'المستوى 4: الدفاع المعقد عن الزاوية المزدوجة (Doble Pared)',
    titleEn: 'Level 4: Advanced Double Glass Rebounds with Confidence',
    category: 'walls',
    categoryAr: 'الجدران الزجاجية',
    topicCategory: 'walls',
    topicCategoryAr: 'الجدران الزجاجية والدفاع',
    level: 'متقدم',
    levelNumbers: [4],
    levelBadgeText: 'المستوى 4 (Level 4)',
    duration: '08:45 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Glass Defense Specialty',
    courtDiagramType: 'walls',
    descriptionAr: 'فك لغز الزوايا المزدوجة؛ تحديد ترتيب ارتداد الكرة (جانبي ثم خلفي أو العكس) وتدوير الجسد مع مسار الكرة لضربها بثبات.',
    keyTakeaways: [
      'قاعدة اتجاه الدوران: الدوران دائماً مع مسار الكرة وليس في مواجهتها',
      'الهدوء التام والانتظار حتى تفقد الكرة سرعتها بعد الارتداد الثاني',
      'تجنب حشر نفسك داخل زاوية الملعب أثناء دوران الكرة'
    ],
    drillSteps: [
      'التدرب على قراءة 20 كرة في الزاوية المزدوجة اليمنى واليسرى.'
    ],
    equipmentNeeded: 'ملعب بادل كامل + كرات تدريب'
  },
  {
    id: 'vid-l4-bajada-attack',
    youtubeId: 'ZA-F3AR5vgE',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZA-F3AR5vgE',
    thumbnailUrl: 'https://img.youtube.com/vi/ZA-F3AR5vgE/hqdefault.jpg',
    titleAr: 'المستوى 4: ضربة الباخادا الهجومية (Bajada de Pared) وأماكن التسديد',
    titleEn: 'Level 4: Offensive Bajada de Pared Placement & Tactics',
    category: 'walls',
    categoryAr: 'الجدران الزجاجية',
    topicCategory: 'walls',
    topicCategoryAr: 'الجدران الزجاجية والدفاع',
    level: 'متقدم',
    levelNumbers: [4],
    levelBadgeText: 'المستوى 4 (Level 4)',
    duration: '08:20 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Glass Defense Specialty',
    courtDiagramType: 'walls',
    descriptionAr: 'تحويل ارتداد الكرة العالي من الزجاج الخلفي إلى هجوم قاطع؛ اختيار زوايا التسديد بين كرات المنتصف والهجوم على القدم البعيدة.',
    keyTakeaways: [
      'التسديد في المنتصف بين الخصمين هو الخيار الأكثر أماناً وفاعلية',
      'رفع المضرب عالياً خلف الرأس أثناء ارتداد الكرة من الزجاج',
      'الانطلاق للأمام فور تسديد الباخادا لمتابعة الكرة عند الشبكة'
    ],
    drillSteps: [
      'تنفيذ 15 ضربة باخادا سريعة موجهة للمنتصف و10 ضربات موجهة للقدم البعيدة.'
    ],
    equipmentNeeded: 'ملعب بزجاج خلفي + سلة كرات'
  },
  {
    id: 'vid-l4-vibora-sidespin',
    youtubeId: 'PihyQF3EnHk',
    youtubeUrl: 'https://www.youtube.com/watch?v=PihyQF3EnHk',
    thumbnailUrl: 'https://img.youtube.com/vi/PihyQF3EnHk/hqdefault.jpg',
    titleAr: 'المستوى 4: ضربة الفيبورا الحادة (The Vibora) بالدوران الجانبي',
    titleEn: 'Level 4: Vibora Mechanics & Aggressive Sidespin',
    category: 'overhead',
    categoryAr: 'اللعب عند الشبكة والتكتيك',
    topicCategory: 'net_tactics',
    topicCategoryAr: 'اللعب عند الشبكة والتكتيك المتقدم',
    level: 'متقدم',
    levelNumbers: [4],
    levelBadgeText: 'المستوى 4 (Level 4)',
    duration: '09:15 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Advanced Overheads',
    courtDiagramType: 'net',
    descriptionAr: 'التكنيك الحركي لتوليد دوران جانبي حاد يلتف بالكرة على الجدران الزجاجية ويجعلها تزحف على الأرض بصعوبة بالغة.',
    keyTakeaways: [
      'التفاف المضرب حول الجانب الأيمن للكرة بزاوية سريعة ومباغتة',
      'توجيه الضربة نحو أقدام المدافعين أو زاوية التقاء الزجاجين',
      'استخدام قوة دوران الجذع لتوليد السرعة دون إجهاد مفصل الكوع'
    ],
    drillSteps: [
      'ممارسة ضرب كرات بارتفاع الكتف مع التركيز على صوت الاحتكاك والدوران الجانبي.'
    ],
    equipmentNeeded: 'مضرب احترافي + كرات تدريب'
  },

  // =========================================================================
  // LEVEL 5: الاحترافي والتنافسي (Elite / Pro)
  // التركيز: ضربة الرولو على الشبك، ضربات السحق، وحسم النقطة
  // =========================================================================
  {
    id: 'vid-l5-rulo-fence',
    youtubeId: 'c6_RpU4hsFY',
    youtubeUrl: 'https://www.youtube.com/watch?v=c6_RpU4hsFY',
    thumbnailUrl: 'https://img.youtube.com/vi/c6_RpU4hsFY/hqdefault.jpg',
    titleAr: 'المستوى 5: ضربة الرولو العلوية الساقطة على الشبك المعدني (The Rulo)',
    titleEn: 'Level 5: Topspin Rulo into the Fence Mastery',
    category: 'overhead',
    categoryAr: 'اللعب عند الشبكة والتكتيك',
    topicCategory: 'net_tactics',
    topicCategoryAr: 'اللعب عند الشبكة والتكتيك المتقدم',
    level: 'احترافي',
    levelNumbers: [5],
    levelBadgeText: 'المستوى 5 (Level 5)',
    duration: '08:50 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Elite Overheads',
    courtDiagramType: 'net',
    descriptionAr: 'تنفيذ ضربة الرولو الهجومية بدوران علوي مقوس لإسقاط الكرة بدقة على الشبك السلكي الجانبي وإحداث ارتداد عشوائي يستحيل صده.',
    keyTakeaways: [
      'استخدام ضربة التوب سبين لإسقاط الكرة بحدة خلف الشباك',
      'استهداف الشبك السلكي الجانبي لإحداث ارتداد عشوائي',
      'خيار تكتيكي بديل ومنخفض المخاطر مقارنة بالسحق العنيف'
    ],
    drillSteps: [
      'توجيه 15 ضربة رولو خفيفة تستهدف الشبك المعدني الأيمن والأيسر.'
    ],
    equipmentNeeded: 'كرات بادل + ملعب'
  },
  {
    id: 'vid-l5-smash-finishing',
    youtubeId: '319Zj6kB-zA',
    youtubeUrl: 'https://www.youtube.com/watch?v=319Zj6kB-zA',
    thumbnailUrl: 'https://img.youtube.com/vi/319Zj6kB-zA/hqdefault.jpg',
    titleAr: 'المستوى 5: تكتيكات السحق الاحترافي وحسم النقاط (Flat, Kick & Por 3)',
    titleEn: 'Level 5: Advanced Smash Repertoire & Finishing Tactics',
    category: 'overhead',
    categoryAr: 'اللعب عند الشبكة والتكتيك',
    topicCategory: 'net_tactics',
    topicCategoryAr: 'اللعب عند الشبكة والتكتيك المتقدم',
    level: 'احترافي',
    levelNumbers: [5],
    levelBadgeText: 'المستوى 5 (Level 5)',
    duration: '12:10 دقيقة',
    coachName: 'The Padel School',
    sourceSeries: 'Smash Masterclass',
    courtDiagramType: 'net',
    descriptionAr: 'التفريق بين السحق المستقيم لاسترجاع الكرة فوق الشبكة لملعبك، وبين سحق Por 3 لإخراج الكرة خارج القفص لحسم النقاط.',
    keyTakeaways: [
      'تحديد نوع السحق بناءً على مسافة الكرة وقربها من الشباك',
      'سحق Por 3 يتطلب ضرب الكرة في أعلى نقطة ممكنة مع تدوير علوي حاد',
      'عدم المجازفة بالسحق من عمق الملعب لتفادي المرتدات السريعة'
    ],
    drillSteps: [
      'التدرب على سحق 20 كرة قريبة من الشباك وإرجاعها لملعبك فوق الشبكة.'
    ],
    equipmentNeeded: 'سلة كرات بادل'
  }
];

export const PADEL_VIDEOS = VIDEO_TUTORIALS;