// components/ui/InfoCard.tsx
'use client';

import { motion } from 'framer-motion';

interface InfoCardProps {
  text?: string;
  className?: string;
}

export function InfoCard({ 
  text = "Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц",
  className = ""
}: InfoCardProps) {
  return (
    <motion.div
      className={`max-w-[500px] w-full rounded-[16px] bg-[#2D3233] p-[14px_20px_14px_12px] flex items-start gap-[6px] xs:gap-3  ${className}`}
      // Анимация появления
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 🔶 Иконка восклицательного знака (акцентный цвет) */}
      <svg 
        viewBox="0 0 22.1538 24" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-[22px] h-[24px] min-w-[22px]"
        fill="none"
      >
        <rect width="22.153845" height="24" fill="transparent" />
        <g>
          {/* Вертикальная полоса */}
          <path 
            d="M10.0438 15.3633C10.0524 15.9301 10.5154 16.3845 11.0823 16.3845C11.6491 16.3845 12.1121 15.9258 12.1207 15.3633L12.4669 6.03447C12.4885 5.67966 12.3587 5.3335 12.1077 5.06523C11.8395 4.77966 11.4674 4.61523 11.0823 4.61523C10.6972 4.61523 10.325 4.77966 10.0568 5.06523C9.80581 5.3335 9.67601 5.67966 9.69764 6.03447L10.0438 15.3633Z" 
            fill="#FDB056" 
            fillRule="nonzero" 
          />
          {/* Точка внизу */}
          <path 
            d="M11.0799 21.2302C11.8446 21.2302 12.4645 20.6103 12.4645 19.8456C12.4645 19.0809 11.8446 18.4609 11.0799 18.4609C10.3152 18.4609 9.69531 19.0809 9.69531 19.8456C9.69531 20.6103 10.3152 21.2302 11.0799 21.2302Z" 
            fill="#FDB056" 
            fillRule="evenodd" 
          />
        </g>
      </svg>

      {/* 📝 Текст */}
      <p className="text-white font-normal font-montserrat leading-[130%] text-[12px] sm:text-[16px] text-left">
        {text}
      </p>
    </motion.div>
  );
}