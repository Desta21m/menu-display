'use client';

import { Category, Food, Translation } from '@/lib/types';
import { useMemo } from 'react';

interface MenuCategoriesProps {
  categories: Category[];
  language: string;
  getTranslation: (translations: Translation[], fieldName: string) => string;
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function MenuCategories({
  categories,
  language,
  getTranslation,
  selectedCategory,
  onSelectCategory
}: MenuCategoriesProps) {
  // Recursively get all foods
  const getAllFoods = (cats: Category[]): Food[] => {
    return cats.flatMap(category => [
      ...category.foods,
      ...(category.children ? getAllFoods(category.children) : [])
    ]);
  };

  // Find category by ID recursively
  function findCategory(cats: Category[], id: number): Category | null {
    for (const cat of cats) {
      if (cat.id === id) return cat;
      if (cat.children) {
        const found = findCategory(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  // Build breadcrumb path
  function getBreadcrumbPath(cats: Category[], id: number): Category[] {
    const path: Category[] = [];

    function traverse(currentCats: Category[]): boolean {
      for (const cat of currentCats) {
        path.push(cat);
        if (cat.id === id) return true;
        if (cat.children && traverse(cat.children)) return true;
        path.pop();
      }
      return false;
    }

    traverse(cats);
    return path;
  }

  const allFoods = getAllFoods(categories);
  const currentCategory = selectedCategory ? findCategory(categories, selectedCategory) : null;
  const breadcrumbPath = selectedCategory ? getBreadcrumbPath(categories, selectedCategory) : [];

  const displayedCategories = selectedCategory
    ? currentCategory?.children ?? []
    : categories;
  const foodsToDisplay = selectedCategory
  ? currentCategory
      ? getAllFoods([currentCategory]) // ✅ Recursively get foods from selected category tree
      : []
  : allFoods;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top Bar: Breadcrumb Navigation */}
      <div className="sticky top-16 z-40 bg-white shadow-sm py-3 px-4 border-b flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
        <button onClick={() => onSelectCategory(null)} className="text-[var(--primary)] font-medium">
          All
        </button>
        {breadcrumbPath.map((cat, index) => (
          <div key={cat.id} className="flex items-center space-x-2">
            <span>/</span>
            <button
              onClick={() => onSelectCategory(cat.id)}
              className={`${
                index === breadcrumbPath.length - 1
                  ? 'text-gray-900 font-semibold'
                  : 'text-[var(--primary)]'
              } whitespace-nowrap`}
            >
              {getTranslation(cat.translations, 'name')}
            </button>
          </div>
        ))}
      </div>

      {/* Horizontal Category Scroll */}
      <div className="sticky top-[calc(4rem+2px)] z-30 bg-white shadow-sm py-3 px-4 border-b">
        <div className="flex space-x-4 overflow-x-auto">
          {displayedCategories.map(category => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="flex flex-col items-center min-w-fit px-2 py-1 transition-colors"
            >
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-xl overflow-hidden">
                {/* {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={getTranslation(category.translations, 'name')}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <span>🍽️</span>
                )} */}
                 <span>🍔</span>
              </div>
              <span className="text-sm mt-1 font-medium text-center">
                {getTranslation(category.translations, 'name')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Food Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {(selectedCategory ? foodsToDisplay : allFoods).map(food => (
          <div key={food.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {food.imageUrl && (
              <img
                src={food.imageUrl}
                alt={getTranslation(food.translations, 'name')}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">
                  {getTranslation(food.translations, 'name')}
                </h3>
                <div className="flex items-center">
                  {food.discount && (
                    <span className="text-red-500 line-through mr-2 text-sm">
                      ${food.price.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[var(--primary)] font-bold">
                    ${food.discount
                      ? (food.price * (1 - food.discount.percentage / 100)).toFixed(2)
                      : food.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                {getTranslation(food.translations, 'description')}
              </p>
              {food.discount && (
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-2">
                  {food.discount.percentage}% OFF
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
