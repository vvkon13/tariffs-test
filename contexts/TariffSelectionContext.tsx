// contexts/TariffSelectionContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { TariffWithDiscount } from '@/types/tariff';

interface TariffSelectionContextType {
  selectedTariffId: string | null;
  setSelectedTariffId: (id: string) => void;
  
  agreementChecked: boolean;
  setAgreementChecked: (checked: boolean) => void;
  
  isPurchasing: boolean;
  handlePurchase: (tariffs: TariffWithDiscount[], isExpired: boolean) => Promise<void>;
  
  showAgreementError: boolean;
  showNoSelectionError: boolean;
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
    initialTariffs.find(t => t.is_best)?.id || initialTariffs[0]?.id || null
  );
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [showNoSelectionError, setShowNoSelectionError] = useState(false);

  // Автовыбор тарифа при изменении списка
  const handleSelectTariff = useCallback((id: string) => {
    setSelectedTariffId(id);
    setShowNoSelectionError(false);
  }, []);

  // Логика покупки
  const handlePurchase = useCallback(async (tariffs: TariffWithDiscount[], isExpired: boolean) => {
    // Валидация: выбран ли тариф
    if (!selectedTariffId) {
      setShowNoSelectionError(true);
      setTimeout(() => setShowNoSelectionError(false), 2000);
      return;
    }
    
    // Валидация: согласен ли пользователь
    if (!agreementChecked) {
      setShowAgreementError(true);
      setTimeout(() => setShowAgreementError(false), 2000);
      return;
    }

    setShowAgreementError(false);
    setIsPurchasing(true);

    try {
      const selected = tariffs.find(t => t.id === selectedTariffId);
      if (!selected) throw new Error('Tariff not found');

      // Определяем цену (со скидкой или полная)
      const price = isExpired ? selected.full_price : selected.price;

      console.log('🚀 Purchase:', {
        tariffId: selectedTariffId,
        tariff: selected,
        price,
        timestamp: new Date().toISOString(),
      });

      // 🔄 Здесь будет реальный запрос к бэкенду
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`✅ Тариф "${selected.period}" успешно оформлен!\nСумма: ${price} ₽`);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('❌ Произошла ошибка при оформлении. Попробуйте позже.');
    } finally {
      setIsPurchasing(false);
    }
  }, [selectedTariffId, agreementChecked]);

  return (
    <TariffSelectionContext.Provider value={{
      selectedTariffId,
      setSelectedTariffId: handleSelectTariff,
      agreementChecked,
      setAgreementChecked,
      isPurchasing,
      handlePurchase,
      showAgreementError,
      showNoSelectionError,
    }}>
      {children}
    </TariffSelectionContext.Provider>
  );
}

// Хук для удобного использования
export function useTariffSelection() {
  const context = useContext(TariffSelectionContext);
  if (context === undefined) {
    throw new Error('useTariffSelection must be used within TariffSelectionProvider');
  }
  return context;
}