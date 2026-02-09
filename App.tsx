
import React, { useState, useEffect } from 'react';
import { Screen, User } from './types';
import Onboarding from './views/Onboarding';
import Home from './views/Home';
import Requests from './views/Requests';
import Documents from './views/Documents';
import ClockConfirmation from './views/ClockConfirmation';
import AdminDashboard from './views/AdminDashboard';
import AdminSiteDetail from './views/AdminSiteDetail';
import Profile from './views/Profile';
import Assistant from './views/Assistant';
import Settings from './views/Settings';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.ONBOARDING);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const user: User = {
    name: "Marco Rossi",
    role: isAdminMode ? 'Admin' : 'Artisan',
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    email: "m.rossi@coibentart.it",
    matricola: "ID-99281"
  };

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleNavigate = (screen: Screen) => setCurrentScreen(screen);

  const toggleClock = () => {
    if (!isClockedIn) {
      setIsClockedIn(true);
      setCurrentScreen(Screen.CLOCK_CONFIRM);
    } else {
      setIsClockedIn(false);
      setCurrentScreen(Screen.HOME);
    }
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.ONBOARDING:
        return <Onboarding onFinish={() => setCurrentScreen(Screen.HOME)} />;
      case Screen.HOME:
        return <Home 
          user={user} 
          isClockedIn={isClockedIn} 
          onClock={toggleClock} 
          onNavigate={handleNavigate}
          showInstallButton={!!deferredPrompt}
          onInstall={handleInstall}
        />;
      case Screen.REQUESTS: return <Requests onNavigate={handleNavigate} />;
      case Screen.DOCUMENTS: return <Documents onNavigate={handleNavigate} />;
      case Screen.PROFILE: 
        return <Profile 
          user={user} 
          isAdmin={isAdminMode} 
          onToggleAdmin={() => setIsAdminMode(!isAdminMode)} 
          onNavigate={handleNavigate}
          showInstallButton={!!deferredPrompt}
          onInstall={handleInstall}
        />;
      case Screen.SETTINGS:
        return <Settings 
          onBack={() => setCurrentScreen(Screen.PROFILE)} 
          onNavigate={handleNavigate} 
        />;
      case Screen.ASSISTANT: return <Assistant onNavigate={handleNavigate} />;
      case Screen.CLOCK_CONFIRM: return <ClockConfirmation onBack={() => setCurrentScreen(Screen.HOME)} />;
      case Screen.ADMIN_DASHBOARD: return <AdminDashboard onNavigate={handleNavigate} />;
      case Screen.ADMIN_SITE_DETAIL: return <AdminSiteDetail onBack={() => setCurrentScreen(Screen.ADMIN_DASHBOARD)} />;
      default: return <Home user={user} isClockedIn={isClockedIn} onClock={toggleClock} onNavigate={handleNavigate} showInstallButton={!!deferredPrompt} onInstall={handleInstall} />;
    }
  };

  const showNav = ![Screen.ONBOARDING, Screen.CLOCK_CONFIRM, Screen.ASSISTANT].includes(currentScreen);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50 shadow-2xl relative overflow-hidden select-none">
      {showNav && (
        <Header 
          user={user} 
          isAdmin={isAdminMode} 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
        />
      )}
      
      <main className={`flex-1 flex flex-col ${showNav ? 'pb-24' : ''}`}>
        {renderScreen()}
      </main>

      {showNav && (
        <>
          <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} isAdmin={isAdminMode} />
          <button 
            onClick={() => handleNavigate(Screen.ASSISTANT)}
            className="fixed bottom-24 right-6 size-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-90 transition-transform border-4 border-white"
          >
            <span className="material-symbols-outlined !text-3xl">smart_toy</span>
          </button>
        </>
      )}
    </div>
  );
};

export default App;
