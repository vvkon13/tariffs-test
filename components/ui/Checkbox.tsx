// components/ui/Checkbox.tsx
'use client';

import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  showError?: boolean;
  label: string;
}

export function Checkbox({ checked, onChange, showError, label }: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none group">
      {/* Кастомный чекбокс */}
      <motion.div
        className={`relative w-5 h-5 min-w-5 rounded border-2 flex items-center justify-center
          ${checked 
            ? 'bg-accent border-accent' 
            : 'border-text-gray group-hover:border-accent/70'
          }
          ${showError ? 'border-accent-error ring-2 ring-accent-error/30' : ''}
        `}
        animate={showError ? { 
          scale: [1, 1.1, 1], 
          borderColor: ['#EF4444', '#DC2626', '#EF4444'] 
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {checked && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-bg-dark text-sm font-bold"
          >
            ✓
          </motion.span>
        )}
      </motion.div>
      
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
          if (showError) onChange(false); 
        }}
        aria-label={label}
      />
      
      <span className="text-text-gray text-sm leading-tight group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}