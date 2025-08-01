'use client';

import { Currency } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';

export default function PriceExchange({
  Currencies,
  selectedCurrency,
  onSelect
}: {
  Currencies: Currency[];
  selectedCurrency: string;
  onSelect: (CurrencyCode: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 💱 Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2  bg-[var(--accent)] hover:bg-[var(--primary)] text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M6.621 6.584c.208-.026.418-.046.629-.06v1.034l-.598-.138a.227.227 0 0 1-.116-.065.094.094 0 0 1-.028-.06 5.345 5.345 0 0 1 .002-.616.082.082 0 0 1 .025-.055.144.144 0 0 1 .086-.04ZM8.75 10.475V9.443l.594.137a.227.227 0 0 1 .116.065.094.094 0 0 1 .028.06 5.355 5.355 0 0 1-.002.616.082.082 0 0 1-.025.055.144.144 0 0 1-.086.04c-.207.026-.415.045-.625.06Z" />
          <path
            fillRule="evenodd"
            d="M2.5 3.5A1.5 1.5 0 0 1 4 2h4.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12a1.5 1.5 0 0 1 .439 1.061V12.5A1.5 1.5 0 0 1 12 14H4a1.5 1.5 0 0 1-1.5-1.5v-9Zm6.25 1.25a.75.75 0 0 0-1.5 0v.272c-.273.016-.543.04-.81.073-.748.09-1.38.689-1.428 1.494a6.836 6.836 0 0 0-.002.789c.044.785.635 1.348 1.305 1.503l.935.216v1.379a11.27 11.27 0 0 1-1.36-.173.75.75 0 1 0-.28 1.474c.536.102 1.084.17 1.64.202v.271a.75.75 0 0 0 1.5 0v-.272c.271-.016.54-.04.807-.073.747-.09 1.378-.689 1.427-1.494a6.843 6.843 0 0 0 .002-.789c-.044-.785-.635-1.348-1.305-1.503l-.931-.215v-1.38c.46.03.913.089 1.356.173a.75.75 0 0 0 .28-1.474 12.767 12.767 0 0 0-1.636-.201V4.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 💱 Currency Options */}
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-50">
          {Currencies.map((curn) => (
            <button
              key={curn.code}
              onClick={() => {
                onSelect(curn.code);
                localStorage.setItem('selectedCurrency', curn.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1 hover:bg-[var(--accent)] hover:text-white text-[var(--secondary)] ${
                curn.code === selectedCurrency ? 'font-semibold text-yellow-500' : ''
              }`}
            >
              {curn.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}