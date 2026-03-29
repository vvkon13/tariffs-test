// app/page.tsx (Server Component - NO 'use client')
import { Header } from '@/components/layout/Header';
import { fetchTariffs } from '@/lib/api';
import { TariffsGrid } from '@/components/tariffs/TariffsGrid';
import { TariffSelectionWrapper } from '@/components/tariffs/TariffSelectionWrapper';
import { TariffSelectionProvider } from '@/contexts/TariffSelectionContext';

export default async function HomePage() {
  const tariffs = await fetchTariffs();

  return (
    <main className="flex-1 pt-[103px] pb-12">
      <Header />
      
      {/* Провайдер контекста оборачивает только клиентскую часть */}
      <TariffSelectionProvider initialTariffs={tariffs}>
        <TariffSelectionWrapper tariffs={tariffs} />
      </TariffSelectionProvider>
    </main>
  );
}