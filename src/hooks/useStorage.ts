import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Session, Settings } from '@/types';

const SESSIONS_STORAGE_KEY = 'poker-tracker-sessions';
const SETTINGS_STORAGE_KEY = 'poker-tracker-settings';

const defaultSettings: Settings = {
  theme: 'dark',
  view: 'list',
  splitPeriods: true,
  showNotes: true,
  showHandsPlayed: true,
  goals: {
    hours: 0,
    hands: 0,
    sessions: 0,
  },
};

// Generic hook to manage a value in localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);


  return [storedValue, setStoredValue] as const;
}

export const useStorage = () => {
  const [sessions, setSessions] = useLocalStorage<Session[]>(SESSIONS_STORAGE_KEY, []);
  const [storedSettings, setStoredSettings] = useLocalStorage<Partial<Settings>>(SETTINGS_STORAGE_KEY, defaultSettings);

  // Ensure settings are always complete by merging stored data with defaults.
  // This prevents errors if localStorage contains an older, incomplete settings object.
  const settings: Settings = useMemo(() => ({
    ...defaultSettings,
    ...storedSettings,
    goals: {
      ...defaultSettings.goals,
      ...(storedSettings.goals || {}),
    },
  }), [storedSettings]);

  const addSession = useCallback((newSession: Omit<Session, 'id' | 'notes' | 'handsPlayed'>) => {
    const sessionWithDefaults: Session = {
      ...newSession,
      id: newSession.overallStartTime,
      notes: '',
      handsPlayed: 0,
    };
    setSessions((prevSessions) => [...prevSessions, sessionWithDefaults]);
    return sessionWithDefaults;
  }, [setSessions]);

  const updateSession = useCallback((sessionId: string, updatedData: Partial<Pick<Session, 'notes' | 'handsPlayed'>>) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === sessionId ? { ...session, ...updatedData } : session
      )
    );
  }, [setSessions]);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setStoredSettings((prevSettings) => {
      const updated = { ...prevSettings, ...newSettings };
      // Handle nested updates for the 'goals' object correctly
      if (newSettings.goals) {
        updated.goals = {
          ...(prevSettings.goals || defaultSettings.goals),
          ...newSettings.goals,
        };
      }
      return updated;
    });
  }, [setStoredSettings]);

  return {
    sessions,
    addSession,
    updateSession,
    settings,
    updateSettings,
  };
};
