'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from './StarIcon';
import { useTimer } from '@/contexts/TimerContext';

export function Timer() {
  const { timeLeft, isWarning, isExpired } = useTimer();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const timerColor = isWarning ? 'var(--color-accent-error)' : 'var(--color-accent-warning)';
  const starColor = timerColor;

  return (
    <motion.div 
      className="flex items-center justify-center gap-2"
      animate={isWarning ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5, repeat: isWarning ? Infinity : 0 }}
    >
      <StarIcon color={starColor} size={14} />
      
      <AnimatePresence mode="wait">
        {!isExpired ? (
          <motion.span
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-raleway font-bold uppercase tracking-tight"
            style={{ 
              color: timerColor,
              fontSize: 'clamp(32px, 8vw, 40px)',
              lineHeight: '110%',
            }}
          >
            {String(minutes).padStart(2, '0')}
            <span className="mx-0.5">:</span>
            {String(seconds).padStart(2, '0')}
          </motion.span>
        ) : (
          <motion.span
            key="expired"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-raleway font-bold text-text-gray"
            style={{ fontSize: 'clamp(32px, 8vw, 40px)', lineHeight: '110%' }}
          >
            00:00
          </motion.span>
        )}
      </AnimatePresence>
      
      <StarIcon color={starColor} size={14} />
    </motion.div>
  );
}