// components/MenuDisplay/RestaurantPage.tsx
'use client';

import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import MenuCategories from './MenuCategories';
import { Restaurant, Translation } from '@/lib/types';

export default function RestaurantPage({ restaurant }: { restaurant: Restaurant }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const getTranslation = (translations: Translation[], fieldName: string): string => {
    const translation = translations.find(
      t => t.languageCode === selectedLanguage && t.fieldName === fieldName
    );
    return translation?.translatedText || translations[0]?.translatedText || '';
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      '--primary': restaurant.primaryColor,
      '--secondary': restaurant.secondaryColor,
      '--accent': restaurant.accentColor
    } as React.CSSProperties}>
      {/* Header */}
      {showMenu ? (
        <header className="bg-[var(--secondary)] py-3 px-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center">
            <img src={restaurant.logoUrl} alt={restaurant.name} className="h-10 object-contain mr-3" />
            <h1 className="text-lg font-semibold text-white">{restaurant.name}</h1>
          </div>
          <LanguageSwitcher
            languages={restaurant.meanu.supportedLanguages}
            selectedLanguage={selectedLanguage}
            onSelect={setSelectedLanguage}
          />
        </header>
      ) : (
        <header className="h-screen flex flex-col items-center justify-center pb-20 relative" style={{ backgroundColor: 'var(--secondary)' }}>
          <div className="absolute top-4 right-4 z-10">
            <LanguageSwitcher
              languages={restaurant.meanu.supportedLanguages}
              selectedLanguage={selectedLanguage}
              onSelect={setSelectedLanguage}
            />
          </div>

          <div className="text-center px-4">
            <img src={restaurant.logoUrl} alt={restaurant.name} className="h-32 w-auto mb-8 object-contain mx-auto" />
            <h1 className="text-5xl font-bold text-white mb-4">{restaurant.name}</h1>
            {restaurant.description && (
              <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-12">{restaurant.description}</p>
            )}
            <button
              onClick={() => setShowMenu(true)}
              className="px-8 py-4 bg-[var(--accent)] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg animate-bounce"
            >
              View Our Menu
            </button>
          </div>
        </header>
      )
    }

      {/* Menu Content */}
      {showMenu && (
        <main className="flex-1 bg-white">
          <MenuCategories
            categories={restaurant.meanu.baseCategories}
            language={selectedLanguage}
            getTranslation={getTranslation}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            {restaurant.contacts?.phoneNumner && <p>Phone: {restaurant.contacts.phoneNumner}</p>}
            {restaurant.contacts?.emale && <p>Email: {restaurant.contacts.emale}</p>}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <div className="flex gap-4">
              {restaurant.contacts?.facebookpageUrl && <a href={restaurant.contacts.facebookpageUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
              {restaurant.contacts?.instgram && <a href={restaurant.contacts.instgram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Powered By</h3>
            <a href="https://menumaya.local" className="text-[var(--accent)] hover:underline" target="_blank" rel="noopener noreferrer">MenuMaya</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
