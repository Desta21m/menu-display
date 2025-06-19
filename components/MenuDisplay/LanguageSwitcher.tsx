'use client';

import { Language } from '@/lib/types';

export default function LanguageSwitcher({
  languages,
  selectedLanguage,
  onSelect
}: {
  languages: Language[];
  selectedLanguage: string;
  onSelect: (languageCode: string) => void;
}) {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onSelect(e.target.value)}
      className="border rounded px-3 py-1 text-white"
      style={{ 
        backgroundColor: 'var(--accent)',
        borderColor: 'var(--accent)'
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}