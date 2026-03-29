// contexts/TariffSelectionContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo} from 'react';
import { TariffWithDiscount } from '@/types/tariff';
import { useTimer } from '@/contexts/TimerContext';

interface TariffSelectionContextType {
  tariffs: TariffWithDiscount[];
  selectedTariffId: string | null;
  setSelectedTariffId: (uniqueId: string) => void;
  agreementChecked: boolean;
  setAgreementChecked: (checked: boolean) => void;
  isPurchasing: boolean;
  handlePurchase: () => Promise<void>;
  showAgreementError: boolean;
  setShowAgreementError: (show: boolean) => void;
  selectedTariff: TariffWithDiscount | undefined;
  currentPrice: number;
}

const TariffSelectionContext = createContext<TariffSelectionContextType | undefined>(undefined);


export function TariffSelectionProvider({ 
  children,
  initialTariffs 
}: { 
  children: ReactNode;
  initialTariffs: TariffWithDiscount[];
}) {
  const [selectedTariffId, setSelectedTariffId] = useState<string | null>(
    initialTariffs.find(t => t.is_best)?.uniqueId || initialTariffs[0]?.uniqueId || null
  );
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);

  const { isExpired } = useTimer();

  const handleSelectTariff = useCallback((uniqueId: string) => {
    setSelectedTariffId(uniqueId);
  }, []);

  const selectedTariff = useMemo(() => 
    initialTariffs.find(t => t.uniqueId === selectedTariffId), 
    [initialTariffs, selectedTariffId]
  );

  const currentPrice = useMemo(() => 
    selectedTariff ? (isExpired ? selectedTariff.full_price : selectedTariff.price) : 0,
    [selectedTariff, isExpired]
  );

  const handlePurchase = useCallback(async () => {
    if (!selectedTariffId) return;

    if (!agreementChecked) {
      setShowAgreementError(true);
      return;
    }

    setShowAgreementError(false);
    setIsPurchasing(true);

    try {
      if (!selectedTariff) throw new Error('Tariff not found');

      console.log('🚀 Purchase:', {
        tariffId: selectedTariff.id,
        uniqueId: selectedTariff.uniqueId,
        price: currentPrice,
        timestamp: new Date().toISOString(),
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Тариф "${selectedTariff.period}" успешно оформлен!\nСумма: ${currentPrice} ₽`);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Произошла ошибка при оформлении. Попробуйте позже.');
    } finally {
      setIsPurchasing(false);
    }
  }, [selectedTariffId, agreementChecked, selectedTariff, currentPrice]);

  const contextValue = useMemo(() => ({
    tariffs: initialTariffs,
    selectedTariffId,
    setSelectedTariffId: handleSelectTariff,
    agreementChecked,
    setAgreementChecked,
    isPurchasing,
    handlePurchase,
    showAgreementError,
    setShowAgreementError,
    selectedTariff,
    currentPrice,
  }), [
    initialTariffs,
    selectedTariffId,
    handleSelectTariff,
    agreementChecked,
    isPurchasing,
    handlePurchase,
    showAgreementError,
    setShowAgreementError,
    selectedTariff,
    currentPrice,
  ]);

  return (
    <TariffSelectionContext.Provider value={contextValue}>
      {children}
    </TariffSelectionContext.Provider>
  );
}

export function useTariffSelection() {
  const context = useContext(TariffSelectionContext);
  if (context === undefined) {
    throw new Error('useTariffSelection must be used within TariffSelectionProvider');
  }
  return context;
}