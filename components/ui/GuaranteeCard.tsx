// components/ui/GuaranteeCard.tsx

import { GuaranteeTag } from './GuaranteeTag';

interface GuaranteeCardProps {
  tagText?: string;
  description?: string;
  className?: string;
}

export function GuaranteeCard({ 
  tagText = "гарантия возврата 30 дней",
  description = "Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.",
  className = ""
}: GuaranteeCardProps) {
  return (
    <div 
      className={`w-full 
        rounded-[20px] xl:rounded-[30px] 
        border border-[#484D4E] bg-transparent 
        p-3 xl:p-5
        flex flex-col justify-center items-start 
        gap-2.5 xl:gap-8.5
        ${className}`}
    >
      <GuaranteeTag text={tagText} />
      
      <p className="text-[#DCDCDC] font-montserrat font-normal leading-[130%] text-left 
        text-[13px] xs:text-[14px] xl:text-[24px]">
        {description}
      </p>
    </div>
  );
}