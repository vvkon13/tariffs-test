'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TimerContextType {
  timeLeft: number;
  isWarning: boolean;
  isExpired: boolean;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ 
  children, 
  duration = 120, 
  warningThreshold = 30 
}: { 
  children: ReactNode;
  duration?: number;
  warningThreshold?: number;
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const isWarning = timeLeft <= warningThreshold && timeLeft > 0;
  const isExpired = timeLeft <= 0;

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resetTimer = () => setTimeLeft(duration);

  return (
    <TimerContext.Provider value={{ timeLeft, isWarning, isExpired, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
}

// Хук для удобного использования контекста
export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}