import React, { useState } from 'react';
import { AppScreen, MenuCategory, CartItem, LanguageOption } from './types';
import LanguageSelector from './components/LanguageSelector';
import ImageUploader from './components/ImageUploader';
import ProcessingScreen from './components/ProcessingScreen';
import MenuOrdering from './components/MenuOrdering';
import OrderSummary from './components/OrderSummary';
import { analyzeMenu, fileToGenerativePart } from './services/geminiService';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('LANGUAGE');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleLanguageSelect = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setScreen('UPLOAD');
  };

  const handleImagesConfirmed = async (files: File[]) => {
    if (!selectedLanguage) return;
    setScreen('PROCESSING');

    try {
      // Convert all files to base64 strings
      const base64Promises = files.map(file => fileToGenerativePart(file));
      const base64Images = await Promise.all(base64Promises);
      
      const data = await analyzeMenu(base64Images, selectedLanguage.label);
      
      if (data && data.length > 0) {
        setMenuData(data);
        setScreen('ORDERING');
      } else {
        alert("Could not identify menu items. Please try again with a clearer photo.");
        setScreen('UPLOAD');
      }
    } catch (error) {
      console.error(error);
      alert("Error processing menu. Please try again.");
      setScreen('UPLOAD');
    }
  };

  const handleGoToSummary = (currentCart: CartItem[]) => {
    setCart(currentCart);
    setScreen('SUMMARY');
  };

  const handleReset = () => {
    setCart([]);
    setMenuData([]);
    setSelectedLanguage(null);
    setScreen('LANGUAGE');
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-stone-200">
      {screen === 'LANGUAGE' && (
        <LanguageSelector onSelect={handleLanguageSelect} />
      )}
      
      {screen === 'UPLOAD' && (
        <ImageUploader 
          onBack={() => setScreen('LANGUAGE')} 
          onImagesConfirmed={handleImagesConfirmed} 
        />
      )}

      {screen === 'PROCESSING' && (
        <ProcessingScreen />
      )}

      {screen === 'ORDERING' && (
        <MenuOrdering
          categories={menuData}
          onBack={() => setScreen('UPLOAD')}
          onProceedToSummary={handleGoToSummary}
        />
      )}

      {screen === 'SUMMARY' && (
        <OrderSummary
          cart={cart}
          onBack={() => setScreen('ORDERING')}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;