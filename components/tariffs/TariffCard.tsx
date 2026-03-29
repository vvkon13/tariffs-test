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
            className={`relative rounded-[20px] cursor-pointer transition-all duration-300 overflow-hidden
        ${isSelected
                    ? 'border-2 border-accent bg-accent/10 shadow-lg shadow-accent/20'
                    : tariff.is_best || isHit
                        ? 'border-2 border-accent bg-[#313637]'
                        : 'border-2 border-[#484D4E] bg-[#313637] hover:border-accent/70 hover:bg-[#3a4041]'
                }
        ${isHorizontal
                    ? 'p-[20px_16px_20px_20px] xs:p-[20px_16px_20px_30px] xl:p-[34px_80px_30px_122px] xl:rounded-[34px]'
                    : 'p-[70px_18px_33px_18px] xl:rounded-[40px]'
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
            {isSelected && (
                <motion.div
                    className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <span className="text-[#191e1f] text-sm font-bold">✓</span>
                </motion.div>
            )}

            <AnimatePresence>
                {!isExpired && (
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <DiscountBadge
                            percent={tariff.discountPercent}
                            isHit={isHit}
                            isVertical={!isHorizontal}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {isHorizontal ? (
                <div className="flex flex-row items-center justify-start xl:justify-end gap-7.5 xs:gap-12.5 xl:gap-10">
                    <div className="flex flex-col items-center gap-3 xs:gap-4">

                        <h3 className="text-white font-medium leading-[120%] text-[16px] xs:text-[18px] sm:text-[26px] self-start xl:self-center">
                            {tariff.period}
                        </h3>

                        <div className="flex flex-col items-end">
                            <AnimatePresence mode="wait">
                                {showDiscount ? (
                                    <motion.div
                                        key="discount"
                                        className="min-w-27 sm:min-w-42"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className={`font-semibold leading-[100%] text-[30px] xs:text-[34px] sm:text-[50px] text-right whitespace-nowrap ${priceColor}`}>
                                            {formatPrice(tariff.price)} ₽
                                        </p>
                                        <p className="leading-[100%] text-[#919191] line-through text-[17px] xs:text-[19px] sm:text-[29px] text-right whitespace-nowrap">
                                            {formatPrice(tariff.full_price)} ₽
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        key="full"
                                        className={`min-w-27 sm:min-w-42 font-semibold leading-[100%] text-[30px] xs:text-[34px] sm:text-[50px] text-right whitespace-nowrap ${priceColor}`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {formatPrice(tariff.full_price)} ₽
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div>
                        <p className="text-white font-normal leading-[130%] text-left text-[14px] sm:text-[16px]">
                            {tariff.text}
                        </p>
                    </div>
                </div>

            ) : (
                <div className="flex flex-col items-center gap-10">
                    <h3 className="text-white font-medium text-[26px] leading-[120%] text-center">
                        {tariff.period}
                    </h3>
                    <div className="flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            {showDiscount ? (
                                <motion.div
                                    key="discount"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className={`font-semibold text-[50px] leading-[100%] ${priceColor}`}>
                                        {formatPrice(tariff.price)} ₽
                                    </p>
                                    <p className="text-[29px] leading-[100%] text-[#919191] line-through text-right">
                                        {formatPrice(tariff.full_price)} ₽
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="full"
                                    className={`font-semibold text-[50px] leading-[100%] ${priceColor}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {formatPrice(tariff.full_price)} ₽
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className="text-white font-normal text-[16px] leading-[130%] text-left w-full mt-auto">
                        {tariff.text}
                    </p>
                </div>
            )}

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