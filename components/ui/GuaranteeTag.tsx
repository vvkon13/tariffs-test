// components/ui/GuaranteeTag.tsx
interface GuaranteeTagProps {
  text?: string;
  className?: string;
}

export function GuaranteeTag({ 
  text = "гарантия возврата 30 дней",
  className = ""
}: GuaranteeTagProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center  
        px-4.5 pt-2.5 pb-3 xl:px-8.5 xl:pt-4 xl:pb-4.5
        border border-[#81FE95] rounded-[30px] 
        bg-[#2D3233]
        text-[#81FE95] font-montserrat font-medium leading-[120%] 
        text-[16px] xs:text-[18px] xl:text-[28px]
        ${className}`}
    >
      {text}
    </div>
  );
}