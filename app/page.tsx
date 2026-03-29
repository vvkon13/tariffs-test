//app/page.tsx
import { Header } from '@/components/layout/Header';
import { fetchTariffs } from '@/lib/api';
import { TariffsGrid } from '@/components/tariffs/TariffsGrid';
import { AgreementCheckbox } from '@/components/ui/AgreementCheckbox';
import { MainBuyButton } from '@/components/ui/MainBuyButton';
import { InfoCard } from '@/components/ui/InfoCard'; 
import { TariffSelectionProvider } from '@/contexts/TariffSelectionContext';
import Image from 'next/image';
import { GuaranteeCard } from '@/components/ui/GuaranteeCard';

export default async function HomePage() {
  const tariffs = await fetchTariffs();

  return (
    <main className="flex-1 pt-25.75 pb-12">
      <Header />

      <TariffSelectionProvider initialTariffs={tariffs}>

        <section className="container max-w-304 mx-auto pt-5 xl:pt-12.5 px-4 xl:px-0">
          <h1 className='font-bold leading-[110%] text-left text-[24px] xl:text-[40px]'>
            Выбери подходящий для себя <span className='text-accent'>тариф</span>
            </h1>
          <div className='flex flex-col xl:flex-row xl:items-stretch gap-0 xl:gap-22 pt-6 xs:pt-5 xl:pt-27.5'>
            <div className='flex justify-center xl:flex-col xl:w-95.25 xl:min-w-95.25'>
              <div className='relative w-auto max-w-95.25 xl:w-full xl:h-191.75'>
                <Image
                  alt="Мужчина"
                  src="/man.png"
                  width={381}
                  height={767}
                  className='w-auto h-50 xs:h-62.5 xl:h-191.75 object-contain'
                  priority
                />
              </div>
            </div>
            <div>
              <TariffsGrid />
              <InfoCard className='mt-2.5 xs:mt-3 xl:mt-5 mx-auto xl:mx-px' />

              <div className="flex flex-col items-center xl:items-start gap-4 xs:gap-5 xl:gap-4 mt-4 xs:mt-6 xl:mt-7.5">
                <AgreementCheckbox offerUrl="/" privacyUrl="/" />
                <MainBuyButton />
              </div>
              <p className='text-text-muted font-normal leading-[120%] text-[10px] xl:text-[14px] mt-2.5 xs:mt-5 xl:mt-3.5'>
                Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
              </p>
            </div>
          </div>
          <GuaranteeCard className='mt-5.5 xs:mt-6 xl:mt-16.5' />
        </section>
      </TariffSelectionProvider>
    </main>
  );
}