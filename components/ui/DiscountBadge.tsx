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

            <div
                className={`badge absolute flex items-center gap-2.5 px-2 py-1.25 rounded-b-lg bg-(--color-badge-bg) text-white top-0 
          ${isVertical
                        ? 'left-12.5'
                        : isHit
                            ? 'right-12.5 xs:right-15.5 xl:right-auto xl:left-12.5'
                            : 'right-7 xs:right-7.5 xl:right-auto xl:left-12.5'
                    }
          ${className}
        `}
            >
                <span className="text-[13px] leading-[130%] block xs:hidden">−{percent}%</span>
                <span className="text-[16px] leading-[130%] hidden xs:block xl:hidden">−{percent}%</span>
                <span className="text-[22px] leading-[130%] hidden xl:block">−{percent}%</span>
            </div>

            {/* ⭐ Бейдж "Хит!" (только для карточки с максимальной скидкой) */}
            {isHit && (
                <span
                    className='badge absolute text-accent top-2 right-3.5 xs:top-1.5 xs:right-3.5 xl:right-5 xk:top-2.5 text-[13px] xs:text-[16px] xl:xs:text-[22px]'
                >
                    хит!
                </span>
            )}
        </>
    );
}