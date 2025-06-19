import { Translation } from './types';

export function getTranslation(
  translations: Translation[],
  languageCode: string,
  fieldName: string
): string {
  return translations.find(
    t => t.languageCode === languageCode && t.fieldName === fieldName
  )?.translatedText || 'No translation available';
}

// Helper for currency formatting
export function formatPrice(amount: number) {
  return new Intl.NumberFormat('et-ET', {
    style: 'currency',
    currency: 'ETB'
  }).format(amount);
}