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
  const [localOrderingPhrase, setLocalOrderingPhrase] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const langCode = selectedLanguage?.code || 'en-US';

  const handleLanguageSelect = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setScreen('UPLOAD');
  };

  const handleImagesConfirmed = async (files: File[]) => {
    if (!selectedLanguage) return;
    setScreen('PROCESSING');

    try {
      // Convert all files to base64 parts with mime types
      const partPromises = files.map(file => fileToGenerativePart(file));
      const imageParts = await Promise.all(partPromises);
      
      const result = await analyzeMenu(imageParts, selectedLanguage.label);
      
      if (result && result.categories.length > 0) {
        setMenuData(result.categories);
        setLocalOrderingPhrase(result.orderingPhrase);
        setScreen('ORDERING');
      } else {
        alert("Could not identify menu items. Please try again with a clearer photo.");
        setScreen('UPLOAD');
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Unknown error occurred";
      alert(`Error processing menu: ${errorMessage}`);
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
    setLocalOrderingPhrase("");
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
          langCode={langCode}
        />
      )}

      {screen === 'PROCESSING' && (
        <ProcessingScreen langCode={langCode} />
      )}

      {screen === 'ORDERING' && (
        <MenuOrdering
          categories={menuData}
          onBack={() => setScreen('UPLOAD')}
          onProceedToSummary={handleGoToSummary}
          langCode={langCode}
        />
      )}

      {screen === 'SUMMARY' && (
        <OrderSummary
          cart={cart}
          onBack={() => setScreen('ORDERING')}
          onReset={handleReset}
          langCode={langCode}
          localOrderingPhrase={localOrderingPhrase}
        />
      )}
    </div>
  );
};

export default App;