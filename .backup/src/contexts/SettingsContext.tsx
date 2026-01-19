import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';

export type AnimationPreference = 'full' | 'reduced' | 'none';

interface SettingsContextType {
  sparksEnabled: boolean;
  toggleSparks: () => void;
  animationPreference: AnimationPreference;
  setAnimationPreference: (preference: AnimationPreference) => void;
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

  const [animationPreference, setAnimationPreferenceState] = useState<AnimationPreference>(() => {
    if (typeof window !== 'undefined') {
      // Check if user prefers reduced motion from system settings
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const saved = localStorage.getItem('animationPreference');
      if (saved !== null) {
        return saved as AnimationPreference;
      }

      // Auto-enable reduced motion if system prefers it
      return prefersReducedMotion ? 'reduced' : 'full';
    }
    return 'full';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sparksEnabled', JSON.stringify(sparksEnabled));
    }
  }, [sparksEnabled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('animationPreference', animationPreference);

      // Apply animation preference to document
      document.documentElement.setAttribute('data-animation-preference', animationPreference);
    }
  }, [animationPreference]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-change if user hasn't manually set a preference
      const saved = localStorage.getItem('animationPreference');
      if (saved === null) {
        setAnimationPreferenceState(e.matches ? 'reduced' : 'full');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleSparks = () => {
    setSparksEnabled(prev => !prev);
  };

  const setAnimationPreference = (preference: AnimationPreference) => {
    setAnimationPreferenceState(preference);
  };

  return (
    <SettingsContext.Provider value={{sparksEnabled, toggleSparks, animationPreference, setAnimationPreference}}>
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
