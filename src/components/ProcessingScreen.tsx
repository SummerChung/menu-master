import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getTranslation, LOADING_STEPS } from '../translations';

interface Props {
  langCode: string;
}

const ProcessingScreen: React.FC<Props> = ({ langCode }) => {
  const [stepIndex, setStepIndex] = useState(0);
  
  const steps = LOADING_STEPS[langCode] || LOADING_STEPS['en-US'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fafaf9] p-8">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-white p-4 rounded-full shadow-xl border border-amber-100">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-stone-800 mb-2 text-center">
        {getTranslation(langCode, 'processing.title')}
      </h2>
      <p className="text-stone-500 text-center text-sm h-6 transition-all duration-300">
        {steps[stepIndex]}
      </p>

      <div className="mt-8 w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
        <div className="h-full bg-amber-600 animate-progress origin-left"></div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ProcessingScreen;