// Core types matching your Spring Boot entities
export type Restaurant = {
  id: number;
  name: string;
  description?: string;
  logoUrl: string;
  subDomin: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  active: boolean;
  contacts?: Contact;
  meanu: FoodMenu;
};

export interface Contact {
  id?: number;
  facebookpageUrl?: string;
  tiktak?: string;
  instgram?: string;
  telegram?: string;
  whatsUp?: string;
  youtube?: string;
  webpageUrl?: string;
  phoneNumner?: string;
  emale?: string;
}

export type FoodMenu = {
  baseCategories: Category[];
  supportedLanguages : Language[];
};
export interface Language {
  id?: number;
  code: string;
  name: string;
}

export type Category = {
  id: number;
  translations: Translation[];
  foods: Food[];
  children?: Category[];
  discount?: Discount
  imageUrl:string
};

export type Food = {
  id: number;
  translations: Translation[];
  price: number;
  imageUrl: string;
  discount?: Discount;
};

export type Translation = {
  languageCode: string;
  fieldName: string;
  translatedText: string;
};

export type Discount = {
  type: 'CATEGORY_LEVEL' | 'PRODUCT_LEVEL';
  percentage: number;
  startDate?: string | null;
  endDate?: string | null;
  // ... other discount fields
};