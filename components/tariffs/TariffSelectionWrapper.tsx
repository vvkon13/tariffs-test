// components/tariffs/TariffSelectionWrapper.tsx
'use client';

import { TariffWithDiscount } from '@/types/tariff';
import { TariffsGrid } from './TariffsGrid';
import { AgreementCheckbox } from '@/components/ui/AgreementCheckbox';
import { MainBuyButton } from '@/components/tariffs/MainBuyButton';
import { useTariffSelection } from '@/contexts/TariffSelectionContext';
import { useTimer } from '@/contexts/TimerContext';

interface TariffSelectionWrapperProps {
  tariffs: TariffWithDiscount[];
}

export function TariffSelectionWrapper({ tariffs }: TariffSelectionWrapperProps) {
  const { 
    selectedTariffId, 
    setSelectedTariffId,
    agreementChecked, 
    setAgreementChecked,
    isPurchasing,
    handlePurchase,
    showAgreementError,
    showNoSelectionError
  } = useTariffSelection();
  
  const { isExpired } = useTimer();

  // Получаем выбранный тариф для отображения цены
  const selectedTariff = tariffs.find(t => t.id === selectedTariffId);
  const currentPrice = selectedTariff 
    ? (isExpired ? selectedTariff.full_price : selectedTariff.price)
    : 0;

  return (
    <>
      {/* Секция тарифов */}
      <section className="container mx-auto px-4 py-8">
        <TariffsGrid 
          tariffs={tariffs}
          selectedTariffId={selectedTariffId}
          onSelectTariff={setSelectedTariffId}
        />
      </section>

      {/* Футер с чекбоксом и кнопкой */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex flex-col items-center gap-6">
          {/* Чекбокс согласия */}
          <AgreementCheckbox 
            checked={agreementChecked}
            onChange={setAgreementChecked}
            showError={showAgreementError}
            offerUrl="/offer"
            privacyUrl="/privacy"
          />
          
          {/* Главная кнопка */}
          <MainBuyButton 
            onClick={() => handlePurchase(tariffs, isExpired)}
            disabled={!selectedTariffId || isPurchasing}
            isLoading={isPurchasing}
            price={currentPrice}
          />
          
          {/* Подсказки об ошибках */}
          {showNoSelectionError && (
            <span className="text-[#EF4444] text-sm animate-pulse">
              Выберите тариф для продолжения
            </span>
          )}
        </div>
      </section>
    </>
  );
}