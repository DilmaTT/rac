import { useState, useEffect, useRef } from 'react';
import { useStorage } from '@/hooks/useStorage';
import type { Session, SessionPeriod } from '@/types';
import { Button } from './ui/button';
import { Play, Square, Hand, BrainCircuit } from 'lucide-react';

type ActiveSession = Omit<Session, 'id' | 'overallEndTime' | 'notes' | 'handsPlayed'>;

interface SessionManagerProps {
  onSessionComplete: (session: Session) => void;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const SessionManager = ({ onSessionComplete }: SessionManagerProps) => {
  const { settings, addSession } = useStorage();
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentPeriodType, setCurrentPeriodType] = useState<'play' | 'select'>('play');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => stopTimer(); // Cleanup on unmount
  }, []);

  const handleStart = () => {
    const now = new Date().toISOString();
    setActiveSession({
      overallStartTime: now,
      periods: [{ type: 'play', startTime: now, endTime: '' }],
    });
    setCurrentPeriodType('play');
    setElapsedTime(0);
    startTimer();
  };

  const handleStop = () => {
    stopTimer();
    if (!activeSession) return;

    const now = new Date().toISOString();
    const finalizedPeriods = activeSession.periods.map((p, index) =>
      index === activeSession.periods.length - 1 ? { ...p, endTime: now } : p
    );

    const sessionData: Omit<Session, 'id' | 'notes' | 'handsPlayed'> = {
      ...activeSession,
      overallEndTime: now,
      periods: finalizedPeriods,
    };

    const newSession = addSession(sessionData);
    onSessionComplete(newSession);

    setActiveSession(null);
  };

  const handleTogglePeriod = (newType: 'play' | 'select') => {
    if (!activeSession || currentPeriodType === newType) return;

    const now = new Date().toISOString();
    const updatedPeriods = activeSession.periods.map((p, index) =>
      index === activeSession.periods.length - 1 ? { ...p, endTime: now } : p
    );

    const newPeriod: SessionPeriod = { type: newType, startTime: now, endTime: '' };

    setActiveSession({
      ...activeSession,
      periods: [...updatedPeriods, newPeriod],
    });
    setCurrentPeriodType(newType);
  };

  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Трекер сессий</h2>
      <div className="text-6xl font-mono text-center mb-6 tabular-nums">
        {formatTime(elapsedTime)}
      </div>
      <div className="flex flex-col gap-4">
        {!activeSession ? (
          <Button onClick={handleStart} size="lg" className="w-full">
            <Play className="mr-2 h-5 w-5" /> Начать сессию
          </Button>
        ) : (
          <>
            {settings.splitPeriods && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleTogglePeriod('select')}
                  variant={currentPeriodType === 'select' ? 'secondary' : 'outline'}
                >
                  <BrainCircuit className="mr-2 h-4 w-4" /> Селект
                </Button>
                <Button
                  onClick={() => handleTogglePeriod('play')}
                  variant={currentPeriodType === 'play' ? 'secondary' : 'outline'}
                >
                  <Hand className="mr-2 h-4 w-4" /> Игра
                </Button>
              </div>
            )}
            <Button onClick={handleStop} variant="destructive" size="lg" className="w-full">
              <Square className="mr-2 h-5 w-5" /> Остановить сессию
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionManager;
