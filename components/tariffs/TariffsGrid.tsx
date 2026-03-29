// components/tariffs/TariffsGrid.tsx
'use client'; 

import { useMemo } from 'react';
import { TariffCard } from './TariffCard';
import { useTariffSelection } from '@/contexts/TariffSelectionContext';


export function TariffsGrid() {
  const { tariffs, selectedTariffId, setSelectedTariffId } = useTariffSelection();

  if (!tariffs.length) {
    return (
      <div className="text-center text-[#CDCDCD] py-12">
        Не удалось загрузить тарифы. Попробуйте позже.
      </div>
    );
  }

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
              onSelect={() => setSelectedTariffId(hitTariff.uniqueId)}
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
            onSelect={() => setSelectedTariffId(tariff.uniqueId)}
          />
        ))}
      </div>

      {/* 📱 Mobile/Tablet: Flex column */}
      <div className="xl:hidden flex flex-col gap-4">
        {sortedTariffs.map((tariff, index) => (
          <TariffCard
            key={tariff.uniqueId}
            tariff={tariff}
            isHorizontal={true}
            isHit={index === 0}
            isSelected={selectedTariffId === tariff.uniqueId}
            onSelect={() => setSelectedTariffId(tariff.uniqueId)}
          />
        ))}
      </div>
    </>
  );
}