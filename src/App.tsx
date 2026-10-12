import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header, Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LoginLandingGateway } from './components/LoginLandingGateway';

import { HomePage } from './pages/HomePage';
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

const AppContent: React.FC = () => {
  const { currentPage, isAuthenticated, isAuthLoading } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen theme-viewport-bg flex items-center justify-center font-alexandria text-white">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#b2e01e] border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xs text-white/70">جاري تحميل بيانات المنصة...</p>
        </div>
      </div>
    );
  }

  // Protected Entry Gate: Unauthenticated visitors must see the landing and login gateway first
  if (!isAuthenticated) {
    return <LoginLandingGateway />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        // Authenticated athletes land directly on the full command center dashboard
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
      case 'dashboard':
        return <DashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col theme-viewport-bg text-white font-sans">
      {/* Top Header Navigation - Official Brand Anchor across mobile and desktop */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Main Body Container: Sidebar Navigation + Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        <Navbar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />

        {/* Main Content Area with independent scroll */}
        <div className="flex-1 min-w-0 flex flex-col overflow-y-auto min-h-[calc(100vh-65px)] theme-viewport-bg">
          <main className="flex-1 p-4 sm:p-8 lg:p-12 max-w-7xl w-full mx-auto">
            {renderCurrentPage()}
          </main>
          <Footer />
        </div>
      </div>

      {/* Authentication Dialog */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
