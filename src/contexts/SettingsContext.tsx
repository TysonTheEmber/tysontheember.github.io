import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';

interface SettingsContextType {
  sparksEnabled: boolean;
  toggleSparks: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({children}: {children: ReactNode}) {
  const [sparksEnabled, setSparksEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sparksEnabled');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sparksEnabled', JSON.stringify(sparksEnabled));
    }
  }, [sparksEnabled]);

  const toggleSparks = () => {
    setSparksEnabled(prev => !prev);
  };

  return (
    <SettingsContext.Provider value={{sparksEnabled, toggleSparks}}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
