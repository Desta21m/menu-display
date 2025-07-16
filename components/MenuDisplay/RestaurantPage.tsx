// components/MenuDisplay/RestaurantPage.tsx
'use client';

import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import MenuCategories from './MenuCategories';
import { Exchange, Restaurant, Translation } from '@/lib/types';
import Footer from '../UI/Footer';
import CurrencyExchange from './CurrencyExchange';

export default function RestaurantPage({ restaurant }: { restaurant: Restaurant }) {
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
            src={restaurant.logoUrl} 
            alt={restaurant.name} 
            className="h-13 object-contain mr-3 rounded-full"
          />
          <h1 className="text-lg font-semibold text-white">
            {restaurant.name}
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
              languages={restaurant.menu.supportedLanguages}
              selectedLanguage={selectedLanguage}
              onSelect={setSelectedLanguage}
            />

            {/* Currency Icon Dropdown */}
            <CurrencyExchange
              Currencies={restaurant.menu.supportedCurrencies}
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
          categories={restaurant.menu.baseCategories}
          language={selectedLanguage}
          getTranslation={getTranslation}
          getPrice={getPrice}
          getSymbol={getSymbol}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* Footer */}
      <Footer contacts={restaurant.contacts!}/>
    </div>
  );
}