// components/tariffs/TariffCard.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TariffWithDiscount } from '@/types/tariff';
import { formatPrice } from '@/lib/utils';
import { DiscountBadge } from '@/components/ui/DiscountBadge';
import { useTimer } from '@/contexts/TimerContext';

interface TariffCardProps {
  tariff: TariffWithDiscount;
  isHorizontal?: boolean;
  isHit?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function TariffCard({ 
  tariff, 
  isHorizontal = true, 
  isHit = false,
  isSelected = false,
  onSelect 
}: TariffCardProps) {
  const { isExpired } = useTimer();
  const showDiscount = !isExpired;
  const priceColor = tariff.is_best ? 'text-accent' : 'text-white';

  return (
    <motion.article
      onClick={onSelect}
      className={`relative rounded-[34px] cursor-pointer transition-all duration-300 overflow-hidden
        ${isSelected 
          ? 'border-2 border-accent bg-accent/10 shadow-lg shadow-accent/20' 
          : tariff.is_best || isHit 
            ? 'border-2 border-accent bg-[#313637]' 
            : 'border-2 border-[#484D4E] bg-[#313637] hover:border-accent/70 hover:bg-[#3a4041]'
        }
        ${isHorizontal 
          ? 'p-[30px_80px_26px_19px] xl:p-[30px_80px_26px_19px] sm:p-[20px_16px_20px_30px] xs:p-[20px_16px_20px_20px]' 
          : 'p-[70px_21px_26px_21px]'
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isSelected ? 1.02 : 1
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: isSelected ? 1.02 : 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* ✅ Индикатор выбора */}
      {isSelected && (
        <motion.div 
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-[#191e1f] text-sm font-bold">✓</span>
        </motion.div>
      )}

      {/* 🏷️ Бейджи */}
      <DiscountBadge 
        percent={tariff.discountPercent} 
        isHit={isHit} 
        isVertical={!isHorizontal} 
      />

      {isHorizontal ? (
        /* ───────── ГОРИЗОНТАЛЬНАЯ КАРТОЧКА (xl+) ───────── */
        <div className="flex flex-row items-center justify-end gap-10">
          {/* Левая часть: цена и период */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white font-medium text-[26px] leading-[120%] text-center">
              {tariff.period}
            </h3>
            <div className="flex flex-col items-end">
              <AnimatePresence mode="wait">
                {showDiscount ? (
                  <motion.div
                    key="discount"
                    className="flex items-baseline gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={`font-semibold text-[50px] leading-[100%] ${priceColor}`}>
                      {formatPrice(tariff.price)} ₽
                    </span>
                    <span className="text-[29px] leading-[100%] text-[#919191] line-through">
                      {formatPrice(tariff.full_price)} ₽
                    </span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="full"
                    className={`font-semibold text-[50px] leading-[100%] ${priceColor}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatPrice(tariff.full_price)} ₽
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Правая часть: только описание */}
          <div className="min-w-[280px]">
            <p className="text-white font-normal text-[16px] leading-[130%] text-left">
              {tariff.text}
            </p>
          </div>
        </div>

      ) : (
        /* ───────── ВЕРТИКАЛЬНАЯ КАРТОЧКА (<xl) ───────── */
        <div className="flex flex-col items-center gap-10">
          <h3 className="text-white font-medium text-[26px] leading-[120%] text-center">
            {tariff.period}
          </h3>
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {showDiscount ? (
                <motion.div
                  key="discount"
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`font-semibold text-[50px] leading-[100%] ${priceColor}`}>
                    {formatPrice(tariff.price)} ₽
                  </span>
                  <span className="text-[29px] leading-[100%] text-[#919191] line-through">
                    {formatPrice(tariff.full_price)} ₽
                  </span>
                </motion.div>
              ) : (
                <motion.span
                  key="full"
                  className={`font-semibold text-[50px] leading-[100%] ${priceColor}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {formatPrice(tariff.full_price)} ₽
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-white font-normal text-[16px] leading-[130%] text-left w-full mt-auto">
            {tariff.text}
          </p>
        </div>
      )}

      {/* ✨ Свечение для акцентной карточки */}
      {(tariff.is_best || isHit) && !isSelected && (
        <motion.div
          className="absolute inset-0 rounded-[34px] border-2 border-accent/30 pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.article>
  );
}