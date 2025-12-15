import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { LanguageOption } from '../types';

interface Props {
  onSelect: (lang: LanguageOption) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-col h-full p-6 bg-[#fafaf9] max-w-md mx-auto min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Globe className="w-12 h-12 text-stone-600" />
        </div>
        <h1 className="text-3xl font-bold text-stone-800 text-center mb-2 tracking-tight">Menu Master</h1>
        <p className="text-stone-500 text-center text-sm leading-relaxed">
          No more ordering anxiety.<br/>Translate and order with ease.
        </p>
      </div>

      <div className="w-full space-y-3 pb-8">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">
          Choose your language
        </p>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang)}
            className="w-full group bg-white border border-stone-200 hover:border-amber-600 hover:bg-orange-50/50 rounded-xl p-4 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-stone-700 group-hover:text-amber-800">
                {lang.nativeLabel}
              </span>
              <span className="text-xs text-stone-400 group-hover:text-amber-600/70">
                {lang.label}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-amber-600" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;