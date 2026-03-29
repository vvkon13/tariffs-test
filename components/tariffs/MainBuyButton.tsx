// components/ui/MainBuyButton.tsx
'use client';

import { motion } from 'framer-motion';

interface MainBuyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  price?: number;
}

export function MainBuyButton({ 
  onClick, 
  disabled = false, 
  isLoading = false,
  price 
}: MainBuyButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="py-4 xs:py-5 w-full sm:max-w-88 rounded-[20px] bg-[#FDB056] text-[#191E1F] 
        font-montserrat font-bold leading-[130%] text-[18px] xl:text-[20px] 
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-[#FDB056]/90 active:scale-[0.98] 
        transition-all duration-200
        flex items-center justify-center gap-2.5"
      animate={{ 
        boxShadow: disabled ? 'none' : [
          '0 0 0 rgba(253, 176, 86, 0)', 
          '0 0 25px rgba(253, 176, 86, 0.5)', 
          '0 0 0 rgba(253, 176, 86, 0)'
        ]
      }}
      transition={{ duration: 1.5, repeat: disabled ? 0 : Infinity, ease: "easeInOut" }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-[#191E1F] border-t-transparent rounded-full"
        />
      ) : (
        <>
          <span>Купить</span>
          {price && (
            <span className="font-semibold">
              {new Intl.NumberFormat('ru-RU').format(price)} ₽
            </span>
          )}
        </>
      )}
    </motion.button>
  );
}