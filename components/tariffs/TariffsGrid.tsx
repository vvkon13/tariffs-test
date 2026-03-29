// components/tariffs/TariffsGrid.tsx (может быть серверным или клиентским - не важно)
'use client'; // Оставляем для Framer Motion анимаций

import { useMemo } from 'react';
import { TariffWithDiscount } from '@/types/tariff';
import { TariffCard } from './TariffCard';

interface TariffsGridProps {
  tariffs: TariffWithDiscount[];
  selectedTariffId: string | null;
  onSelectTariff: (uniqueId: string) => void;
}

export function TariffsGrid({ tariffs, selectedTariffId, onSelectTariff }: TariffsGridProps) {
  if (!tariffs.length) {
    return (
      <div className="text-center text-[#CDCDCD] py-12">
        Не удалось загрузить тарифы. Попробуйте позже.
      </div>
    );
  }

  // Сортировка: по скидке (убывание), is_best в приоритете
  const sortedTariffs = useMemo(() => {
    return [...tariffs].sort((a, b) => {
      if (a.is_best && !b.is_best) return -1;
      if (!a.is_best && b.is_best) return 1;
      return b.discountPercent - a.discountPercent;
    });
  }, [tariffs]);

  const [hitTariff, ...otherTariffs] = sortedTariffs;

  return (
    <>
      <div className="hidden xl:grid grid-cols-3 gap-6">
        {hitTariff && (
          <div className="col-span-3">
            <TariffCard 
              tariff={hitTariff} 
              isHorizontal={true} 
              isHit={true}
              isSelected={selectedTariffId === hitTariff.uniqueId}
              onSelect={() => onSelectTariff(hitTariff.uniqueId)}
            />
          </div>
        )}
        {otherTariffs.map((tariff) => (
          <TariffCard 
            key={tariff.uniqueId} 
            tariff={tariff} 
            isHorizontal={false} 
            isHit={false}
            isSelected={selectedTariffId === tariff.uniqueId}
            onSelect={() => onSelectTariff(tariff.uniqueId)}
          />
        ))}
      </div>

      {/* 📱 Mobile/Tablet: Flex column */}
      <div className="xl:hidden flex flex-col gap-4 px-4">
        {sortedTariffs.map((tariff, index) => (
          <TariffCard 
            key={tariff.uniqueId} 
            tariff={tariff} 
            isHorizontal={true} 
            isHit={index === 0}
            isSelected={selectedTariffId === tariff.uniqueId}
            onSelect={() => onSelectTariff(tariff.uniqueId)}
          />
        ))}
      </div>
    </>
  );
}