/* eslint-disable @next/next/no-img-element */
"use client";

import { Category, Discount, Exchange, Food, Translation } from "@/lib/types";
import { X } from "lucide-react";
import { useEffect } from "react";

interface FoodDetailModalProps {
  food: Food | null;
  onClose: () => void;
  getTranslation: (translations: Translation[], field: string) => string;
  getPrice?: (exchanges: Exchange[]) => number;
  getSymbol?: (exchanges: Exchange[]) => string;
  categories: Category[];
}

export default function FoodDetailModal({
  food,
  onClose,
  getTranslation,
  getPrice,
  getSymbol,
  categories,
}: FoodDetailModalProps) {
  useEffect(() => {
    if (!food) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [food]);

  if (!food) return null;

  // Helper functions
  function isFutureDate(date?: string | Date | null): boolean {
    if (!date) return false;
    return new Date(date).getTime() > Date.now();
  }

  function getRemainingTime(date: string | Date): string {
    const now = new Date();
    const target = new Date(date);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;

    return days >= 1 ? `${days}d` : `${hours}:${minutes.toString().padStart(2, "0")}`;
  }

  function getEffectiveDiscount(categories: Category[], foodId: number): Discount | null {
    let result: Discount | null = null;

    const isValid = (d?: Discount | null) =>
      d && isFutureDate(d.endDate);

    function traverse(cats: Category[], inherited?: Discount) {
      for (const cat of cats) {
        const inheritedDiscount = isValid(cat.discount) ? cat.discount : inherited;

        for (const f of cat.foods) {
          if (f.id === foodId) {
            if (isValid(f.discount)) result = f.discount!;
            else if (isValid(inheritedDiscount)) result = inheritedDiscount!;
            return true;
          }
        }

        if (cat.children && traverse(cat.children, inheritedDiscount)) return true;
      }
      return false;
    }

    traverse(categories);
    return result;
  }

  const symbol = getSymbol?.(food.exchanges ?? []) ?? "";
  const price = getPrice?.(food.exchanges ?? []) ?? 0;

  const discount = getEffectiveDiscount(categories, food.id);
  const isUpcoming = discount && isFutureDate(discount.startDate) && isFutureDate(discount.endDate);
  const isActive = discount && !isFutureDate(discount.startDate) && isFutureDate(discount.endDate);
  const hasDiscount = isActive || isUpcoming;

  const discountedPrice = discount?.percentage
    ? price * (1 - discount.percentage / 100)
    : price;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[1.5px] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md p-5 rounded-lg shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-white hover:text-white active:translate-y-[1px] transition-all duration-150"
          style={{
            background: "radial-gradient(circle at 30% 30%, #f87171,rgb(244, 96, 27),rgb(42, 1, 1))",
            boxShadow:
              "0 4px 0 rgba(0, 0, 0, 0.15), 0 8px 15px rgba(239, 68, 68, 0.3)", // red glow
          }}
          aria-label="Close"
          title="Close"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <img
          src={food.imageUrl}
          alt={getTranslation(food.translations, "name")}
          className="w-full max-h-60 object-cover rounded-xl mb-4 shadow-sm border border-gray-100"
        />

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          {getTranslation(food.translations, "name")}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {getTranslation(food.translations, "description")}
        </p>

        <div className="flex flex-col gap-2 text-[15px] font-medium text-gray-800">
          {hasDiscount ? (
            <>
              <div className="flex items-center gap-2">
                {isUpcoming ? (
                  <>
                    {/* 🔜 Upcoming Discount: Show normal price, strike future discount */}
                    <span className="text-gray-800 font-bold text-lg">
                      {symbol} {price.toFixed(2)}
                    </span>
                    <span className="line-through text-sm text-green-700">
                      {symbol} {discountedPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <>
                    {/* 🔥 Active Discount: Show discounted price in red */}
                    <span className="text-[var(--primary)] font-bold text-lg">
                      {symbol} {discountedPrice.toFixed(2)}
                    </span>
                    <span className="line-through text-sm text-red-700">
                      {symbol} {price.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <span
                className={`text-xs px-2 py-1 rounded font-semibold w-max absolute right-1 ${
                  isUpcoming
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                -{discount?.percentage}%{" "}
                {isUpcoming ? "Starts in " : "Ends in "}
                {getRemainingTime(
                  isUpcoming ? discount?.startDate ?? "" : discount?.endDate ?? ""
                )}
              </span>
            </>
          ) : (
            <span className="text-[var(--primary)] font-bold text-lg">
              {symbol} {price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}