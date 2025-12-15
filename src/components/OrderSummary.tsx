import React from 'react';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  onBack: () => void;
  onReset: () => void;
}

const OrderSummary: React.FC<Props> = ({ cart, onBack, onReset }) => {
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-screen bg-[#fafaf9]">
      <header className="bg-stone-800 text-white p-4 shadow-md sticky top-0 z-10">
         <div className="flex items-center justify-between mb-4">
             <button onClick={onBack} className="p-1 hover:bg-stone-700 rounded-full transition-colors">
                 <ArrowLeft className="w-6 h-6" />
             </button>
             <span className="text-sm font-medium opacity-70">Show this screen to staff</span>
             <div className="w-6"></div> {/* Spacer */}
         </div>
         <h1 className="text-3xl font-bold text-center mb-1 text-amber-50">注文リスト</h1>
         <p className="text-center text-stone-300 text-sm">Order List</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-32">
        {/* Speech Bubble */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 mb-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-l border-stone-200 transform rotate-45"></div>
            <p className="text-xl font-bold text-stone-800 text-center mb-2">
                「すみません、これを注文したいです。」
            </p>
            <p className="text-center text-stone-400 text-xs">
                (Excuse me, I would like to order this.)
            </p>
        </div>

        {/* List */}
        <div className="space-y-3">
            {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-stone-100">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-stone-800">{item.originalName}</h3>
                        <p className="text-xs text-stone-400">{item.translatedName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="bg-stone-100 text-stone-800 font-bold px-3 py-1 rounded-lg text-lg border border-stone-200">
                            ×{item.quantity}
                         </div>
                         <div className="text-right min-w-[60px]">
                            <p className="text-sm font-bold text-stone-600">¥{(item.price * item.quantity).toLocaleString()}</p>
                         </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Total */}
        <div className="mt-8 flex items-center justify-between px-4">
            <span className="text-stone-500 font-medium">Total</span>
            <span className="text-3xl font-bold text-amber-700">¥{totalPrice.toLocaleString()}</span>
        </div>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-stone-100">
         <button
            onClick={onReset}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-200/50 flex items-center justify-center gap-2 active:scale-95 transition-transform"
         >
            <CheckCircle2 className="w-5 h-5" />
            Finish & Clear
         </button>
      </div>
    </div>
  );
};

export default OrderSummary;