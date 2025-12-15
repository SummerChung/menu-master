export interface MenuItem {
  id: string;
  originalName: string;
  translatedName: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type AppScreen = 'LANGUAGE' | 'UPLOAD' | 'PROCESSING' | 'ORDERING' | 'SUMMARY';

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}