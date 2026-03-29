'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TariffWithDiscount } from '@/types/tariff';
import { formatPrice } from '@/lib/utils';
import { Checkbox } from '@/components/ui/Checkbox';
import { BuyButton } from '@/components/tariffs/BuyButton';
import { useTimer } from '@/contexts/TimerContext';

interface TariffCardProps {
    tariff: TariffWithDiscount;
}

export function TariffCard({ tariff}: TariffCardProps) {
    const { isExpired } = useTimer();
    const [isChecked, setIsChecked] = useState(false);
    const [showCheckboxError, setShowCheckboxError] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    // Обработчик покупки
    const handleBuy = useCallback(() => {
        if (!isChecked) {
            setShowCheckboxError(true);
            setTimeout(() => setShowCheckboxError(false), 2000);
            return;
        }

        setShowCheckboxError(false);
        setIsPurchasing(true);

        console.log('Purchase initiated:', {
            tariffId: tariff.id,
            period: tariff.period,
            price: isExpired ? tariff.price : tariff.full_price
        });

        setTimeout(() => {
            setIsPurchasing(false);
            alert(`Тариф "${tariff.period}" успешно оформлен!`);
        }, 1000);
    }, [isChecked, tariff, isExpired]);

    return (
        <motion.article
            className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300
        ${tariff.is_best
                    ? 'border-accent bg-white/5 shadow-lg shadow-accent/10 scale-[1.02] z-10'
                    : 'border-white/10 bg-white/5 hover:border-accent/50 hover:bg-white/10'
                }
      `}
            // Анимация появления карточки при загрузке
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* 🏆 Бейдж "Лучший выбор" для is_best тарифа */}
            {tariff.is_best && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-accent text-bg-dark text-sm font-semibold rounded-full whitespace-nowrap">
                        Лучший выбор
                    </span>
                </div>
            )}

            {/* 📝 Текст тарифа */}
            <p className="text-text-gray text-sm mb-4 min-h-[40px]">
                {tariff.text}
            </p>

            {/* 📅 Период */}
            <h3 className="text-white font-semibold text-lg mb-2">
                {tariff.period}
            </h3>

            {/* 💰 Цена с анимацией перехода */}
            <div className="mb-6">
                <AnimatePresence mode="wait">
                    {isExpired ? (
                        // 💸 Скидочная цена
                        <motion.div
                            key="discount"
                            className="flex items-baseline gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="text-3xl font-bold text-white">
                                {formatPrice(tariff.price)} ₽
                            </span>
                            <span className="text-text-gray line-through text-sm">
                                {formatPrice(tariff.full_price)} ₽
                            </span>
                            <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-semibold rounded">
                                −{tariff.discountPercent}%
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="full"
                            className="text-3xl font-bold text-white"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {formatPrice(tariff.full_price)} ₽
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mb-6">
                <Checkbox
                    checked={isChecked}
                    onChange={setIsChecked}
                    showError={showCheckboxError}
                    label="Согласен с условиями оферты"
                />
            </div>

            <div className="mt-auto">
                <BuyButton
                    onClick={handleBuy}
                    disabled={isPurchasing}
                />
            </div>

            {tariff.is_best && (
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-accent/30 pointer-events-none"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
        </motion.article>
    );
}