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

    if (!Array.isArray(parsed)) {
      console.error('Expected array, got:', typeof parsed, parsed);
      return [];
    }
    const idCount = new Map<string, number>();
    
    const  Tariff= parsed.map((item: any) => {
      const originalId = String(item.id);
      const count = idCount.get(originalId) || 0;
      
      // Первый экземпляр: uniqueId = id, дубликаты: id-1, id-2...
      const uniqueId = count === 0 ? originalId : `${originalId}-${count}`;
      idCount.set(originalId, count + 1);
      
      return {
        id: originalId,           
        uniqueId,                
        period: String(item.period),
        price: Number(item.price),
        full_price: Number(item.full_price),
        is_best: Boolean(item.is_best),
        text: String(item.text),
        discountPercent: calculateDiscount(item.price, item.full_price),
      };
    });

    return Tariff
    
  } catch (error) {
    console.error('Error in fetchTariffs:', error);
    return [];
  }
}