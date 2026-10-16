export type RacketLevel = 'beginner' | 'intermediate' | 'advanced';
export type RacketShape = 'round' | 'teardrop' | 'diamond';
export type RacketBalance = 'low' | 'medium' | 'high';

export interface PadelRacket {
  id: string;
  modelName: string;
  brand: string;
  level: RacketLevel;
  levelAr: string;
  shape: RacketShape;
  shapeAr: string;
  balance: RacketBalance;
  balanceAr: string;
  weight: string;
  coreMaterial: string;
  faceMaterial: string;
  frameMaterial: string;
  sweetSpot: string;
  controlRating: number;      // 0 - 100
  powerRating: number;        // 0 - 100
  maneuverabilityRating: number; // 0 - 100
  tierSummaryAr: string;      // concise explanation why it fits this skill level
  fullDescriptionAr: string;
  keyFeaturesAr: string[];
  recommendedPlayerTypeAr: string;
  courtPositionAr: string;
  proPlayerEndorsed?: string;
  priceRangeSAR: string;
  imageUrl: string;
  colorAccent: string;
  badgeLabel?: string;
}

export const PADEL_RACKETS: PadelRacket[] = [
  // =========================================================================
  // 1. BEGINNER LEVEL RACKETS (مبتدئ - أقصى تحكم، راحة ومسامحة للأخطاء)
  // =========================================================================
  {
    id: 'adidas-drive-33',
    modelName: 'Drive 3.3',
    brand: 'Adidas',
    level: 'beginner',
    levelAr: 'مبتدئ (Beginner)',
    shape: 'round',
    shapeAr: 'دائري (Round)',
    balance: 'low',
    balanceAr: 'متوازن منخفض (Low / Even Balance)',
    weight: '360 - 375 جم',
    coreMaterial: 'EVA Soft Performance (رغوة ناعمة منخفضة الكثافة)',
    faceMaterial: 'Fiber Glass (ألياف زجاجية مرنة)',
    frameMaterial: 'Fiber Glass + Structural Reinforcement',
    sweetSpot: 'دائرية متسعة وسط المضرب لمسامحة الأخطاء المركزية',
    controlRating: 95,
    powerRating: 64,
    maneuverabilityRating: 96,
    tierSummaryAr: 'نقطة تأثير واسعة ومركزية تسامح ضرب الكرة خارج المنتصف، مع رغوة EVA ناعمة تمتص الصدمات بالكامل لحماية يد المبتدئ.',
    fullDescriptionAr: 'يعتبر أديداس درايف 3.3 الخيار النموذجي لكل من يبدأ رحلته في رياضة البادل. يمتاز بسطح ألياف زجاجية ناعم يمنح ارتداداً سهلاً للكرة دون الحاجة لقوة عضلية كبيرة، مع تقنية Structural Reinforcement حول الإطار لمقاومة الالتواء واحتكاك الجدران.',
    keyFeaturesAr: [
      'تقنية Smart Holes Lineal لتوزيع الثقوب وزيادة متانة السطح',
      'قلب EVA Soft Performance لمنح إحساس ناعم ومريح بالكرة',
      'نقطة ارتداد متسعة تساعد على إتقان ضربات الباك هاند والفورهاند',
      'وزن متوازن يحمي مفصل الكوع والمعصم من الإجهاد الرياضي'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المبتدئون الباحثون عن التحكم والراحة وبناء الثقة في الراليات.',
    courtPositionAr: 'دفاع الخط الخلفي والتحكم الهادئ في وتيرة المباراة',
    priceRangeSAR: '370 - 430 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/8410.jpg',
    colorAccent: '#00d26a',
    badgeLabel: 'الأكثر شعبية للمبتدئين'
  },
  {
    id: 'babolat-reflex',
    modelName: 'Reflex',
    brand: 'Babolat',
    level: 'beginner',
    levelAr: 'مبتدئ (Beginner)',
    shape: 'teardrop',
    shapeAr: 'دمعي هجين (Teardrop / Hybrid)',
    balance: 'medium',
    balanceAr: 'متوسط متوازن (Medium Balance)',
    weight: '355 - 365 جم',
    coreMaterial: 'Low Density EVA Foam (رغوة مرنة ممتصة للاهتزاز)',
    faceMaterial: 'Fiberglass مرن عالي الجودة',
    frameMaterial: 'Carbon & Fiberglass Hybrid Frame',
    sweetSpot: 'متوسطة إلى كبيرة ممتدة أعلى المركز بقليل',
    controlRating: 88,
    powerRating: 75,
    maneuverabilityRating: 92,
    tierSummaryAr: 'شكل دمعي مريح يمنح المبتدئ جرعة قوة هجومية إضافية في الفولي والسحق دون التضحية بخفة الحركة.',
    fullDescriptionAr: 'صمم بابولات ريفليكس للاعبين الذين يتعلمون أساسيات البادل ويرغبون في تجربة أسلوب هجومي ممتع. يجمع بين إطار مرن معزز بالكربون ووجه فايبرجلاس يولد قوة دفع ذاتية تجعل الكرات البعيدة تعبر الشبكة بسلاسة.',
    keyFeaturesAr: [
      'تصميم هجين مرن يعطي اندفاعاً طبيعياً للكرة في الهجمات الأولى',
      'إطار هجين متين معزز بألياف الكربون لتحمل الصدمات العرضية',
      'قبضة يد مريحة بنظام امتصاص الاهتزازات لحماية المرفق',
      'سطح متسامح يسمح بتصحيح الضربات غير الدقيقة'
    ],
    recommendedPlayerTypeAr: 'المبتدئ الطموح ذو النزعة الهجومية الراغب في سرعة إنهاء النقاط.',
    courtPositionAr: 'اللعب الشامل بين الخط الخلفي والتقدم نحو الشبكة',
    priceRangeSAR: '410 - 480 ريال',
    imageUrl: 'https://www.padelreference.com/storage/15993/5cHcZtXb7NOY3TZMjwBkhVIgHwEeww-metacmcucG5n-.webp',
    colorAccent: '#38bdf8',
    badgeLabel: 'هجوم متسامح'
  },
  {
    id: 'bullpadel-indiga-ctr',
    modelName: 'Indiga CTR',
    brand: 'Bullpadel',
    level: 'beginner',
    levelAr: 'مبتدئ (Beginner)',
    shape: 'round',
    shapeAr: 'دائري (Round)',
    balance: 'low',
    balanceAr: 'منخفض نحو المقبض (Low Balance)',
    weight: '360 - 370 جم',
    coreMaterial: 'Soft EVA Foam (امتصاص كامل للصدمات)',
    faceMaterial: 'Polyglass (فايبر جلاس مرن متين)',
    frameMaterial: 'CarbonTube (100% كربون للإطار)',
    sweetSpot: 'واسعة جداً ومركزية لمسامحة أخطاء التمركز',
    controlRating: 96,
    powerRating: 62,
    maneuverabilityRating: 97,
    tierSummaryAr: 'مزود بتقنية Grip Zone التي تعلم يدك الإمساك الصحيح تلقائياً، مع أقصى تحكم دفاعي ممكن.',
    fullDescriptionAr: 'يعتبر بولبادل إنديغا سي تي آر المرجع الأول للمدربين لتعليم المبتدئين. يتميز بتقنية Grip Zone الحصرية التي ترشد اللاعب نحو الزاوية القارية الصحيحة للمقبض، مع سطح Polyglass فائق المرونة وقلب Soft EVA الذي يحمي الذراع تماماً.',
    keyFeaturesAr: [
      'تقنية Grip Zone لتعليم القبضة الصحيحة وتفادي الأخطاء التكنيكية',
      'إطار CarbonTube متين لمقاومة احتكاك الجدران الزجاجية والشباك',
      'قلب Soft EVA لامتصاص 95% من اهتزازات الكرة القوية',
      'أعلى معدل تحكم وسيطرة في الفئة المبتدئة'
    ],
    recommendedPlayerTypeAr: 'اللاعبون الجدد والباحثون عن التحكم التام والدفاع السهل من عمق الملعب.',
    courtPositionAr: 'دفاع الخط الخلفي والتحكم بالكرات الأرضية المرتدة من الزجاج',
    priceRangeSAR: '380 - 440 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/indigactr25.jpg',
    colorAccent: '#b2e01e',
    badgeLabel: 'الموصى به للمبتدئين'
  },
  {
    id: 'head-evo-sanyo',
    modelName: 'Evo Sanyo',
    brand: 'Head',
    level: 'beginner',
    levelAr: 'مبتدئ (Beginner)',
    shape: 'teardrop',
    shapeAr: 'دمعي متسع (Oversized Teardrop)',
    balance: 'medium',
    balanceAr: 'متوسط متزن (Even Balance)',
    weight: '365 جم',
    coreMaterial: 'Soft FOAM (رغوة ناعمة لتوليد أقصى راحة وقوة)',
    faceMaterial: 'Innegra + Fiberglass Composite',
    frameMaterial: 'Power Frame معزز بألياف Innegra',
    sweetSpot: 'متسعة جداً بفضل حجم الرأس الأكبر (Oversize Head)',
    controlRating: 90,
    powerRating: 78,
    maneuverabilityRating: 89,
    tierSummaryAr: 'رأس مكبّر يمنح مساحة ضرب عملاقة ومستوحى من تصميم أسطورة التكنيك سانيو غوتيريز لسهولة إرجاع الكرات الصعبة.',
    fullDescriptionAr: 'مضرب هيد إيفو سانيو يجمع بين الإلهام البصري الأنيق للأسطورة سانيو غوتيريز والميزات المريحة التي يحتاجها المبتدئ. بفضل رأسه المتسع وتقنية Innegra الهجينة، يحصل اللاعب على نقطة حلوة عملاقة تضمن رد أصعب كرات الخصم بدقة وراحة.',
    keyFeaturesAr: [
      'تقنية Innegra الهجينة لامتصاص الصدمات وتحسين ثبات الإطار',
      'رأس Oversized يوفر أكبر مساحة ضرب في فئته السعرية',
      'رغوة Soft FOAM تمنح تسارعاً ذاتياً للكرة عند أقل لمسة',
      'تصميم احترافي مستوحى من خطوط مضارب المحترفين'
    ],
    recommendedPlayerTypeAr: 'المبتدئون الذين يفضلون مساحة ضرب كبيرة ولمسة ناعمة ترسل الكرة بعمق الملعب.',
    courtPositionAr: 'المناطق الخلفية وتبادل الكرات العالية الطويلة (Lobs)',
    priceRangeSAR: '420 - 490 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0531/2013/9427/files/Head-EVO_Extreme_2025_Padel_Racket_PadelUSA_store_1.webp',
    colorAccent: '#f59e0b',
    badgeLabel: 'مساحة ضرب موسعة'
  },
  {
    id: 'nox-x-one',
    modelName: 'X-One',
    brand: 'Nox',
    level: 'beginner',
    levelAr: 'مبتدئ (Beginner)',
    shape: 'round',
    shapeAr: 'دائري متوازن (Round)',
    balance: 'low',
    balanceAr: 'منخفض نحو المقبض (Low Balance)',
    weight: '360 - 375 جم',
    coreMaterial: 'HR3 Core (رغوة نوكس الأيقونية عالية الاستجابة)',
    faceMaterial: '3K Fiber Glass مرن ومتين',
    frameMaterial: '30% Carbon Frame + Fiber Glass',
    sweetSpot: 'دائرية متسعة تغطي أغلب مساحة الوجه',
    controlRating: 93,
    powerRating: 70,
    maneuverabilityRating: 94,
    tierSummaryAr: 'يحتوي على رغوة HR3 الشهيرة من نوكس في فئة المبتدئين لتمنح لمسة احترافية وثباتاً استثنائياً في التوجيه.',
    fullDescriptionAr: 'نوكس إكس ون هو المدخل الذهبي لعلامة نوكس الإسبانية الشهيرة. يحتوي على نفس تركيبة رغوة HR3 Core المتواجدة في مضارب أبطال العالم، ولكن مع سطح فايبر جلاس مرن يوفر شعوراً سلساً بالكرة واستجابة سريعة في الدفاع.',
    keyFeaturesAr: [
      'رغوة HR3 عالية الكثافة ذات الذاكرة السريعة للارتداد المتزن',
      'هيكل Dynamic Composit Structure لتقليل فارق الصلابة بين الإطار والوجه',
      'ألياف زجاجية 3K تزيد من عمر المضرب ومقاومته للضربات المتكررة',
      'توزيع ذكي لثقوب الوجه يقلل من مقاومة الهواء أثناء التلويح'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المبتدئون الباحثون عن جودة صناعة إسبانية ولمسة كرة متينة ومريحة.',
    courtPositionAr: 'الدفاع من الخط الخلفي وتنظيم الراليات الهادئة',
    priceRangeSAR: '440 - 510 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/PXONE26_S1.png',
    colorAccent: '#ef4444',
    badgeLabel: 'رغوة HR3 الأيقونية'
  },
  {
    id: 'siux-sx6',
    modelName: 'SX6',
    brand: 'Siux',
    level: 'beginner',
    levelAr: 'مبتدئ (Beginner)',
    shape: 'round',
    shapeAr: 'دائري (Round)',
    balance: 'low',
    balanceAr: 'منخفض خفيف الحركة (Low Balance)',
    weight: '355 - 370 جم',
    coreMaterial: 'EVA Soft High Recovery (استرجاع سريع للشكل)',
    faceMaterial: 'Fiberglass مرن عالي الجودة',
    frameMaterial: 'Carbon Tubular Frame',
    sweetSpot: 'دائرية مركزية واسعة ومريحة',
    controlRating: 94,
    powerRating: 66,
    maneuverabilityRating: 95,
    tierSummaryAr: 'توازن دقيق مع مرونة فائقة تساعد المبتدئ على التخلص من صعوبات ارتداد الجدران بلمسة واثقة.',
    fullDescriptionAr: 'مضرب سيوكس إس إكس 6 مصمم لتوفير أعلى مستويات الراحة والمتعة في مباريات البادل الأولى. يتميز بإطار كربوني يوفر المتانة اللازمة ورغوة EVA Soft High Recovery التي تمنح مرونة عالية في التقاط الكرات المنخفضة والصعبة.',
    keyFeaturesAr: [
      'قلب EVA Soft High Recovery لتقليل الاهتزازات وتوفير ملمس ناعم',
      'توازن منخفض يمنح سرعة تصرف ومناورة فائقة في الكرات المباغتة',
      'إطار كربوني يمنع تشوه المضرب عند الضربات القوية',
      'مظهر رياضي أنيق بلمسات ذهبية عصرية'
    ],
    recommendedPlayerTypeAr: 'المبتدئون الباحثون عن مضرب مريح للغاية يساعدهم على تطوير تكنيك اليد بثبات.',
    courtPositionAr: 'اللعب الدفاعي والتحكم في إرسال واستقبال الكرات',
    priceRangeSAR: '450 - 520 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0724/3959/5233/files/YPADX3-GLD.jpg',
    colorAccent: '#eab308',
    badgeLabel: 'ملمس ناعم مريح'
  },

  // =========================================================================
  // 2. INTERMEDIATE LEVEL RACKETS (متوسط - توازن تكتيكي، تنوع وقوة متحكم بها)
  // =========================================================================
  {
    id: 'babolat-counter-veron-2024',
    modelName: 'Counter Veron 2024',
    brand: 'Babolat',
    level: 'intermediate',
    levelAr: 'متوسط (Intermediate)',
    shape: 'round',
    shapeAr: 'دائري هجومي متسع (Oversize Round)',
    balance: 'medium',
    balanceAr: 'متوسط متوازن (Medium Balance)',
    weight: '365 جم (+/- 10 جم)',
    coreMaterial: 'Black EVA Foam (مرونة ممتازة مع طاقة ارتداد)',
    faceMaterial: 'Carbon Flex (مزيج ثوري من الكربون والفايبر جلاس)',
    frameMaterial: '100% Carbon Frame',
    sweetSpot: 'واسعة جداً لامتصاص ضربات الخصم والرد بهجوم حاسم',
    controlRating: 89,
    powerRating: 86,
    maneuverabilityRating: 88,
    tierSummaryAr: 'تقنية Carbon Flex تمنح قوة ديناميكية دون القساوة الزائدة، وهو السلاح المثالي للاعب الهجمات المرتدة التكتيكي.',
    fullDescriptionAr: 'صمم بابولات كاونتر فيرون للاعب الذي يتحمل ضغط الخصم ويبني النقطة بصبر ثم ينقض في اللحظة المناسبة. يجمع سطح Carbon Flex بين سرعة استجابة الكربون ومرونة الفايبر جلاس، ليعطيك قوة هجومية ديناميكية وسيطرة كاملة عند الشبكة.',
    keyFeaturesAr: [
      'تقنية Carbon Flex لمزيج متناغم بين قوة الكربون ومرونة الفايبرجلاس',
      'نظام 3D Spin لتعزيز دوران الكرة وقصها في البانديخا والدروب شوت',
      'تقنية Vibrasorb System لامتصاص الاهتزازات وحماية مفصل الذراع',
      'نظام Smart Buttcap لفك واستبدال حزام المعصم بسهولة'
    ],
    recommendedPlayerTypeAr: 'اللاعب التكتيكي الصبور الذي يجيد قلب الدفاع إلى هجوم مباغت.',
    courtPositionAr: 'الجانب الأيمن (Drive) أو اللاعب الدفاعي الشامل',
    priceRangeSAR: '820 - 920 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0531/2013/9427/files/Babolat-Counter_Veron_2.5_2025_Padel_Racket_PadelUSA_store_1.webp',
    colorAccent: '#eab308',
    badgeLabel: 'سلاح الهجمات المرتدة'
  },
  {
    id: 'bullpadel-vertex-04-comfort-2024',
    modelName: 'Vertex 04 Comfort 2024',
    brand: 'Bullpadel',
    level: 'intermediate',
    levelAr: 'متوسط (Intermediate)',
    shape: 'diamond',
    shapeAr: 'ألماسي مريح (Diamond Comfort)',
    balance: 'high',
    balanceAr: 'رأس المضرب متوسط/مرتفع (Medium-High Balance)',
    weight: '360 - 370 جم',
    coreMaterial: 'MultiEVA (طبقتان: خارجية صلبة للقوة وداخلية ناعمة للتحكم)',
    faceMaterial: 'Fibrix HybridFiber (مزيج ألياف زجاجية وكربونية)',
    frameMaterial: 'CarbonTube (100% كربون ثنائي الاتجاه)',
    sweetSpot: 'أعلى رأس المضرب مصممة لقوة الفولي والبانديخا',
    controlRating: 84,
    powerRating: 92,
    maneuverabilityRating: 87,
    tierSummaryAr: 'يمنحك قوة الشكل الألماسي وسحق الكرة مع لمسة Fibrix الهجينة المريحة التي تحمي عضلات الساعد.',
    fullDescriptionAr: 'مضرب النجم العالمي مارتن دي نينو في نسخته المريحة. يقدم بولبادل فيرتكس 04 كومفورت أقصى أداء هجومي مع حماية تامة للذراع بفضل سطح Fibrix الهجين ونواة MultiEVA المزدوجة وتقنية CURVAKTIV الجديدة لمقاومة التواء الإطار.',
    keyFeaturesAr: [
      'هيكل CURVAKTIV الجديد لمقاومة الالتواء وزيادة صلابة المضرب',
      'تقنية Air Power لتحسين ديناميكية الهواء والتلويح الأسرع',
      'سطح Fibrix الهجين الذي يجمع بين لمسة الفايبرجلاس ومتانة الكربون',
      'قلب MultiEVA المزدوج لتقديم أداء متكيف حسب سرعة الكرة'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتوسطون الراغبون في قوة هجومية حاسمة دون إجهاد الذراع.',
    courtPositionAr: 'الجانب الأيسر (Revés) واللعب الهجومي عند الشبكة',
    proPlayerEndorsed: 'Martín Di Nenno',
    priceRangeSAR: '850 - 950 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0531/2013/9427/files/Bullpadel-Vertex-04_Comfort_2025_Padel_Racket_PadelUSA_store_1.webp',
    colorAccent: '#06b6d4',
    badgeLabel: 'هجوم قوي ولمسة مريحة'
  },
  {
    id: 'nox-ml10-pro-cup-luxury-2024',
    modelName: 'ML10 Pro Cup Luxury 2024',
    brand: 'Nox',
    level: 'intermediate',
    levelAr: 'متوسط (Intermediate)',
    shape: 'round',
    shapeAr: 'دائري كلاسيكي (Round)',
    balance: 'low',
    balanceAr: 'منخفض دقيق (Low Balance)',
    weight: '360 - 375 جم',
    coreMaterial: 'HR3 Core Black EVA (أعلى درجات ثبات واسترجاع الطاقة)',
    faceMaterial: 'Carbon 3K + Glass Fiber Silver (ألياف فضية محاكة)',
    frameMaterial: '100% Carbon Frame',
    sweetSpot: 'واسعة جداً ومتوازنة في المركز التام',
    controlRating: 96,
    powerRating: 82,
    maneuverabilityRating: 95,
    tierSummaryAr: 'الأكثر مبيعاً في تاريخ البادل! مضرب الأسطورة ميغيل لامبيرتي المرجعي في الدقة المطلقة والتحكم بالكرات الأرضية.',
    fullDescriptionAr: 'النسخة الفاخرة Luxury من أيقونة البادل الخالدة ML10 Pro Cup لميغيل لامبيرتي. يدمج بين إطار الكربون الكامل ورغوة HR3 الأسطورية مع أحدث أنظمة مانع الاهتزاز AVS وحزام الأمان الذكي SmartStrap لتقديم قمة الثبات والتحكم.',
    keyFeaturesAr: [
      'نظام مضاد للاهتزاز AVS لحماية تامة من التهابات أوتار المرفق',
      'رغوة HR3 الكلاسيكية المشهود لها بأعلى ثبات في تاريخ البادل',
      'سطح Carbon 3K المحاك بلمسات فضية لزيادة صلابة رد الكرة',
      'نظام الأمان SmartStrap القابل للتغيير والنظافة'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتوسطون ومحبو بناء النقطة بدقة ليزرية متناهية وراحة تامة.',
    courtPositionAr: 'الجانب الأيمن (Drive) وتوزيع الكرات التكتيكي',
    proPlayerEndorsed: 'Miguel Lamperti',
    priceRangeSAR: '890 - 980 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/Nox-ML10ProCupCoorp2027MiguelLamperti-Pala-1.png',
    colorAccent: '#b2e01e',
    badgeLabel: 'الأيقونة الأسطورية'
  },
  {
    id: 'adidas-metalbone-team',
    modelName: 'Metalbone Team',
    brand: 'Adidas',
    level: 'intermediate',
    levelAr: 'متوسط (Intermediate)',
    shape: 'diamond',
    shapeAr: 'ألماسي متسع (Oversize Diamond)',
    balance: 'high',
    balanceAr: 'رأس المضرب مرتفع (Head Heavy Balance)',
    weight: '360 - 375 جم',
    coreMaterial: 'EVA Soft Performance (راحة عالية وإخراج كرة سلس)',
    faceMaterial: 'Carbon 3K (ألياف كربونية متينة واستجابة قوية)',
    frameMaterial: 'Octagonal Structure (أنبوب ثماني الأضلاع صلب)',
    sweetSpot: 'مرتفعة قليلاً لزيادة عزم الدوران في السحق',
    controlRating: 82,
    powerRating: 93,
    maneuverabilityRating: 86,
    tierSummaryAr: 'هيكل Octagonal Structure القوي مع رغوة EVA ناعمة يمنحك قوة سحق هائلة دون التخلي عن سهولة اللعب اليومي.',
    fullDescriptionAr: 'ينقل أديداس ميتالبون تيم تقنيات سلسلة المحترفين ميتالبون إلى الفئة المتوسطة المتطورة. بفضل هيكل Octagonal Structure ثماني الأضلاع، يقاوم المضرب الالتواء بنسبة 30% أكثر، مع سطح Spin Blade Gritt الخشن لقص الكرات باحترافية.',
    keyFeaturesAr: [
      'هيكل Octagonal Structure لزيادة الصلابة ومقاومة التواء الإطار',
      'سطح Spin Blade Gritt الرملي لتطبيق أقصى دوران للكرة (Topspin)',
      'توزيع ذكي لثقوب Smart Holes Curve لرفع كفاءة الضربات الهوائية',
      'رغوة EVA Soft Performance لتخفيف الصدمات وتحسين خروج الكرة'
    ],
    recommendedPlayerTypeAr: 'اللاعب المتوسط الذي يبحث عن سلاح هجومي قوي وضربات سحق مدوية.',
    courtPositionAr: 'الجانب الأيسر (Revés) والسيطرة الهجومية عند الشباك',
    priceRangeSAR: '790 - 890 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/8403.jpg',
    colorAccent: '#f97316',
    badgeLabel: 'هيكل ثماني صلب'
  },
  {
    id: 'head-speed-motion',
    modelName: 'Speed Motion',
    brand: 'Head',
    level: 'intermediate',
    levelAr: 'متوسط (Intermediate)',
    shape: 'teardrop',
    shapeAr: 'دمعي انسيابي (Teardrop)',
    balance: 'medium',
    balanceAr: 'متوسط متزن (Even Balance)',
    weight: '360 جم (Lightweight & Agile)',
    coreMaterial: 'Power Foam (رغوة هيد المتفجرة للقوة والسرعة)',
    faceMaterial: 'Hybrid Woven Carbon & Fiberglass',
    frameMaterial: 'Auxetic 2.0 Carbon Construction',
    sweetSpot: 'متوسطة محسّنة بتقنية Optimized Sweet Spot',
    controlRating: 88,
    powerRating: 89,
    maneuverabilityRating: 94,
    tierSummaryAr: 'وزن خفيف مع تقنية Auxetic 2.0 الحديثة يمنح سرعة رد فعل لا تضاهى عند الشبكة وتبديل الاتجاهات.',
    fullDescriptionAr: 'مضرب النجمة العالمية بولا خوسيماريا. يتميز هيد سبيد موشن بتقنية Auxetic 2.0 الثورية التي تتوسع وتنكمش استجابة لضربة الكرة، مما يعطي إحساساً استثنائياً بالدقة وسرعة خاطفة في التلويح بفضل وزنه الخفيف.',
    keyFeaturesAr: [
      'تقنية Auxetic 2.0 لإحساس نقي وفوري بالكرة عند الاصطدام',
      'سطح هجين يجمع بين صلابة الكربون وتسامح الفايبر جلاس',
      'غطاء المقبض Soft Butt Cap لامتصاص الاهتزازات ومنع الإصابات',
      'هندسة متطورة للثقوب ترفع كفاءة نقطة التأثير وتسامح الهفوات'
    ],
    recommendedPlayerTypeAr: 'اللاعبون الباحثون عن سرعة مناورة استثنائية وتنوع كامل بين الدفاع والهجوم.',
    courtPositionAr: 'اللعب الشامل وسرعة اعتراض الكرات الطائرة عند الشبكة',
    proPlayerEndorsed: 'Paula Josemaría',
    priceRangeSAR: '880 - 990 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0531/2013/9427/files/Head-Speed_Motion_2025_Padel_Racket_PadelUSA_store_1_6790b3e8-7889-41de-8870-ef3143f099dd.webp',
    colorAccent: '#a855f7',
    badgeLabel: 'سرعة رد فعل خاطفة'
  },
  {
    id: 'kuikma-pr-990-precision-soft',
    modelName: 'PR 990 Precision Soft',
    brand: 'Kuikma',
    level: 'intermediate',
    levelAr: 'متوسط (Intermediate)',
    shape: 'round',
    shapeAr: 'دائري هندسي (Round Precision)',
    balance: 'low',
    balanceAr: 'منخفض دقيق 260 مم (Low Balance)',
    weight: '370 جم (+/- 5 جم)',
    coreMaterial: 'Soft EVA Foam (امتصاص عالي للصدمات وملمس ناعم)',
    faceMaterial: 'Carbon 12K (كربون عالي الكثافة لمتانة فائقة)',
    frameMaterial: 'Twin Tube Carbon Frame',
    sweetSpot: 'واسعة جداً ومحددة لهندسة الكرات المنخفضة',
    controlRating: 95,
    powerRating: 78,
    maneuverabilityRating: 93,
    tierSummaryAr: 'كربون 12K مع قلب ناعم بسعر تنافسي استثنائي؛ صممه واختبره خبير البادل العالمي أوراسيو كليمنتي لأقصى دقة.',
    fullDescriptionAr: 'ثمرة تعاون ديكاتلون مع أسطورة التدريب العالمية أوراسيو ألفاريز كليمنتي. يقدم كويكما PR 990 بريسيجن سوفت كربون 12K الياباني عالي الجودة مع رغوة Soft EVA وإطار Twin Tube لضمان متانة استثنائية ودقة تماثل أرقى المضارب الإسبانية.',
    keyFeaturesAr: [
      'وجه من كربون 12K المتين لصلابة التوجيه ومقاومة الاحتكاك',
      'إطار Twin Tube Carbon لتقليل تشوه المضرب وزيادة الثبات',
      'حامي شفاف TPU على رأس المضرب للحماية من اصطدام الزجاج',
      'توزيع ثقوب High Evolutive Size لرفع مستوى الدقة وتخفيف الوزن'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتوسطون الباحثون عن أفضل قيمة مقابل سعر مع تحكم استثنائي.',
    courtPositionAr: 'الخط الخلفي وتوجيه الراليات الطويلة بانتظام',
    priceRangeSAR: '550 - 650 ريال',
    imageUrl: 'https://www.padelreference.com/storage/26360/01M1NWWMXJTQM4A11R8X5EV1SF.webp',
    colorAccent: '#06b6d4',
    badgeLabel: 'أفضل قيمة مقابل سعر'
  },

  // =========================================================================
  // 3. ADVANCED / PRO LEVEL RACKETS (متقدم ومحترف - قوة انفجارية وسرعة إنهاء)
  // =========================================================================
  {
    id: 'bullpadel-hack-03',
    modelName: 'Hack 03',
    brand: 'Bullpadel',
    level: 'advanced',
    levelAr: 'متقدم / محترف (Advanced / Pro)',
    shape: 'diamond',
    shapeAr: 'ألماسي هجومي (Diamond Attack)',
    balance: 'high',
    balanceAr: 'مرتفع في قمة الرأس (High Balance)',
    weight: '365 - 375 جم',
    coreMaterial: 'MultiEVA (طبقتان متمايزتان للتحكم والتفجير)',
    faceMaterial: 'Tricarbon (كربون ثلاثي الأبعاد فائق الصلابة والخفة)',
    frameMaterial: 'CarbonTube 100% Carbon + Metalshield Protector',
    sweetSpot: 'علوية ضيقة مركزة لأقصى قوة انفجارية',
    controlRating: 82,
    powerRating: 98,
    maneuverabilityRating: 84,
    tierSummaryAr: 'سلاح أسطورة البادل باquito نافارو! يمنح أقصى قوة ارتداد وسحق لإخراج الكرة خارج القفص بفضل كربون Tricarbon.',
    fullDescriptionAr: 'المضرب الأيقوني للنجم العالمي باquito نافارو. صمم بولبادل هاك 03 للمحترفين الراغبين في سحق كل كرة سانحة. يتميز بقلب Hack المعزز لمقاومة الاهتزاز وسطح Tricarbon الثوري ونظام CustomWeight لتعديل الوزن والتوازن بدقة غرامية.',
    keyFeaturesAr: [
      'تقنية Air React Channel لديناميكية هوائية فائقة وسرعة تأرجح خاطفة',
      'سطح Tricarbon المحاك بشرائط كربونية ثلاثية الاتجاه لأقصى صلابة',
      'نظام CustomWeight لتعديل توازن المضرب بإضافة أوزان مخصصة',
      'مقبض Hesacore المدمج لتقليل الاهتزازات وزيادة ثبات القبضة'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتقدمون ذوو القوة العضلية والتكنيك المتقن الباحثون عن إنهاء حاسم.',
    courtPositionAr: 'الجانب الأيسر (Revés) والهجوم المباشر بالكرات الساحقة',
    proPlayerEndorsed: 'Paquito Navarro',
    priceRangeSAR: '1,150 - 1,290 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/7591.jpg',
    colorAccent: '#f97316',
    badgeLabel: 'سلاح باكيتو نافارو'
  },
  {
    id: 'bullpadel-vertex-04',
    modelName: 'Vertex 04',
    brand: 'Bullpadel',
    level: 'advanced',
    levelAr: 'متقدم / محترف (Advanced / Pro)',
    shape: 'diamond',
    shapeAr: 'ألماسي هجومي (Diamond)',
    balance: 'high',
    balanceAr: 'مرتفع هجومي (Head Heavy Balance)',
    weight: '365 - 375 جم',
    coreMaterial: 'MultiEVA (استجابة تكيفية للكرات البطيئة والسريعة)',
    faceMaterial: 'XT-Carbon 12K (كربون منسوج متقدم للصلابة والسرعة)',
    frameMaterial: 'CarbonTube + حامي معدني Metalshield',
    sweetSpot: 'علوية مركزة مع سطح Topspin الخشن',
    controlRating: 86,
    powerRating: 97,
    maneuverabilityRating: 86,
    tierSummaryAr: 'المضرب الأكثر شهرة في جولات المحترفين مع سطح Topspin الخشن لتوليد أقصى دوران في الفيبورا والبانديخا.',
    fullDescriptionAr: 'مضرب النجم خوان تيلو المفضل. يقدم فيرتكس 04 لعام 2024 نظامين هندسيين جديدين: إطار CURVAKTIV الذي يعزز مقاومة الالتواء وقناة AIR POWER الأوسع لمرور الهواء السلس، مما يجعله أكثر صلابة بنسبة 38% مقارنة بسابقه.',
    keyFeaturesAr: [
      'سطح Topspin الحبيبي الخشن لتوليد أعلى معدل دوران وقطع للكرة',
      'كربون Xtend Carbon 12K الخفيف والقوي جداً لضربات الفولي القاتلة',
      'نظام Vibradrive بقطعة مطاطية في المقبض لامتصاص الاهتزازات الضارة',
      'قبضة Hesacore المبتكرة التي تقلل إجهاد عضلات اليد والكتف'
    ],
    recommendedPlayerTypeAr: 'اللاعبون التنافسيون المحترفون الذين يعتمدون على الدوران الهجومي وسرعة الفولي.',
    courtPositionAr: 'الهجوم عند الشبكة وكرات الفيبورا والسحق بزوايا حادة',
    proPlayerEndorsed: 'Juan Tello & Fede Chingotto',
    priceRangeSAR: '1,180 - 1,320 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/vertex0425.jpg',
    colorAccent: '#ef4444',
    badgeLabel: 'الأكثر طلباً بين المحترفين'
  },
  {
    id: 'nox-at10-genius-18k-agustin-tapia',
    modelName: 'AT10 Genius 18K Agustin Tapia',
    brand: 'Nox',
    level: 'advanced',
    levelAr: 'متقدم / محترف (Advanced / Pro)',
    shape: 'teardrop',
    shapeAr: 'دمعي هجين متوازن (Teardrop / Hybrid)',
    balance: 'medium',
    balanceAr: 'متوسط مثالي (Medium Balance)',
    weight: '360 - 375 جم',
    coreMaterial: 'MLD Black EVA (قلب متعدد الطبقات لتنوع السرعات)',
    faceMaterial: 'Carbon 18K Alum (كربون 18K مطلي بالألومنيوم لثبات الحرارة)',
    frameMaterial: '100% Carbon Frame',
    sweetSpot: 'متوسطة إلى كبيرة ممتدة لأقصى تكامل بين الدفاع والهجوم',
    controlRating: 94,
    powerRating: 95,
    maneuverabilityRating: 96,
    tierSummaryAr: 'مضرب ساحر البادل ومصنف العالم الأول أوغستين تابيا! يقدم التوازن الخارق بين التحكم الدفاعي والقوة الانفجارية.',
    fullDescriptionAr: 'صمم بالتعاون الوثيق مع الساحر الأرجنتيني أوغستين تابيا. يتميز كربون 18K Alum بمقاومته الفائقة لتغيرات درجات الحرارة ليعطيك نفس الإحساس الدقيق صيفاً وشتاءً، مع حواف ديناميكية هوائية تمنحك سرعة انتقال خيالية في الهواء.',
    keyFeaturesAr: [
      'كربون Carbon 18K Alum المعالج بالألومنيوم لثبات صلابة الوجه',
      'حواف هوائية جانبية تقلل مقاومة الهواء وترفع سرعة التلويح',
      'سطح خشن حصى السيليكا لتعزيز أقصى دوران في ضربات السلايس',
      'تقنية Pulse System المطاطية في المقبض لحماية المعصم والمرفق'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتقدمون الذين يرفضون المساومة بين السيطرة التامة والقوة الهجومية.',
    courtPositionAr: 'كافة مراكز الملعب، التحول الخارق من الدفاع للهجوم',
    proPlayerEndorsed: 'Agustín Tapia (Mozart of Padel)',
    priceRangeSAR: '1,220 - 1,350 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/nox_18k.png',
    colorAccent: '#b2e01e',
    badgeLabel: 'مضرب بطل العالم تابيا'
  },
  {
    id: 'babolat-technical-viper',
    modelName: 'Technical Viper',
    brand: 'Babolat',
    level: 'advanced',
    levelAr: 'متقدم / محترف (Advanced / Pro)',
    shape: 'diamond',
    shapeAr: 'ألماسي حاد (Technical Diamond)',
    balance: 'high',
    balanceAr: 'رأس المضرب مرتفع (Head Heavy)',
    weight: '365 جم (+/- 10 جم)',
    coreMaterial: 'X-EVA Core (3 طبقات رغوية متدرجة الصلابة)',
    faceMaterial: '12K Carbon Surface (كربون صلب لاستجابة فورية)',
    frameMaterial: '100% Carbon Frame',
    sweetSpot: 'علوية حادة تترجم القوة الكاملة لضربات السحق',
    controlRating: 80,
    powerRating: 99,
    maneuverabilityRating: 82,
    tierSummaryAr: 'أقوى مضرب هجومي من بابولات على الإطلاق! مخصص للمهاجم الفني (Technical Striker) الباحث عن سرعة خروج كرة لا تصد.',
    fullDescriptionAr: 'السلاح المفضل لنجم العالم خوان ليبرون. مصمم للاعبين الذين يمتلكون تكنيكاً متقدماً وقوة جسدية لتحويل كل ضربة هوائية إلى نقطة رابحة. سطحه المصنوع من كربون 12K الصلب مع قلب X-EVA ثلاثي الطبقات يمنح طاقة متفجرة في كل كرة فوق الرأس.',
    keyFeaturesAr: [
      'قوة متفجرة لا تضاهى لضربات السحق والإنهاء من خارج الملعب (Por 3 / Por 4)',
      'نظام 3D Spin+ البارز لتعزيز احتكاك الكرة ودورانها العالي',
      'تقنية Vibrasorb System2 الحديثة لامتصاص الصدمات القاسية',
      'نمط ثقوب مدروس بحجم مختلف لزيادة تركيز نقل القوة في قمة الرأس'
    ],
    recommendedPlayerTypeAr: 'المهاجمون الفنيون المتقدمون ذوو القوة العضلية الكبيرة الباحثون عن أقصى طاقة.',
    courtPositionAr: 'الجانب الأيسر (Revés) والسيطرة الهوائية الكاملة',
    proPlayerEndorsed: 'Juan Lebrón (El Lobo)',
    priceRangeSAR: '1,190 - 1,340 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/TECHNICALVIPER_1.jpg',
    colorAccent: '#ef4444',
    badgeLabel: 'سلاح خوان ليبرون'
  },
  {
    id: 'head-extreme-pro',
    modelName: 'Extreme Pro',
    brand: 'Head',
    level: 'advanced',
    levelAr: 'متقدم / محترف (Advanced / Pro)',
    shape: 'diamond',
    shapeAr: 'ألماسي هجومي (Diamond Extreme)',
    balance: 'high',
    balanceAr: 'مرتفع هجومي 272 مم (Head Heavy)',
    weight: '370 جم (+/- 5 جم)',
    coreMaterial: 'Power Foam (رغوة هيد فائقة القوة)',
    faceMaterial: 'Hybrid Woven Carbon Surface',
    frameMaterial: 'Auxetic 2.0 Carbon Construction',
    sweetSpot: 'علوية معززة لنقل أقصى طاقة حركية',
    controlRating: 83,
    powerRating: 98,
    maneuverabilityRating: 84,
    tierSummaryAr: 'مضرب المصنف الأول أرتورو كويو! قوة وحشية هائلة تترجم كل تلويحة إلى سرعة كرة مدمرة لا يمكن ردها.',
    fullDescriptionAr: 'سلاح النجم الإسباني أرتورو كويو صاحب أقوى ضربات سحق في جولة المحترفين. بفضل تقنية Auxetic 2.0 الحديثة وتوازن الرأس المرتفع ورغوة Power Foam فائقة الاستجابة، يعطي المضرب أعلى معدل تحويل للطاقة الحركية عند الشبكة.',
    keyFeaturesAr: [
      'تقنية Auxetic 2.0 لشعور فائق بالصلابة والثبات عند ضرب الكرات القوية',
      'سطح هجين مقوى يمنح ارتداداً استثنائياً للكرات العالية (Overhead Shots)',
      'تقنية Extreme Spin المحببة لزيادة دوران الكرة وإرباك الخصم عند الزجاج',
      'مقبض Soft Butt Cap لحماية اليد وتخفيف الضغط على المفصل'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتقدمون وأصحاب الأسلوب الهجومي الكاسح والضربات الساحقة السريعة.',
    courtPositionAr: 'الجانب الأيسر والسيطرة على الكرات العالية فوق الشبكة',
    proPlayerEndorsed: 'Arturo Coello (World #1)',
    priceRangeSAR: '1,180 - 1,310 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/Head-ExtremeMotionPRO26-1-Pala.png',
    colorAccent: '#84cc16',
    badgeLabel: 'مضرب أرتورو كويو'
  },
  {
    id: 'adidas-metalbone-hrd-plus',
    modelName: 'Metalbone HRD+',
    brand: 'Adidas',
    level: 'advanced',
    levelAr: 'متقدم / محترف (Advanced / Pro)',
    shape: 'diamond',
    shapeAr: 'ألماسي هجومي (Oversize Diamond)',
    balance: 'high',
    balanceAr: 'مرتفع قابل للتعديل (Weight & Balance System)',
    weight: '345 - 360 جم (+12 جم نظام الأوزان)',
    coreMaterial: 'EVA High Memory (رغوة صلبة عالية الكثافة وسريعة الذاكرة)',
    faceMaterial: 'Carbon Aluminized 2 to 1 (كربون معالج بالألومنيوم فائق الصلابة)',
    frameMaterial: 'Octagonal Structure 100% Carbon',
    sweetSpot: 'علوية صلبة لأقصى نقل للطاقة الهجومية',
    controlRating: 85,
    powerRating: 99,
    maneuverabilityRating: 87,
    tierSummaryAr: 'المضرب الرسمي للنجم العالمي ألي غالان! مزود بنظام Weight & Balance لتغيير توازن المضرب بحسب خطة المباراة.',
    fullDescriptionAr: 'التحفة الهندسية لألي غالان. مضرب صلب وحازم مصمم للاعبين الذين يطلبون أقصى استجابة من المضرب في كل ضربة. بفضل رغوة EVA High Memory الصلبة وألياف Carbon Aluminized 2 to 1، لن تفقد أي ذرة من طاقتك البدنية أثناء السحق.',
    keyFeaturesAr: [
      'نظام Weight & Balance System لتعديل وزن وتوازن المضرب بـ 6 براغي قابلة للفك',
      'رغوة EVA High Memory عالية الصلابة لنقل أقصى طاقة للكرة في الهجمات السريعة',
      'كربون Carbon Aluminized 2 to 1 المعالج لصلابة تدوم طويلاً ومقاومة فائقة',
      'سطح Spin Blade Gritt الرملي لقص الكرات باحترافية استثنائية'
    ],
    recommendedPlayerTypeAr: 'اللاعبون المتقدمون ذوو السرعة العالية والتكنيك الممتاز الباحثون عن تحكم بالقوة وتعديل الوزن.',
    courtPositionAr: 'الجانب الأيسر (Revés) وسحق الكرات الحاسمة',
    proPlayerEndorsed: 'Ale Galán',
    priceRangeSAR: '1,290 - 1,450 ريال',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0646/3671/5163/files/Metalbone_HRD_3.4_AR1AA1FRONT.png',
    colorAccent: '#ef4444',
    badgeLabel: 'سلاح ألي غالان'
  }
];

// Helper Guide for Racket Shapes
export interface RacketShapeGuide {
  shape: RacketShape;
  titleAr: string;
  subtitleAr: string;
  idealLevelAr: string;
  sweetSpotDescAr: string;
  balanceDescAr: string;
  prosAr: string[];
  consAr: string[];
}

export const RACKET_SHAPE_GUIDES: RacketShapeGuide[] = [
  {
    shape: 'round',
    titleAr: 'الشكل الدائري (Round)',
    subtitleAr: 'التحكم المطلق ونقطة ضرب مركزية واسعة',
    idealLevelAr: 'المبتدئون واللاعبون الدفاعيون ومحبو الراحة',
    sweetSpotDescAr: 'كبيرة جداً في منتصف الرأس، تسامح الكرات التي لا تضرب في المركز تماماً.',
    balanceDescAr: 'منخفض وقريب من مقبض اليد، مما يجعل المضرب خفيفاً وسهل الحركة.',
    prosAr: ['سهولة تحريك ومناورة عالية', 'أقصى درجات حماية الذراع والمرفق', 'ثبات دفاعي عالي من الخط الخلفي'],
    consAr: ['قوة أقل في ضربات السحق (Smash)', 'يتطلب مجهوداً عضلياً إضافياً لإخراج الكرة خارج القفص']
  },
  {
    shape: 'teardrop',
    titleAr: 'الشكل الدمعي (Teardrop)',
    subtitleAr: 'التوازن المثالي بين القوة والسيطرة',
    idealLevelAr: 'اللاعبون المتوسطون والمتنوعون في الأداء',
    sweetSpotDescAr: 'متوسطة إلى كبيرة ممتدة أعلى المركز بقليل، تجمع بين التوجيه وسرعة الكرة.',
    balanceDescAr: 'متوسط (Even Balance)، يوزع الوزن بالتساوي بين الرأس والمقبض.',
    prosAr: ['تعدد استخدامات لا مثيل له في كل مناطق الملعب', 'قوة كافية للبانديخا والفولي دون فقدان الدفاع', 'خيار الأمان الأفضل لمن لا يريد التخصص في طرف واحد'],
    consAr: ['يحتاج ضبطاً حركياً أفضل من المضرب الدائري', 'أثقل نسبياً عند المناورة السريعة جداً للمبتدئ']
  },
  {
    shape: 'diamond',
    titleAr: 'الشكل الألماسي (Diamond)',
    subtitleAr: 'أقصى قوة هجومية وسحق للكرات العالية',
    idealLevelAr: 'المتقدمون والمحترفون ذوو التكنيك المتقن',
    sweetSpotDescAr: 'صغيرة ومركزة في أقصى قمة الرأس، تمنح ذراع عزم دوران هائلة عند الضرب الصحيح.',
    balanceDescAr: 'مرتفع في قمة الرأس (Head-Heavy)، يعطي شعوراً بثقل المضرب عند التلويح.',
    prosAr: ['أقصى طاقة انفجارية لضربات السحق (Smash)', 'إمكانية إخراج الكرة خارج القفص بسهولة للمتقنين', 'سرعة ارتداد كرات الفولي عند الشبكة'],
    consAr: ['نقطة ضرب ضيقة لا تسامح الأخطاء', 'إجهاد أكبر على عضلات الساعد والمرفق إن لم يتوفر تكنيك سليم']
  }
];
