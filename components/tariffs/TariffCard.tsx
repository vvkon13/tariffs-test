// components/tariffs/TariffCard.tsx
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TariffWithDiscount } from '@/types/tariff';
import { formatPrice } from '@/lib/utils';
import { Checkbox } from '@/components/ui/Checkbox';
import { BuyButton } from '@/components/tariffs/BuyButton';
import { DiscountBadge } from '@/components/ui/DiscountBadge';
import { useTimer } from '@/contexts/TimerContext';

interface TariffCardProps {
  tariff: TariffWithDiscount;
  isHorizontal?: boolean;  // true = горизонтальная (для xl+), false = вертикальная
  isHit?: boolean;         // Карточка с максимальной скидкой
}

export function TariffCard({ tariff, isHorizontal = true, isHit = false }: TariffCardProps) {
  const { isExpired } = useTimer();
  const [isChecked, setIsChecked] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleBuy = useCallback(() => {
    if (!isChecked) {
      setShowCheckboxError(true);
      setTimeout(() => setShowCheckboxError(false), 2000);
      return;
    }
    setShowCheckboxError(false);
    setIsPurchasing(true);
    
    console.log('Purchase:', { 
      tariffId: tariff.id, 
      price: isExpired ? tariff.full_price : tariff.price 
    });
    
    setTimeout(() => {
      setIsPurchasing(false);
      alert(`✅ Тариф "${tariff.period}" оформлен!`);
    }, 1000);
  }, [isChecked, tariff, isExpired]);

  // Определяем, показывать ли скидочную цену
  const showDiscount = !isExpired;
  const currentPrice = showDiscount ? tariff.price : tariff.full_price;
  const priceColor = tariff.is_best ? 'text-accent' : 'text-white';

  return (
    <motion.article
      className={`relative rounded-[34px] transition-all duration-300 overflow-hidden
        ${tariff.is_best || isHit 
          ? 'border-2 border-accent bg-[#313637]' 
          : 'border-2 border-[#484D4E] bg-[#313637] hover:border-accent/70'
        }
        ${isHorizontal 
          ? 'p-[30px_80px_26px_19px] xl:p-[30px_80px_26px_19px] sm:p-[20px_16px_20px_30px] xs:p-[20px_16px_20px_20px]' 
          : 'p-[70px_21px_26px_21px]'
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
            {/* Период */}
            <h3 className="text-white font-medium text-[26px] leading-[120%] text-center">
              {tariff.period}
            </h3>
            
            {/* Цена */}
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

          {/* Правая часть: описание + форма */}
          <div className="flex flex-col gap-6 min-w-[280px]">
            <p className="text-white font-normal text-[16px] leading-[130%] text-left">
              {tariff.text}
            </p>
            
            <div className="flex flex-col gap-3">
              <Checkbox
                checked={isChecked}
                onChange={setIsChecked}
                showError={showCheckboxError}
                label="Согласен с условиями оферты"
              />
              <BuyButton onClick={handleBuy} disabled={isPurchasing} />
            </div>
          </div>
        </div>

      ) : (
        /* ───────── ВЕРТИКАЛЬНАЯ КАРТОЧКА (<xl) ───────── */
        <div className="flex flex-col items-center gap-10">
          
          {/* Период */}
          <h3 className="text-white font-medium text-[26px] leading-[120%] text-center">
            {tariff.period}
          </h3>
          
          {/* Цена */}
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
          
          {/* Описание */}
          <p className="text-white font-normal text-[16px] leading-[130%] text-left w-full mt-auto">
            {tariff.text}
          </p>
          
          {/* Форма */}
          <div className="flex flex-col gap-3 w-full">
            <Checkbox
              checked={isChecked}
              onChange={setIsChecked}
              showError={showCheckboxError}
              label="Согласен с условиями оферты"
            />
            <BuyButton onClick={handleBuy} disabled={isPurchasing} />
          </div>
        </div>
      )}

      {/* ✨ Свечение для акцентной карточки */}
      {(tariff.is_best || isHit) && (
        <motion.div
          className="absolute inset-0 rounded-[34px] border-2 border-accent/30 pointer-events-none"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.article>
  );
}