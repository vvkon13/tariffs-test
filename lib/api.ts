// lib/api.ts
import { TariffWithDiscount } from '@/types/tariff';
import { calculateDiscount } from './utils';

const API_URL = 'https://t-core.fit-hub.pro/Test/GetTariffs';

export async function fetchTariffs(): Promise<TariffWithDiscount[]> {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawText = await response.text();
    
    const cleanJson = rawText.trim().replace(/^\uFEFF/, '');
    
    const parsed = JSON.parse(cleanJson);

    console.log(parsed)
    
    if (!Array.isArray(parsed)) {
      console.error('Expected array, got:', typeof parsed, parsed);
      return [];
    }
    
    return parsed.map((item: any) => ({
      id: String(item.id),
      period: String(item.period),
      price: Number(item.price),
      full_price: Number(item.full_price),
      is_best: Boolean(item.is_best),
      text: String(item.text),
      discountPercent: calculateDiscount(Number(item.price), Number(item.full_price)),
    }));
    
  } catch (error) {
    console.error('❌ Error in fetchTariffs:', error);
    return [];
  }
}