// components/ui/AgreementCheckbox.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface AgreementCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  showError?: boolean;
  offerUrl?: string;
  privacyUrl?: string;
}

export function AgreementCheckbox({ 
  checked, 
  onChange, 
  showError = false,
  offerUrl = '/',
  privacyUrl = '/'
}: AgreementCheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none group max-w-[600px]">
      {/* Кастомный чекбокс 32x32px */}
      <motion.div
        className={`relative w-8 h-8 min-w-8 rounded-lg border-2 flex items-center justify-center
          ${checked 
            ? 'bg-[#424748] border-accent' 
            : 'bg-[#424748] border-[#606566] group-hover:border-accent/70'
          }
          ${showError ? 'border-[#EF4444] ring-2 ring-[#EF4444]/30' : ''}
        `}
        animate={showError ? { 
          scale: [1, 1.05, 1], 
          borderColor: ['#EF4444', '#DC2626', '#EF4444'] 
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {checked && (
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            initial={{ scale: 0, pathLength: 0 }}
            animate={{ scale: 1, pathLength: 1 }}
            transition={{ duration: 0.2 }}
          >
            <path 
              d="M16.666 5L7.5 14.166L3.333 10" 
              stroke="#FDB056" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </motion.div>
      
      {/* Скрытый инпут */}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
          if (showError) onChange(false);
        }}
        aria-label="Согласие с офертой"
      />
      
      {/* Текст с ссылками */}
      <span className="text-[#CDCDCD] text-[16px] leading-[110%] font-normal">
        Я согласен с{' '}
        <Link 
          href={offerUrl}
          className="text-accent underline hover:text-accent/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          офертой рекуррентных платежей
        </Link>
        {' '}и{' '}
        <Link 
          href={privacyUrl}
          className="text-accent underline hover:text-accent/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Политикой конфиденциальности
        </Link>
      </span>
    </label>
  );
}