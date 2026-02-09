
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isAdmin: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, isAdmin }) => {
  const navItems = isAdmin 
    ? [
        { screen: Screen.ADMIN_DASHBOARD, icon: 'dashboard', label: 'Dashboard' },
        { screen: Screen.HOME, icon: 'location_on', label: 'Monitor' },
        { screen: Screen.DOCUMENTS, icon: 'receipt_long', label: 'Buste' },
        { screen: Screen.PROFILE, icon: 'person', label: 'Profilo' },
      ]
    : [
        { screen: Screen.HOME, icon: 'home', label: 'Home' },
        { screen: Screen.REQUESTS, icon: 'calendar_month', label: 'Richieste' },
        { screen: Screen.DOCUMENTS, icon: 'folder_open', label: 'Documenti' },
        { screen: Screen.PROFILE, icon: 'person', label: 'Profilo' },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex items-center justify-around px-2 max-w-md mx-auto z-40 pb-safe">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 flex-1 transition-all duration-200 ${
              isActive ? 'text-[#4CAF50]' : 'text-gray-400'
            }`}
          >
            <span 
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
