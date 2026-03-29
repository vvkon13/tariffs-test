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
  
  const handleCheckboxClick = () => {
    onChange(!checked);
    if (showError) onChange(false);
  };

  return (
    <div className="flex items-start gap-3 select-none max-w-150">
      
      <motion.div
        onClick={handleCheckboxClick}
        className={`relative w-8 h-8 min-w-8 rounded-sm border-2 flex items-center justify-center cursor-pointer transition-colors duration-200
          ${checked 
            ? 'bg-[#424748] border-accent' 
            : 'bg-[#424748] border-[#606566] hover:border-accent/70'  
          }
          ${showError ? 'border-[#EF4444] ring-2 ring-[#EF4444]/30' : ''}
        `}
        animate={showError ? { 
          scale: [1, 1.05, 1], 
          borderColor: ['#EF4444', '#DC2626', '#EF4444'] 
        } : {}}

      >
        {checked && (
          <motion.svg
            width="19.091125"
            height="13.636353"
            viewBox="0 0 19.0911 13.6364"
            fill="none"
            initial={{ scale: 0, pathLength: 0 }}
            animate={{ scale: 1, pathLength: 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M17.9142 0.213694L6.8306 11.9484L1.18961 5.68024C0.935272 5.39995 0.505151 5.37796 0.225499 5.62961C-0.0541534 5.88127 -0.0767812 6.3128 0.174874 6.59245L6.31124 13.4107C6.43908 13.5525 6.62017 13.6337 6.81065 13.6364L6.81864 13.6364C7.00644 13.6364 7.18484 13.5591 7.31403 13.4226L18.9049 1.14987C19.1633 0.876231 19.1513 0.444767 18.8783 0.186401C18.6053 -0.0726051 18.1712 -0.0600135 17.9142 0.213694Z"
              fill="rgb(96,101,102)"
              fillRule="evenodd"
            />
            <path 
              d="M8.55288 10.1249L7.61305 11.12L7.48482 11.2557L6.8306 11.9484L6.1934 11.2404L6.06795 11.101L5.15272 10.084L2.32053 6.9369L1.18961 5.68024C0.935272 5.39995 0.505151 5.37796 0.225499 5.62961C-0.0541534 5.88127 -0.0767812 6.3128 0.174874 6.59245L1.30652 7.84984L6.31124 13.4107C6.43908 13.5525 6.62017 13.6337 6.81065 13.6364L6.81864 13.6364C7.00644 13.6364 7.18484 13.5591 7.31403 13.4226L17.7433 2.37985L18.9049 1.14987C19.1633 0.876231 19.1513 0.444767 18.8783 0.186401C18.6053 -0.0726051 18.1712 -0.0600135 17.9142 0.213694L16.7524 1.44366L8.55288 10.1249Z"
              fill="rgb(253,176.18,86)" 
              fillRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.div>
      
      <input
        type="checkbox"
        id="agreement-checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
          if (showError) onChange(false);
        }}
        aria-label="Согласие с офертой"
      />
      
      <span className="text-[#CDCDCD] leading-[110%] font-normal text-[12px] xl:text-[16px]">
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
    </div>
  );
}