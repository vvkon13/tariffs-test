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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {tariffs.map((tariff,idx) => (
        <TariffCard key={`${tariff.id}#${idx}`} tariff={tariff} />
      ))}
    </div>
  );
}