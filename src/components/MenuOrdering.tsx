import React, { useState, useMemo } from 'react';
import { Plus, Minus, ShoppingBag, ArrowLeft, RefreshCw } from 'lucide-react';
import { MenuCategory, CartItem, MenuItem } from '../types';
import { getTranslation } from '../translations';

interface Props {
  categories: MenuCategory[];
  onBack: () => void;
  onProceedToSummary: (cart: CartItem[]) => void;
  langCode: string;
}

const MenuOrdering: React.FC<Props> = ({ categories, onBack, onProceedToSummary, langCode }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.name || '');
  const [cart, setCart] = useState<Record<string, number>>({});

  const t = (key: string) => getTranslation(langCode, key);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCart(prev => {
      const current = prev[item.id] || 0;
      if (current <= 1) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item.id]: current - 1 };
    });
  };

  const totalItems = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);
  const totalPrice = categories.flatMap(c => c.items).reduce((sum: number, item) => {
    return sum + (item.price * (cart[item.id] || 0));
  }, 0);

  const cartList: CartItem[] = useMemo(() => {
    return categories.flatMap(c => c.items)
      .filter(item => cart[item.id])
      .map(item => ({ ...item, quantity: cart[item.id] }));
  }, [categories, cart]);

  return (
    <div className="flex flex-col h-screen bg-[#fafaf9]">
      {/* Header */}
      <header className="bg-white shadow-sm z-20">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 -ml-2 text-stone-600 hover:bg-stone-50 rounded-full">
             <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg text-stone-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-600 rounded-full inline-block"></span>
            {t('ordering.title')}
          </h1>
          <button onClick={onBack} className="text-xs font-medium text-stone-400 flex items-center gap-1 hover:text-stone-600">
             <RefreshCw className="w-3 h-3" /> {t('ordering.rescan')}
          </button>
        </div>

        {/* Categories Tab */}
        <div className="flex overflow-x-auto no-scrollbar px-4 pb-0 space-x-6 border-b border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeCategory === cat.name ? 'text-amber-700' : 'text-stone-400'
              }`}
            >
              {cat.name}
              {activeCategory === cat.name && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-32 scroll-smooth">
        {categories.map((cat) => (
           <div key={cat.name} id={`cat-${cat.name}`} className={activeCategory === cat.name ? 'block' : 'hidden'}>
              <h2 className="text-lg font-bold text-stone-800 mb-4 pl-1">{cat.name}</h2>
              <div className="space-y-4">
                {cat.items.map((item) => {
                  const quantity = cart[item.id] || 0;
                  return (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-2">
                           <h3 className="text-lg font-bold text-stone-800 leading-tight">{item.translatedName}</h3>
                           <p className="text-xs text-stone-400 font-medium mt-1">{item.originalName}</p>
                           {item.description && (
                             <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                           )}
                        </div>
                        <div className="text-lg font-bold text-stone-800 shrink-0 font-mono">
                          ¥{item.price.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex justify-end pt-2 border-t border-stone-50 mt-1">
                        {quantity === 0 ? (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-orange-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 hover:bg-orange-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" /> {t('ordering.add')}
                          </button>
                        ) : (
                          <div className="flex items-center gap-4 bg-stone-50 rounded-full px-1 py-1 border border-stone-100">
                             <button
                               onClick={() => handleRemoveFromCart(item)}
                               className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-stone-600 active:scale-90 transition-transform"
                             >
                               <Minus className="w-4 h-4" />
                             </button>
                             <span className="font-bold text-stone-900 w-4 text-center">{quantity}</span>
                             <button
                               onClick={() => handleAddToCart(item)}
                               className="w-8 h-8 flex items-center justify-center bg-amber-700 rounded-full shadow-sm text-white active:scale-90 transition-transform"
                             >
                               <Plus className="w-4 h-4" />
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>
        ))}
      </main>

      {/* Floating Cart Footer */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-stone-100 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] z-30">
          <div className="flex items-center justify-between mb-2">
             <span className="text-sm text-stone-500">{t('ordering.totalItems')} {totalItems}</span>
             <span className="text-2xl font-bold text-amber-700">¥{totalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={() => onProceedToSummary(cartList)}
            className="w-full bg-stone-800 text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-stone-300 flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            {t('ordering.viewOrder')}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuOrdering;