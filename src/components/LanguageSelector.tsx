import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { LanguageOption } from '../types';

interface Props {
  onSelect: (lang: LanguageOption) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-[#fafaf9] max-w-md mx-auto overflow-hidden relative border-x border-stone-200">
      
      {/* Header Section: Fixed at top with reduced whitespace */}
      <div className="flex-none flex flex-col items-center justify-center pt-12 pb-6 px-6">
        <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
          <Globe className="w-10 h-10 text-stone-600" />
        </div>
        <h1 className="text-2xl font-bold text-stone-800 text-center mb-2 tracking-tight">Menu Master</h1>
        <p className="text-stone-500 text-center text-sm leading-relaxed max-w-[200px]">
          No more ordering anxiety.<br/>Translate and order with ease.
        </p>
      </div>

      {/* Language List: Fill remaining space, scroll internally if needed */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 scroll-smooth">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 text-center sticky top-0 bg-[#fafaf9] py-2 z-10 backdrop-blur-sm bg-[#fafaf9]/90">
          Choose your language
        </p>
        <div className="space-y-3 pb-8">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang)}
              className="w-full group bg-white border border-stone-200 hover:border-amber-600 hover:bg-orange-50/50 rounded-xl p-4 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99]"
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
    </div>
  );
};

export default LanguageSelector;