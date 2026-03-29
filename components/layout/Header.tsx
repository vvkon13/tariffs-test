import { Timer } from '@/components/ui/Timer';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark border-b border-white/10 bg-(--color-header-bg)">
      <div className="flex flex-col items-center justify-center gap-1 py-2 px-4">
        <h1 
          className="font-montserrat font-semibold text-center leading-[130%] text-[14px] xs:text-[18px] xl:text-[24px]"
        >
          Успейте открыть пробную неделю
        </h1>
        <Timer/>
      </div>
    </header>
  );
}