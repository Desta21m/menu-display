/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import LanguageSwitcher from '@/components/MenuDisplay/LanguageSwitcher';
import CurrencyExchange from '@/components/MenuDisplay/CurrencyExchange';
import MenuCategories from '@/components/MenuDisplay/MenuCategories';
import { Restaurant, Translation, Exchange } from '@/lib/types';
import Footer from '@/components/UI/Footer';

const mockRestaurant: Restaurant = {  
  id: 1,
  name: "Delicious Bites",
  description: "The finest dining experience in town",
  logoUrl: "https://png.pngtree.com/template/20200704/ourmid/pngtree-restaurant-logo-design-vector-template-image_388753.jpg",
  subDomain: "delicious",
  primaryColor: "#4F46E5",
  secondaryColor: "#1E293B",
  accentColor: "#F59E0B",
  active: true,
  contacts: {
    phoneNumber: "+1234567890",
    email: "info@deliciousbites.com",
    location: {
      label: "Addis Ababa, Ethiopia",
      link: "https://maps.app.goo.gl/jnpY3mccFqkHVfZT6"
    },
    website: "https://deliciousbites.com",
    facebook: "https://facebook.com/deliciousbites",
    instagram: "https://instagram.com/deliciousbites",
    youtube: "https://youtube.com/deliciousbites",
    tiktok: "https://tiktok.com/@deliciousbites",
    telegram: "https://t.me/deliciousbites",
    whatsUp: "https://wa.me/1234567890",
    linkedin: "https://linkedin.com/company/deliciousbites",
    x: "https://x.com/deliciousbites",
    snapchat: "https://snapchat.com/add/deliciousbites",
    discord: "https://discord.gg/deliciousbites",
  },
  menu: {
    supportedLanguages: [
      { code: "en", name: "English" },
      { code: "ar", name: "العربية" },
      { code: "fr", name: "Français" }
    ],
    supportedCurrencies: [
      { code: "ETB", name: "ET Birr", symbol: "ETB" },
      { code: "USD", name: "US Dollar", symbol: "$" },
      { code: "EUR", name: "Euro", symbol: "€" },
      { code: "GBP", name: "British Pound", symbol: "£" }
    ],
    baseCategories: [
      {
        id: 1001, // Categories in 1000s
        imageUrl: "https://via.placeholder.com/400x200?text=Appetizers",
        translations: [
          { languageCode: "en", fieldName: "name", translatedText: "Appetizers" },
          { languageCode: "ar", fieldName: "name", translatedText: "المقبلات" },
          { languageCode: "fr", fieldName: "name", translatedText: "Entrées" }
        ],
        foods: [],
        children: [
          {
            id: 2001, // Subcategories in 2000s
            imageUrl: "https://via.placeholder.com/400x200?text=Special+Appetizers",
            translations: [
              { languageCode: "en", fieldName: "name", translatedText: "Special Appetizers" }
            ],
            foods: [
              {
                id: 3001, // Foods in 3000s
                imageUrl: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
                price: 7.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Bruschetta New" },
                  { languageCode: "ar", fieldName: "name", translatedText: "المقبلات" },
                  { languageCode: "en", fieldName: "description", translatedText: "Toasted bread topped with tomatoes, garlic, and fresh basil" },
                  { languageCode: "ar", fieldName: "description", translatedText: "المقبلاتالمقبلاتالمقبلاتا لمقبلاتلمقبلاتا لمقبلاتالمقبلاتالمقبلاتلمقبلاتالمقبل اتالمقبلاتالمقبلاتلمقبلاتالمق بلاتالمقبلاتالمقبلاتلمقبلات المقبلاتالمقبلاتالمقبلاتلمقبلاتالمق بلاتالمقبلاتالمقبلاتلمقبلاتالمقبلاتا لمقبلاتالمقبلاتلمقبلاتالمقبلاتالمقبلاتالمقبلاتلمقبلاتالم قبلاتالمقبلاتالمقبلاتلمقبلاتالمقبل اتالمقبلاتالمقبلاتلمقبلاتالمقبل اتالمقبلاتالمقبلاتلمقبلاتالمق بلاتالمقبلاتالمقبلاتلمقبلاتال مقبلاتالمقبلاتالمقبلاتلمقبلاتا لمقبلاتالمقبلاتالمقبلاتلمقبلاتا لمقبلاتالمقبلاتالمقبلاتلمقبلاتا لمقبلاتالمقبلاتالمقبلاتلمقبلاتالمقبلاتالمقبلاتالمقبلات" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 10,
                  startDate: "2025-01-01",
                  endDate: "2025-07-07"
                }
              },
              {
                id: 3002,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EbtAMkvjstpwiT8oSwwiPDJXVpC_KAaHdw&s",
                price: 7.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Bruschetta" },
                  { languageCode: "en", fieldName: "description", translatedText: "Toasted bread topped with tomatoes, garlic, and fresh basil" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 10,
                  startDate: "2025-08-01",
                  endDate: "2025-12-31"
                }
              },
              {
                id: 3004,
                imageUrl: "",
                price: 7.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Bruschetta" },
                  { languageCode: "en", fieldName: "description", translatedText: "Toasted bread topped with tomatoes, garlic, and fresh basil" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 10,
                  startDate: "2025-08-01",
                  endDate: "2025-12-31"
                }
              }
            ]
          },
          {
            id: 2002,
            imageUrl: "https://via.placeholder.com/400x200?text=Special+Appetizers",
            translations: [
              { languageCode: "en", fieldName: "name", translatedText: "Seasonal Appetizers" }
            ],
            foods: [
              {
                id: 3003,
                imageUrl: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
                price: 7,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Seasonal Bruschetta" },
                  { languageCode: "en", fieldName: "description", translatedText: "Toasted bread with seasonal toppings" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 10,
                  startDate: "2023-01-01",
                  endDate: "2023-12-31"
                }
              }
            ]
          }
        ]
      },
      {
        id: 1002,
        imageUrl: "https://via.placeholder.com/400x200?text=Fast+Food",
        translations: [
          { languageCode: "en", fieldName: "name", translatedText: "Fast Food" },
          { languageCode: "ar", fieldName: "name", translatedText: "الوجبات السريعة" },
          { languageCode: "fr", fieldName: "name", translatedText: "Fast Food" }
        ],
        foods: [],
        children: [
          {
            id: 2003,
            imageUrl: "https://via.placeholder.com/400x200?text=Burgers",
            translations: [
              { languageCode: "en", fieldName: "name", translatedText: "Burgers" }
            ],
            foods: [
              {
                id: 3010,
                imageUrl: "https://thumbs.dreamstime.com/b/bargar-food-looks-like-you-re-asking-could-clarify-what-mean-referring-to-bargarh-district-india-burger-366711135.jpg?w=992",
                price: 9.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Classic Burger" },
                  { languageCode: "en", fieldName: "description", translatedText: "Juicy beef patty with fresh veggies" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 10,
                  startDate: "2023-01-01",
                  endDate: "2023-12-31"
                }
              }
            ]
          },
          {
            id: 2004,
            imageUrl: "https://via.placeholder.com/400x200?text=Pizzas",
            translations: [
              { languageCode: "en", fieldName: "name", translatedText: "Pizzas" }
            ],
            foods: [
              {
                id: 3005,
                imageUrl: "https://c.ndtvimg.com/2021-01/78btgdc_pizza_625x300_15_January_21.jpg",
                price: 12.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Margherita Pizza" },
                  { languageCode: "en", fieldName: "description", translatedText: "Classic tomato and mozzarella" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 15,
                  startDate: "2025-06-01",
                  endDate: "2025-12-31"
                }
              },
              {
                id: 3006,
                imageUrl: "https://c.ndtvimg.com/2021-01/78btgdc_pizza_625x300_15_January_21.jpg",
                price: 12.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Margherita Pizza" },
                  { languageCode: "en", fieldName: "description", translatedText: "Classic tomato and mozzarella" }
                ],
                discount: {
                  type: "PRODUCT_LEVEL",
                  percentage: 15,
                  startDate: "2025-06-01",
                  endDate: "2025-12-31"
                }
              },
              {
                id: 3007,
                imageUrl: "https://c.ndtvimg.com/2021-01/78btgdc_pizza_625x300_15_January_21.jpg",
                price: 12.99,
                exchanges: [ 
                  { symbol: "ETB", price: 400 },
                  { symbol: "USD", price: 8.00 },
                  { symbol: "EUR", price: 7.00 }
                ],
                translations: [
                  { languageCode: "en", fieldName: "name", translatedText: "Margherita Pizza" },
                  { languageCode: "en", fieldName: "description", translatedText: "Classic tomato and mozzarella" }
                ],
              }
            ],
            discount: {
              type: "CATEGORY_LEVEL",
              percentage: 20,
              startDate: "2025-06-26",
              endDate: "2025-07-20"
            }
          }
        ],
        discount: {
          type: "CATEGORY_LEVEL",
          percentage: 10,
          startDate: "2025-06-26",
          endDate: "2025-07-20"
        }
      }
    ]
  }
};

function NotFound({ subdomain }: { subdomain: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Restaurant Not Found</h1>
      <p className="text-xl text-gray-700 mb-8">
        The restaurant with subdomain <strong>{subdomain}</strong> does not exist or is not active.
      </p>
      <a 
        href="https://menumaya.local" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to MenuMaya
      </a>
    </div>
  );
}

export default function RestaurantPage({ params }: { params: { subdomain: string } }) {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem('selectedCurrency') || 'ETB');

  const [selectedCategory, setSelectedCategory] = useState<number | null>(localStorage.getItem('selectedCategory') ? parseInt(localStorage.getItem('selectedCategory')!) : null);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(localStorage.getItem('viewMode') as 'grid' | 'list' || 'list');

  const getTranslation = (translations: Translation[], fieldName: string): string => {
    const translation = translations.find(
      t => t.languageCode === selectedLanguage && t.fieldName === fieldName
    );
    return translation?.translatedText || translations[0]?.translatedText || '';
  };

  const getPrice = (exchanges: Exchange[]): number => {
    const exchange = exchanges.find(e => e.symbol === selectedCurrency);
    return exchange ? exchange.price : 0;
  };

  const getSymbol = (exchanges: Exchange[]): string => {
    const exchange = exchanges.find(e => e.symbol === selectedCurrency);
    return exchange ? exchange.symbol : '';
  };

  if (!mockRestaurant.active) {
    return <NotFound subdomain={params.subdomain} />;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        '--primary': "#4F46E5",
        '--secondary': "#1E293B",
        '--accent': "#F59E0B"
      } as React.CSSProperties}
    >
      {/* Small Header (when menu is shown) */}
      <header className="bg-[var(--secondary)] py-0 px-3 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <img 
            src={mockRestaurant.logoUrl} 
            alt={mockRestaurant.name} 
            className="h-13 object-contain mr-3 rounded-full"
          />
          <h1 className="text-lg font-semibold text-white">
            {mockRestaurant.name}
          </h1>
        </div>

        <div className="bg-[var(--accent)] rounded">
          {/* View Toggle */}
          <div className="flex gap-1 bg-[var(--accent)] p-1 rounded">
            <button
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-white text-[var(--primary)]' : 'text-white'}`}
              onClick={() =>{ setViewMode('list')
                localStorage.setItem('viewMode', 'list');
              }}
              title="List View"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </button>
            <button
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white text-[var(--primary)]' : 'text-black'}`}
              onClick={() => {setViewMode('grid')
                localStorage.setItem('viewMode', 'grid');
              }}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-0"> 
            {/* Language Icon Dropdown */}
            <LanguageSwitcher
              languages={mockRestaurant.menu.supportedLanguages}
              selectedLanguage={selectedLanguage}
              onSelect={setSelectedLanguage}
            />

            {/* Currency Icon Dropdown */}
            <CurrencyExchange
              Currencies={mockRestaurant.menu.supportedCurrencies}
              selectedCurrency={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="flex-1 bg-white">
        <MenuCategories 
          viewMode={viewMode}
          categories={mockRestaurant.menu.baseCategories}
          language={selectedLanguage}
          getTranslation={getTranslation}
          getPrice={getPrice}
          getSymbol={getSymbol}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* Footer */}
      <Footer contacts={mockRestaurant.contacts!}/>
    </div>
  );
}