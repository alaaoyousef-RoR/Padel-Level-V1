import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthModal } from './components/AuthModal';
import { Variation3Layout } from './components/Variation3Layout';
import { Footer } from './components/Footer';

import { LevelTestPage } from './pages/LevelTestPage';
import { TestResultPage } from './pages/TestResultPage';
import { TrainingProgramPage } from './pages/TrainingProgramPage';
import { LearnPadelPage } from './pages/LearnPadelPage';
import { VideoTutorialsPage } from './pages/VideoTutorialsPage';
import { ProgressTrackerPage } from './pages/ProgressTrackerPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { RacketsPage } from './pages/RacketsPage';

const AppContent: React.FC = () => {
  const { currentPage, isAuthenticated, isAuthLoading, testResult } = useApp();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center font-inter text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#b2e01e] border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xs text-[#f2f7ff]/70 font-jetbrains">جاري تحميل منصة PadelLevel Pro...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    // When a guest lands on home or has not yet completed the test, display the guest level assessment test
    if (!isAuthenticated && (currentPage === 'home' || !testResult)) {
      return <LevelTestPage />;
    }

    switch (currentPage) {
      case 'home':
      case 'dashboard':
        return <DashboardPage />;
      case 'level-test':
        return <LevelTestPage />;
      case 'test-result':
        return <TestResultPage />;
      case 'my-training-program':
        return <TrainingProgramPage />;
      case 'learn-padel':
      case 'technique-detail':
        return <LearnPadelPage />;
      case 'video-tutorials':
        return <VideoTutorialsPage />;
      case 'progress-tracker':
        return <ProgressTrackerPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'rackets':
        return <RacketsPage />;
      default:
        return isAuthenticated ? <DashboardPage /> : <LevelTestPage />;
    }
  };

  return (
    <>
      <Variation3Layout>
        {renderCurrentPage()}
        <Footer />
      </Variation3Layout>
      <AuthModal />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
