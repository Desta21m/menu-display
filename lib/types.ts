// Core types matching your Spring Boot entities
export type Restaurant = {
  id: number;
  name: string;
  description?: string;
  logoUrl: string;
  subDomain: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  active: boolean;
  contacts?: Contact;
  menu: FoodMenu;
};

export interface Contact {
  id?: number;
  phoneNumber?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  telegram?: string;
  whatsUp?: string;
  website?: string;
  linkedin?: string;
  x?: string;
  snapchat?: string;
  discord?: string;
}


export type FoodMenu = {
  baseCategories: Category[];
  supportedLanguages: Language[];
  supportedCurrencies: Currency[];
};

export interface Language {
  id?: number;
  code: string;
  name: string;
}

export interface Currency {
  id?: number;
  code: string;
  name: string;
  symbol: string;
}

export type Category = {
  id: number;
  translations: Translation[];
  foods: Food[];
  children?: Category[];
  discount?: Discount;
  icon: string;
};

export type Food = {
  id: number;
  translations: Translation[];
  exchanges?: Exchange[];
  finished: boolean;
  imageUrl: string;
  discount?: Discount;
};

export type Translation = {
  languageCode: string;
  fieldName: string;
  translatedText: string;
};

export interface Exchange {
  symbol: string;
  price: number;
}

export type Discount = {
  type: 'CATEGORY_LEVEL' | 'PRODUCT_LEVEL';
  percentage: number;
  startDate?: string | null;
  endDate?: string | null;
  // ... other discount fields
};