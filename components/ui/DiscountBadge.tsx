// components/ui/DiscountBadge.tsx
'use client';

interface DiscountBadgeProps {
  percent: number;
  isHit?: boolean;      // Самая большая скидка
  isVertical?: boolean; // Вертикальная карточка
  className?: string;
}

export function DiscountBadge({ percent, isHit = false, isVertical = false, className = '' }: DiscountBadgeProps) {
  return (
    <>
      {/* 🏷️ Бейдж со скидкой */}
      <div 
        className={`absolute flex items-center gap-2.5 px-2 py-1.25 rounded-full bg-white/10 backdrop-blur-sm badge-discount text-white
          ${isVertical 
            ? 'top-0 left-[50px] xl:left-[50px]' // Вертикальная: слева
            : 'top-0 right-[62px] sm:right-[62px] xs:right-[50px]' // Горизонтальная: справа
          }
          ${className}
        `}
        // Адаптивные размеры через Tailwind
      >
        <span className="text-[22px] leading-[130%] xl:block hidden">−{percent}%</span>
        <span className="text-[16px] leading-[130%] sm:block xl:hidden">−{percent}%</span>
        <span className="text-[13px] leading-[130%] xs:block sm:hidden">−{percent}%</span>
      </div>

      {/* ⭐ Бейдж "Хит!" (только для карточки с максимальной скидкой) */}
      {isHit && (
        <span 
          className={`absolute badge-hit text-white
            top-[10px] right-[20px] xl:block hidden
            top-[8px] right-[14px] sm:block xl:hidden
            text-[13px] leading-[130%]
          `}
        >
          хит!
        </span>
      )}
    </>
  );
}