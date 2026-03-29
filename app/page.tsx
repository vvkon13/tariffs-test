import { Header } from '@/components/layout/Header';
import { fetchTariffs } from '@/lib/api';
import { TariffsGrid } from '@/components/tariffs/TariffsGrid';

export default async function HomePage() {
  const tariffs = await fetchTariffs();

  return (
    <main className="flex-1 pt-[var(--header-height)]">
      <Header />
      <section className="container max-w-304 mx-auto px-4 py-8">
        <TariffsGrid tariffs={tariffs} />
      </section>
    </main>
  );
}