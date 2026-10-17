import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  PageRoute, 
  PadelLevelNumber, 
  TestResultData, 
  TrainingSession, 
  UserProfile 
} from '../types';
import { PADEL_LEVELS } from '../data/assessmentData';
import { VIDEO_TUTORIALS } from '../data/videoData';
import { 
  auth, 
  db, 
  googleProvider, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

function cleanForFirestore(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanForFirestore).filter(item => item !== undefined);
  }
  const cleaned: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined) {
      const cleanedVal = cleanForFirestore(val);
      if (cleanedVal !== undefined) {
        cleaned[key] = cleanedVal;
      }
    }
  }
  return cleaned;
}

export function usernameToEmail(username: string): string {
  const trimmed = username.trim().toLowerCase().replace(/\s+/g, '_');
  if (trimmed.includes('@')) {
    return trimmed;
  }
  // Standard ASCII alphanumeric usernames
  if (/^[a-z0-9_.-]+$/.test(trimmed) && trimmed.length >= 2) {
    return `${trimmed}@padellevel.pro`;
  }
  // Deterministic safe mapping for Arabic and UTF-8 usernames to valid email format
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = ((hash << 5) - hash) + trimmed.charCodeAt(i);
    hash |= 0;
  }
  const cleanAscii = trimmed.replace(/[^a-z0-9_]/g, '');
  const prefix = cleanAscii ? cleanAscii.slice(0, 15) : 'athlete';
  return `${prefix}_${Math.abs(hash)}@padellevel.pro`;
}

export function legacyUsernameToEmail(username: string): string {
  const trimmed = username.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = ((hash << 5) - hash) + trimmed.charCodeAt(i);
    hash |= 0;
  }
  const cleanAscii = trimmed.replace(/[^a-z0-9_]/g, '');
  const prefix = cleanAscii ? cleanAscii.slice(0, 15) : 'player';
  return `${prefix}_${Math.abs(hash)}@padellevel.pro`;
}

export interface SkillItemDefinition {
  id: string;
  nameAr: string;
  category: string;
  descriptionAr: string;
}

export const MASTER_SKILLS_LIST: SkillItemDefinition[] = [
  { id: 'forehand_control', nameAr: 'التحكم في الفورهاند (Forehand Control)', category: 'ضربات أرضية', descriptionAr: 'توجيه ضربات الفورهاند بدقة وعمق وثبات في عمق الملعب' },
  { id: 'backhand_control', nameAr: 'التحكم في الباكهاند (Backhand Control)', category: 'ضربات أرضية', descriptionAr: 'إعادة كرات الباكهاند بأمان وقوة وتجنب الأخطاء عند الزوايا' },
  { id: 'volley_net', nameAr: 'الفولي عند الشبكة (Volley)', category: 'كرات هوائية', descriptionAr: 'لكم الكرة بحركة Punch قاطعة وتوجيهها في أقدام الخصم' },
  { id: 'smash_overhead', nameAr: 'الضربة الساحقة (Smash / Remate)', category: 'كرات هوائية', descriptionAr: 'حسم الكرات العالية بتوجيه ذكي أو إخراج الكرة خارج القفص' },
  { id: 'footwork_split', nameAr: 'حركة القدمين والرشاقة (Footwork)', category: 'لياقة والحركة', descriptionAr: 'إتقان القفزة التحضيرية والخطوات الجانبية والتوازن' },
  { id: 'movement_recovery', nameAr: 'التمركز واستعادة الموقع (Recovery)', category: 'تمركز', descriptionAr: 'العودة الفورية لموقع التمركز المثالي بعد كل ضربة' },
  { id: 'using_walls', nameAr: 'استخدام الجدران الزجاجية (Using Walls)', category: 'جدران', descriptionAr: 'قراءة ارتداد الكرة من الزجاج الخلفي والمزدوج بهدوء' },
  { id: 'bandeja_shot', nameAr: 'ضربة البانديخا (Bandeja)', category: 'ضربات خاصة', descriptionAr: 'الحفاظ على موقع الشبكة بضربة هوائية مقطوعة عميقة' },
  { id: 'vibora_shot', nameAr: 'ضربة الفيبورا (Víbora)', category: 'ضربات خاصة', descriptionAr: 'هجوم حاسم بدوران جانبي يزحف بالكرة على الأرض' },
  { id: 'tactics_positioning', nameAr: 'التمركز والتناغم المشترك (Tactics & Positioning)', category: 'تكتيك', descriptionAr: 'التحرك كحبل متصل مع الزميل والتواصل الصوتي المستمر' },
  { id: 'consistency_rallies', nameAr: 'الثبات في الراليات (Consistency)', category: 'عقلية وصبر', descriptionAr: 'بناء النقطة بصبر وتبادل 15+ ضربة دون ارتكاب خطأ ذاتي' },
  { id: 'shot_placement', nameAr: 'توجيه ودقة وضع الكرة (Shot Placement)', category: 'دقة وتوجيه', descriptionAr: 'استهداف الفراغات بين اللاعبين وزوايا الشباك والزجاج' }
];

interface AppContextType {
  user: UserProfile | null;
  firebaseUser: any | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  currentPage: PageRoute;
  selectedTechniqueSlug: string | null;
  testResult: TestResultData | null;
  trainingSessions: TrainingSession[];
  masteredSkills: string[];
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  navigateTo: (page: PageRoute, params?: { techniqueSlug?: string }) => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithUsername: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  registerWithUsername: (username: string, fullName: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginDemo: () => void;
  logout: () => Promise<void>;
  saveAssessmentResult: (result: TestResultData) => Promise<void>;
  saveTestResult: (result: TestResultData) => Promise<void>;
  addTrainingSession: (session: Omit<TrainingSession, 'id' | 'createdAt'>) => Promise<void>;
  deleteTrainingSession: (id: string) => Promise<void>;
  toggleSkillMastered: (skillId: string) => void;
  theme: 'court-blue' | 'athletic-pink';
  setTheme: (theme: 'court-blue' | 'athletic-pink') => void;
  watchedVideoIds: string[];
  toggleVideoWatched: (videoId: string) => void;
  isVideoWatched: (videoId: string) => boolean;
  videoCompletionStats: {
    watchedCount: number;
    totalCount: number;
    percentage: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'padellevel_user',
  TEST_RESULT: 'padellevel_test_result',
  SESSIONS: 'padellevel_sessions',
  SKILLS: 'padellevel_mastered_skills',
  WATCHED_VIDEOS: 'padellevel_watched_videos'
};

const DEFAULT_DEMO_SESSIONS: TrainingSession[] = [
  {
    id: 'sess-1',
    userId: 'demo_user',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    focus: 'تقنية وتكنيك الفولي عند الشبكة',
    intensity: 'high',
    durationMinutes: 75,
    skillsWorkedOn: ['volley_net', 'footwork_split', 'shot_placement'],
    rating: 8,
    notes: 'تحسن ملحوظ في توجيه الفولي القاطع نحو الزجاج الجانبي، والالتزام بالوقفة المنخفضة.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sess-2',
    userId: 'demo_user',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    focus: 'الدفاع عن الجدار الزجاجي الخلفي واللوب',
    intensity: 'medium',
    durationMinutes: 60,
    skillsWorkedOn: ['using_walls', 'movement_recovery', 'consistency_rallies'],
    rating: 9,
    notes: 'تم تبادل 12 رالي طويل متصل بدون ارتكاب خطأ في الشبكة، مع تنفيذ لوب دفاعي متقن.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sess-3',
    userId: 'demo_user',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    focus: 'مباراة تدريبية وتمركز ثنائي',
    intensity: 'competition',
    durationMinutes: 90,
    skillsWorkedOn: ['tactics_positioning', 'forehand_control', 'backhand_control'],
    rating: 8,
    notes: 'تواصل صوتي ممتاز مع الزميل وتغطية الخط المستقيم بنجاح في أغلب النقاط.',
    createdAt: new Date().toISOString()
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    try {
      const saved = localStorage.getItem('padellevel_user');
      return saved ? 'dashboard' : 'level-test';
    } catch {
      return 'level-test';
    }
  });
  const [selectedTechniqueSlug, setSelectedTechniqueSlug] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [testResult, setTestResult] = useState<TestResultData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEST_RESULT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredSkills, setMasteredSkills] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WATCHED_VIDEOS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setThemeState] = useState<'court-blue' | 'athletic-pink'>(() => {
    try {
      const saved = localStorage.getItem('padellevel_theme');
      return (saved === 'athletic-pink' || saved === 'court-blue') ? saved : 'court-blue';
    } catch {
      return 'court-blue';
    }
  });

  const setTheme = (newTheme: 'court-blue' | 'athletic-pink') => {
    setThemeState(newTheme);
    localStorage.setItem('padellevel_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen to Firebase Auth state changes for session persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      setIsAuthLoading(true);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const profile = userSnap.data() as UserProfile;
            setUser(profile);
            if (profile.testTaken && profile.pillarBreakdown) {
              setTestResult({
                totalScore: profile.testScore || 0,
                maxScore: 80,
                percentage: Math.round(((profile.testScore || 0) / 80) * 100),
                levelNumber: profile.levelNumber || 3,
                levelTitle: profile.padelLevel || 'متوسط',
                playtomicScore: profile.playtomicScore || 4.0,
                playtomicTier: profile.playtomicTier || 'C+',
                playtomicBadge: `Playtomic ${profile.playtomicScore || 4.0}`,
                pillarBreakdown: profile.pillarBreakdown,
                strengths: profile.strengths || [],
                weaknesses: profile.weaknesses || [],
                personalizedMessage: 'مرحباً بك مجدداً في ملفك الشخصي المحدث.',
                takenAt: profile.testResultDate || new Date().toISOString(),
                answers: {}
              });
            }
          } else {
            const newProfile: UserProfile = {
              id: fbUser.uid,
              fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'لاعب بادل',
              email: fbUser.email || '',
              ...(fbUser.photoURL ? { photoURL: fbUser.photoURL } : {}),
              testTaken: false,
              createdAt: new Date().toISOString()
            };
            try {
              await setDoc(userDocRef, cleanForFirestore(newProfile));
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, `users/${fbUser.uid}`);
            }
            setUser(newProfile);
          }

          // Fetch training sessions from Firestore
          try {
            const q = query(collection(db, 'training_sessions'), where('userId', '==', fbUser.uid));
            const querySnapshot = await getDocs(q);
            const sessions: TrainingSession[] = [];
            querySnapshot.forEach((d) => {
              sessions.push(d.data() as TrainingSession);
            });
            if (sessions.length > 0) {
              setTrainingSessions(sessions);
            }
          } catch (err) {
            handleFirestoreError(err, OperationType.LIST, 'training_sessions');
          }
        } catch (error) {
          console.error('Error loading user data from Firestore:', error);
        }
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    if (testResult) {
      localStorage.setItem(STORAGE_KEYS.TEST_RESULT, JSON.stringify(testResult));
    }
  }, [testResult]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(trainingSessions));
  }, [trainingSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(masteredSkills));
  }, [masteredSkills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WATCHED_VIDEOS, JSON.stringify(watchedVideoIds));
    } catch {
      // ignore
    }
  }, [watchedVideoIds]);

  const navigateTo = (page: PageRoute, params?: { techniqueSlug?: string }) => {
    setCurrentPage(page);
    if (params?.techniqueSlug) {
      setSelectedTechniqueSlug(params.techniqueSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Google Authentication via Firebase
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const userDocRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userDocRef);
      
      let profile: UserProfile;
      if (userSnap.exists()) {
        profile = userSnap.data() as UserProfile;
      } else {
        profile = {
          id: fbUser.uid,
          fullName: fbUser.displayName || 'لاعب جوجل بادل',
          email: fbUser.email || 'player@padellevel.pro',
          ...(fbUser.photoURL ? { photoURL: fbUser.photoURL } : {}),
          testTaken: !!testResult,
          ...(testResult ? {
            padelLevel: testResult.levelTitle,
            levelNumber: testResult.levelNumber,
            testScore: testResult.totalScore,
            playtomicScore: testResult.playtomicScore,
            playtomicTier: testResult.playtomicTier,
            pillarBreakdown: testResult.pillarBreakdown
          } : {}),
          createdAt: new Date().toISOString()
        };
        try {
          await setDoc(userDocRef, cleanForFirestore(profile));
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${fbUser.uid}`);
        }
      }
      setUser(profile);
      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'فشل تسجيل الدخول بواسطة Google.';
      return { success: false, message };
    }
  };

  function getFirebaseAuthErrorMessage(error: any): string {
    if (!error) return 'حدث خطأ أثناء المصادقة.';
    const code = error.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التأكد من البيانات أو إنشاء حساب جديد.';
      case 'auth/email-already-in-use':
        return 'اسم المستخدم هذا مسجل مسبقاً. يرجى اختيار اسم مستخدم آخر أو تسجيل الدخول.';
      case 'auth/weak-password':
        return 'كلمة المرور ضعيفة جداً. يجب أن تتكون من 6 خانات على الأقل.';
      case 'auth/invalid-email':
        return 'صيغة اسم المستخدم غير صالحة. يرجى استخدام أحرف وأرقام صالحة.';
      case 'auth/user-disabled':
        return 'تم تعطيل هذا الحساب. يرجى التواصل مع إدارة المنصة.';
      case 'auth/too-many-requests':
        return 'تم حظر المحاولات مؤقتاً لتكرار المحاولات الخاطئة. يرجى الانتظار دقيقة والمحاولة مجدداً.';
      case 'auth/network-request-failed':
        return 'تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مجدداً.';
      default:
        return error.message || 'فشلت العملية. يرجى التأكد من صحة البيانات.';
    }
  }

  // Pure Username and Password Login with Firebase Auth
  const login = async (identifier: string, pass: string) => {
    try {
      if (!identifier.trim() || !pass.trim()) {
        return { success: false, message: 'يرجى إدخال اسم المستخدم وكلمة المرور.' };
      }

      const cleanUsername = identifier.trim().toLowerCase().replace(/\s+/g, '_');
      let targetEmail = usernameToEmail(cleanUsername);

      let result;
      try {
        result = await signInWithEmailAndPassword(auth, targetEmail, pass);
      } catch (err: any) {
        // Fallback to legacy hash email if identifier is not an explicit @ email
        if (!cleanUsername.includes('@')) {
          const legacyEmail = legacyUsernameToEmail(cleanUsername);
          if (legacyEmail !== targetEmail) {
            try {
              result = await signInWithEmailAndPassword(auth, legacyEmail, pass);
              targetEmail = legacyEmail;
            } catch {
              throw err;
            }
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }

      const fbUser = result.user;
      const userDocRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userDocRef);

      let profile: UserProfile;
      if (userSnap.exists()) {
        profile = userSnap.data() as UserProfile;
        if (!profile.username) {
          profile.username = cleanUsername.includes('@') ? (profile.fullName || 'athlete') : cleanUsername;
        }
      } else {
        profile = {
          id: fbUser.uid,
          fullName: fbUser.displayName || cleanUsername,
          username: cleanUsername.includes('@') ? (fbUser.displayName || 'athlete') : cleanUsername,
          email: targetEmail,
          testTaken: !!testResult,
          ...(testResult ? {
            padelLevel: testResult.levelTitle,
            levelNumber: testResult.levelNumber,
            testScore: testResult.totalScore,
            playtomicScore: testResult.playtomicScore,
            playtomicTier: testResult.playtomicTier,
            testResultDate: testResult.takenAt,
            strengths: testResult.strengths || [],
            weaknesses: testResult.weaknesses || [],
            pillarBreakdown: testResult.pillarBreakdown
          } : {}),
          createdAt: new Date().toISOString()
        };
        try {
          await setDoc(userDocRef, cleanForFirestore(profile));
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${fbUser.uid}`);
        }
      }

      setUser(profile);
      closeAuthModal();
      navigateTo('dashboard');
      return { success: true };
    } catch (err: any) {
      const message = getFirebaseAuthErrorMessage(err);
      return { success: false, message };
    }
  };

  // Pure Athlete Registration with chosen Username and Password
  const registerWithUsername = async (username: string, fullName: string, pass: string) => {
    try {
      const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '_');
      const cleanFullName = fullName.trim() || cleanUsername;

      if (!cleanUsername || !pass.trim()) {
        return { success: false, message: 'يرجى إدخال اسم المستخدم وكلمة المرور المطلوبة.' };
      }

      if (cleanUsername.length < 3) {
        return { success: false, message: 'اسم المستخدم يجب ألا يقل عن 3 أحرف.' };
      }

      if (pass.length < 6) {
        return { success: false, message: 'كلمة المرور يجب ألا تقل عن 6 خانات.' };
      }

      const targetEmail = usernameToEmail(cleanUsername);

      const result = await createUserWithEmailAndPassword(auth, targetEmail, pass);
      const fbUser = result.user;

      try {
        await updateProfile(fbUser, { displayName: cleanFullName });
      } catch {
        // non-critical
      }

      const newProfile: UserProfile = {
        id: fbUser.uid,
        fullName: cleanFullName,
        username: cleanUsername,
        email: targetEmail,
        testTaken: !!testResult,
        ...(testResult ? {
          padelLevel: testResult.levelTitle,
          levelNumber: testResult.levelNumber,
          testScore: testResult.totalScore,
          playtomicScore: testResult.playtomicScore,
          playtomicTier: testResult.playtomicTier,
          testResultDate: testResult.takenAt,
          strengths: testResult.strengths || [],
          weaknesses: testResult.weaknesses || [],
          pillarBreakdown: testResult.pillarBreakdown
        } : {}),
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', fbUser.uid), cleanForFirestore(newProfile));
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${fbUser.uid}`);
      }

      setUser(newProfile);
      closeAuthModal();
      navigateTo('dashboard');
      return { success: true };
    } catch (err: any) {
      const message = getFirebaseAuthErrorMessage(err);
      return { success: false, message };
    }
  };

  const register = async (fullNameOrUsername: string, emailOrUsername: string, pass: string) => {
    const username = emailOrUsername ? emailOrUsername : fullNameOrUsername;
    const fullName = fullNameOrUsername !== emailOrUsername ? fullNameOrUsername : '';
    return registerWithUsername(username, fullName, pass);
  };

  const loginWithUsername = async (username: string, pass: string) => {
    return login(username, pass);
  };

  const loginDemo = () => {
    const demoLevel: PadelLevelNumber = 3;
    const levelInfo = PADEL_LEVELS[demoLevel];
    const demoResult: TestResultData = {
      totalScore: 56,
      maxScore: 80,
      percentage: 70,
      levelNumber: demoLevel,
      levelTitle: levelInfo.titleAr,
      playtomicScore: 4.60,
      playtomicTier: 'B',
      playtomicBadge: 'Playtomic Level 4.60 (B)',
      pillarBreakdown: {
        serve_return: {
          key: 'serve_return',
          nameAr: 'الإرسال واستقبال الإرسال',
          score: 11,
          maxScore: 16,
          percentage: 69,
          playtomicScore: 4.50,
          tier: 'C+',
          tierAr: 'متوسط أعلى (Tier C+)'
        },
        net_volleys: {
          key: 'net_volleys',
          nameAr: 'اللعب عند الشبكة والكرات الطائرة',
          score: 13,
          maxScore: 16,
          percentage: 81,
          playtomicScore: 5.50,
          tier: 'B',
          tierAr: 'متقدم تنافسي (Tier B)'
        },
        overhead_shots: {
          key: 'overhead_shots',
          nameAr: 'الضربات الهوائية والعلوية',
          score: 10,
          maxScore: 16,
          percentage: 63,
          playtomicScore: 4.00,
          tier: 'C+',
          tierAr: 'متوسط أعلى (Tier C+)'
        },
        wall_defense: {
          key: 'wall_defense',
          nameAr: 'الارتداد عن الزجاج الدفاعي واللوب',
          score: 10,
          maxScore: 16,
          percentage: 63,
          playtomicScore: 4.00,
          tier: 'C+',
          tierAr: 'متوسط أعلى (Tier C+)'
        },
        tactics_positioning: {
          key: 'tactics_positioning',
          nameAr: 'التمركز التكتيكي واستراتيجية الملعب',
          score: 12,
          maxScore: 16,
          percentage: 75,
          playtomicScore: 5.00,
          tier: 'B',
          tierAr: 'متقدم تنافسي (Tier B)'
        }
      },
      strengths: [
        'تميز واضح في الكرات الهوائية واللعب عند الشبكة بنسبة إتقان 81%',
        'إتقان واعد في التمركز التكتيكي والتناغم مع الزميل',
        'فهم ملموس لقوانين التمركز والحفاظ على التوازن أثناء المباراة'
      ],
      weaknesses: [
        'أولوية تدريب: تطوير ضربات البانديخا والفيبورا لمنع الخصم من استرداد موقع الهجوم',
        'تحسين اللوب الدفاعي المرتفع في الزوايا المعقدة وقراءة ارتداد الجدار المزدوج'
      ],
      personalizedMessage: 'أداء متميز! تصنيفك وفق معايير Playtomic هو (Playtomic Level 4.60 B)، في المستوى الثالث (متوسط / متوسط أعلى). تمتلك فهماً تكتيكياً جيداً وتستطيع السيطرة على مجريات اللعب. برنامجك التدريبي لمدة 8 أسابيع جاهز للارتقاء بمهاراتك نحو الفئة المتقدمة.',
      takenAt: new Date().toISOString(),
      answers: {}
    };

    const demoProfile: UserProfile = {
      id: 'demo_user_001',
      fullName: 'كابتن أحمد يوسف',
      email: 'player@padellevel.pro',
      padelLevel: levelInfo.titleAr,
      levelNumber: demoLevel,
      testScore: 56,
      playtomicScore: 4.60,
      playtomicTier: 'B',
      pillarBreakdown: demoResult.pillarBreakdown,
      testTaken: true,
      testResultDate: new Date().toISOString(),
      strengths: demoResult.strengths,
      weaknesses: demoResult.weaknesses,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    setUser(demoProfile);
    setTestResult(demoResult);
    setTrainingSessions(DEFAULT_DEMO_SESSIONS);
    setMasteredSkills(['forehand_control', 'volley_net', 'footwork_split', 'consistency_rallies']);
    closeAuthModal();
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    setTestResult(null);
    setTrainingSessions([]);
    setMasteredSkills([]);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TEST_RESULT);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    navigateTo('dashboard');
  };

  const saveAssessmentResult = async (result: TestResultData) => {
    setTestResult(result);
    localStorage.setItem(STORAGE_KEYS.TEST_RESULT, JSON.stringify(result));

    const userId = user ? user.id : ('guest_' + Date.now());
    const updatedUser: UserProfile = {
      id: userId,
      fullName: user ? user.fullName : 'لاعب بادل',
      email: user ? user.email : 'guest@padellevel.pro',
      padelLevel: result.levelTitle,
      levelNumber: result.levelNumber,
      testScore: result.totalScore,
      playtomicScore: result.playtomicScore,
      playtomicTier: result.playtomicTier,
      pillarBreakdown: result.pillarBreakdown,
      testTaken: true,
      testResultDate: result.takenAt,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      createdAt: user?.createdAt || new Date().toISOString()
    };

    setUser(updatedUser);

    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), cleanForFirestore(updatedUser), { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
      }
    }
  };

  const addTrainingSession = async (sessionData: Omit<TrainingSession, 'id' | 'createdAt'>) => {
    const userId = auth.currentUser ? auth.currentUser.uid : (user ? user.id : 'demo_user');
    const newSession: TrainingSession = {
      ...sessionData,
      userId,
      id: 'sess_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setTrainingSessions(prev => [newSession, ...prev]);

    try {
      await setDoc(doc(db, 'training_sessions', newSession.id), cleanForFirestore(newSession));
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `training_sessions/${newSession.id}`);
    }
  };

  const deleteTrainingSession = async (id: string) => {
    setTrainingSessions(prev => prev.filter(s => s.id !== id));
    try {
      await deleteDoc(doc(db, 'training_sessions', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `training_sessions/${id}`);
    }
  };

  const toggleSkillMastered = (skillId: string) => {
    setMasteredSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    );
  };

  const toggleVideoWatched = (videoId: string) => {
    setWatchedVideoIds(prev => 
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const isVideoWatched = (videoId: string) => watchedVideoIds.includes(videoId);

  const videoCompletionStats = useMemo(() => {
    const totalCount = VIDEO_TUTORIALS.length;
    const watchedCount = watchedVideoIds.length;
    const percentage = totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;
    return { watchedCount, totalCount, percentage };
  }, [watchedVideoIds]);

  return (
    <AppContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated: !!user || !!firebaseUser,
        isAuthLoading,
        currentPage,
        selectedTechniqueSlug,
        testResult,
        trainingSessions,
        masteredSkills,
        isAuthModalOpen,
        authModalTab,
        navigateTo,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        login,
        register,
        loginWithUsername,
        registerWithUsername,
        loginDemo,
        logout,
        saveAssessmentResult,
        saveTestResult: saveAssessmentResult,
        addTrainingSession,
        deleteTrainingSession,
        toggleSkillMastered,
        theme,
        setTheme,
        watchedVideoIds,
        toggleVideoWatched,
        isVideoWatched,
        videoCompletionStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
