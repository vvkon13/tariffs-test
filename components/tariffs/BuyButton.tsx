// components/tariffs/BuyButton.tsx
'use client';

import { motion } from 'framer-motion';

interface BuyButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function BuyButton({ onClick, disabled }: BuyButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="w-full px-6 py-3 bg-accent text-bg-dark font-semibold rounded-xl 
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-accent/90 active:scale-[0.98] transition-colors"
      animate={{ 
        boxShadow: [
          '0 0 0 rgba(253, 176, 86, 0)', 
          '0 0 20px rgba(253, 176, 86, 0.6)', 
          '0 0 0 rgba(253, 176, 86, 0)'
        ]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {disabled ? 'Обработка...' : 'Купить'}
    </motion.button>
  );
}