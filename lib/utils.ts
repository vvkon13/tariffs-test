//lib/utils.ts
export const calculateDiscount = (price: number, fullPrice: number): number => {
  if (!fullPrice || !price) return 0;
  return Math.round(((fullPrice - price) / fullPrice) * 100);
};

export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('ru-RU').format(value);
};