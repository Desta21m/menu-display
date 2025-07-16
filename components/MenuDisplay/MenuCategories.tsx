/* eslint-disable @next/next/no-img-element */
"use client";

import { Category, Discount, Exchange, Food, Translation } from "@/lib/types";
import ScrollingText from "./ScrollingText";
import FoodDetailModal from "./FoodDetailModal";
import { useState } from "react";

interface MenuCategoriesProps {
  categories: Category[];
  language: string;
  viewMode: string;
  getPrice?: (exchanges: Exchange[]) => number;
  getSymbol?: (exchanges: Exchange[]) => string;
  getTranslation: (translations: Translation[], fieldName: string) => string;
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function MenuCategories({
  categories,
  viewMode,
  getPrice,
  getSymbol,
  getTranslation,
  selectedCategory,
  onSelectCategory,
}: MenuCategoriesProps) {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  // Recursively get all foods
  const getAllFoods = (cats: Category[]): Food[] => {
    return cats.flatMap((category) => [
      ...category.foods,
      ...(category.children ? getAllFoods(category.children) : []),
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

  // Discount Date logic
  function getRemainingTime(targetDate: string | Date): string {
    if (!targetDate) return "";
    const now = new Date();
    const target = new Date(targetDate);
    const diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) return "Expired";

    const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return days >= 1 ? `${days}d` : `${hours}:${minutes.toString().padStart(2, "0")}`;
  }

  function isFutureDate(targetDate?: string | Date | null): boolean {
    if (!targetDate) return false;
    const now = new Date();
    const date = new Date(targetDate);
    return date.getTime() > now.getTime();
  }

  function getEffectiveDiscount(
    baseCategories: Category[],
    foodId: number
  ): Discount | null {
    let validDiscount: Discount | null = null;

    function isValidDiscount(discount?: Discount | null): boolean {
      return !!discount && isFutureDate(discount.endDate);
    }

    function findFoodDiscount(
      categories: Category[],
      inheritedDiscount?: Discount
    ): boolean {
      for (const category of categories) {
        const currentInheritedDiscount = isValidDiscount(category.discount)
          ? category.discount
          : inheritedDiscount;

        // Check food in current category
        for (const food of category.foods) {
          if (food.id === foodId) {
            const foodDiscount = food.discount;
            if (isValidDiscount(foodDiscount)) {
              validDiscount = foodDiscount ?? null;
            } else if (isValidDiscount(currentInheritedDiscount)) {
              validDiscount = currentInheritedDiscount ?? null;
            } else {
              validDiscount = null;
            }
            return true; // Found the food
          }
        }

        // Recurse into children
        if (category.children && category.children.length > 0) {
          const found = findFoodDiscount(
            category.children,
            currentInheritedDiscount
          );
          if (found) return true;
        }
      }

      return false;
    }

    findFoodDiscount(baseCategories);
    return validDiscount;
  }

  const allFoods = getAllFoods(categories);
  console.log("All Foods:", allFoods);
  const currentCategory = selectedCategory
    ? findCategory(categories, selectedCategory)
    : null;
  const breadcrumbPath = selectedCategory
    ? getBreadcrumbPath(categories, selectedCategory)
    : [];

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
      <div className="sticky top-16 z-40 bg-white shadow-sm py-2 px-4 border-b flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto">
        <button
          onClick={() =>{ onSelectCategory(null)
          localStorage.setItem("selectedCategory", "null");  // Store null as string
          }}
          className="text-gray-900 font-medium"
        >
          All
        </button>
        {breadcrumbPath.map((cat, index) => (
          <div key={cat.id} className="flex items-center space-x-2">
            <span>/</span>
            <button
              onClick={() => {onSelectCategory(cat.id)
              localStorage.setItem("selectedCategory", cat.id.toString());  // Store ID as string
              }}
              className={`${
                index === breadcrumbPath.length - 1
                  ? "text-yellow-500 font-semibold"
                  : "text-gray-900 hover:text-[var(--primary)]"
              } whitespace-nowrap`}
            >
              {getTranslation(cat.translations, "name")}
            </button>
          </div>
        ))}
      </div>

      {/* Horizontal Category Scroll */}
      {displayedCategories.length > 0 && (
        <div className="sticky top-25 pt-1 z-30 bg-white shadow-sm border-b h-20 px-4 flex items-center">
          <div className="flex space-x-4 w-full h-full overflow-x-auto hide-scrollbar">
            {displayedCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>{ onSelectCategory(category.id)
                localStorage.setItem("selectedCategory", category.id.toString());  // Store ID as string
                }}
                className="w-20 flex-shrink-0 flex flex-col items-center py-1.5 transition-colors"
              >
                <div className="relative h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl">🍔</span>

                  {/* Discount badge floating partially on the icon, partially outside */}
                  {category.discount?.endDate &&
                    isFutureDate(category.discount.endDate) && (
                      <div
                        className={`absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-6 h-4.5 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-1 border-white shadow-sm z-10
                          ${
                            isFutureDate(category.discount.startDate)
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                      >
                        -{category.discount.percentage}%
                      </div>
                    )}
                </div>
                <ScrollingText
                  text={getTranslation(category.translations, "name")}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* View Mode Toggle */}

      {/* Food Items */}
      <div className="p-2 space-y-6">
        {(displayedCategories.length > 0
          ? displayedCategories
          : [
              {
                id: 0,
                translations: [],
                children: [],
                foods: foodsToDisplay,
              },
            ]
        ).map((category) => (
          <div
            key={category.id}
            className={`${
              viewMode === "grid"
                ? "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                : "bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            }`}
          >
            {/* Only show category name if there are real categories */}
            {displayedCategories.length > 0 && (
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {getTranslation(category.translations, "name")}
              </h2>
            )}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2"
                  : "space-y-2"
              }`}
            >
              {(displayedCategories.length > 0
                ? selectedCategory
                  ? (() => {
                      const foundCat = findCategory(categories, category.id);
                      return foundCat ? getAllFoods([foundCat]) : foodsToDisplay;
                    })()
                  : getAllFoods(category.children ?? [])
                : foodsToDisplay
              ).map((food) => (
                <div
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                  className={`rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                    viewMode === "list"
                      ? "flex flex-row gap-2 p-1 items-start "
                      : "flex flex-col"
                  }`}
                >
                  {/* 🍔 Thumbnail Image (Always Left in List View) */}
                  {food.imageUrl && (
                    viewMode === "grid" ? (
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
                        <img
                          src={food.imageUrl}
                          alt={getTranslation(food.translations, "name")}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <img
                        src={food.imageUrl}
                        alt={getTranslation(food.translations, "name")}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0"
                      />
                    )
                  )}

                  {/* 📋 Content (Always to Right of Image in List View) */}
                  <div
                    className={`flex flex-col justify-between flex-1 ${
                      viewMode === "list" ? "h-full" : "p-2"
                    }`}
                  >
                    {/* Name */}
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {getTranslation(food.translations, "name")}
                    </h3>

                    {/* Description (max 2 lines) */}
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {getTranslation(food.translations, "description")}
                    </p>

                    {/* Price & Discount */}
                    <div className="flex items-center justify-between mt-2">
                      {
                        //upcoming discount logic
                        isFutureDate(
                          getEffectiveDiscount(categories, food.id)?.endDate
                        ) &&
                        isFutureDate(
                          getEffectiveDiscount(categories, food.id)?.startDate
                        ) ? (
                          <div className="flex items-center space-x-0.5">
                            <span className="text-[var(--primary)] font-bold text-[12px] sm:text-xl tracking-tight">
                              {getSymbol ? getSymbol(food.exchanges ?? []) : ""}{" "}
                              {getPrice
                                ? Number(getPrice(food.exchanges ?? [])).toFixed(2)
                                : (0).toFixed(2)}
                            </span>
                            {(() => {
                              const effectiveDiscount = getEffectiveDiscount(
                                categories,
                                food.id
                              );
                              return effectiveDiscount ? (
                                <span className="text-green-700 line-through text-[8px] sm:text-sm font-medium align-sub">
                                  {effectiveDiscount.percentage
                                    ? ` ${
                                        getPrice
                                          ? (
                                              Number(getPrice(food.exchanges ?? [])) *
                                              (1 - effectiveDiscount.percentage / 100)
                                            ).toFixed(2)
                                          : (0).toFixed(2)
                                      }`
                                    : ` ${
                                        getPrice
                                          ? Number(
                                              getPrice(food.exchanges ?? [])
                                            ).toFixed(2)
                                          : (0).toFixed(2)
                                      }`}
                                </span>
                              ) : null;
                            })()}
                          </div>
                        ) : // If the discount is active but not yet started or already ended
                        isFutureDate(
                          getEffectiveDiscount(categories, food.id)?.endDate
                        ) &&
                        !isFutureDate(
                          getEffectiveDiscount(categories, food.id)?.startDate
                        ) ? (
                          <div className="flex items-center space-x-0.5">
                            <span className="text-red-700 line-through text-[8px] sm:text-sm font-medium align-sub">
                              {getPrice
                                ? Number(getPrice(food.exchanges ?? [])).toFixed(2)
                                : (0).toFixed(2)}
                            </span>
                            {(() => {
                              const effectiveDiscount = getEffectiveDiscount(
                                categories,
                                food.id
                              );
                              // If the discount is active, show the discounted price
                              return effectiveDiscount ? (
                                <span className="text-[var(--primary)] font-bold text-[12px] sm:text-xl tracking-tight">
                                  {effectiveDiscount.percentage
                                    ? `${
                                        getSymbol
                                          ? getSymbol(food.exchanges ?? [])
                                          : ""
                                      } ${
                                        getPrice
                                          ? (
                                              Number(getPrice(food.exchanges ?? [])) *
                                              (1 - effectiveDiscount.percentage / 100)
                                            ).toFixed(2)
                                          : (0).toFixed(2)
                                      }`
                                    : `${
                                        getSymbol
                                          ? getSymbol(food.exchanges ?? [])
                                          : ""
                                      } ${
                                        getPrice
                                          ? Number(
                                              getPrice(food.exchanges ?? [])
                                            ).toFixed(2)
                                          : (0).toFixed(2)
                                      }`}
                                </span>
                              ) : null;
                            })()}
                          </div>
                        ) : (
                          <span className="text-[var(--primary)] font-semibold font-bold text-[12px] sm:text-xl tracking-tight">
                            {getSymbol ? getSymbol(food.exchanges ?? []) : ""}{" "}
                            {getPrice
                              ? Number(getPrice(food.exchanges ?? [])).toFixed(2)
                              : (0).toFixed(2)}
                          </span>
                        )
                      }

                      {getEffectiveDiscount(categories, food.id)?.startDate &&
                        getEffectiveDiscount(categories, food.id)?.endDate &&
                        isFutureDate(
                          getEffectiveDiscount(categories, food.id)?.endDate
                        ) && (
                          <span
                            className={`text-[9px] px-0.5 py-1 rounded ${
                              isFutureDate(
                                getEffectiveDiscount(categories, food.id)?.startDate
                              )
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            -{getEffectiveDiscount(categories, food.id)?.percentage}%{" "}
                            {isFutureDate(
                              getEffectiveDiscount(categories, food.id)?.startDate
                            )
                              ? "Starts in "
                              : "Ends in "}
                            {isFutureDate(
                              getEffectiveDiscount(categories, food.id)?.startDate
                            )
                              ? getRemainingTime(
                                  getEffectiveDiscount(categories, food.id)
                                    ?.startDate ?? ""
                                )
                              : getRemainingTime(
                                  getEffectiveDiscount(categories, food.id)
                                    ?.endDate ?? ""
                                )}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          getTranslation={getTranslation}
          getSymbol={getSymbol}
          getPrice={getPrice}
          categories={categories}
        />
      </div>
    </div>
  );
}

