// components/tariffs/TariffsGrid.tsx
import { TariffWithDiscount } from '@/types/tariff';
import { TariffCard } from './TariffCard';

interface TariffsGridProps {
  tariffs: TariffWithDiscount[];
}

export function TariffsGrid({ tariffs }: TariffsGridProps) {
  if (!tariffs.length) {
    return (
      <div className="text-center text-text-gray py-12">
        Не удалось загрузить тарифы. Попробуйте позже.
      </div>
    );
  }

  // 🔹 Сортируем по скидке (убывание) + is_best в приоритете
  const sortedTariffs = [...tariffs].sort((a, b) => {
    if (a.is_best && !b.is_best) return -1;
    if (!a.is_best && b.is_best) return 1;
    return b.discountPercent - a.discountPercent;
  });

  // Первая карточка — "хит" (максимальная скидка)
  const [hitTariff, ...otherTariffs] = sortedTariffs;

  return (
    <>
      {/* 🖥️ Desktop: Grid 3 колонки */}
      <div className="hidden xl:grid grid-cols-3 gap-6">
        {/* Хитовая карточка — горизонтальная, на всю ширину */}
        {hitTariff && (
          <div className="col-span-3">
            <TariffCard 
              tariff={hitTariff} 
              isHorizontal={true} 
              isHit={true} 
            />
          </div>
        )}
        
        {/* Остальные — вертикальные, по 1 в колонке */}
        {otherTariffs.map((tariff) => (
          <TariffCard 
            key={tariff.id} 
            tariff={tariff} 
            isHorizontal={false} 
            isHit={false}
          />
        ))}
      </div>

      {/* 📱 Mobile/Tablet: Flex column, все горизонтальные */}
      <div className="xl:hidden flex flex-col gap-4 px-4">
        {sortedTariffs.map((tariff, index) => (
          <TariffCard 
            key={tariff.id} 
            tariff={tariff} 
            isHorizontal={true} 
            isHit={index === 0} // Первая = хит
          />
        ))}
      </div>
    </>
  );
}