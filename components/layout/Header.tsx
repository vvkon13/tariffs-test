'use client';

import { Timer } from '@/components/ui/Timer';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark border-b border-white/10">
      <div className="flex flex-col items-center justify-center gap-1 py-2 px-4">
        {/* Заголовок */}
        <h1 
          className="text-text-primary font-montserrat font-semibold text-center"
          style={{ 
            fontSize: 'clamp(14px, 4vw, 24px)', 
            lineHeight: '130%',
          }}
        >
          Успейте открыть пробную неделю
        </h1>
        
        {/* Таймер */}
        <Timer/>
      </div>
    </header>
  );
}