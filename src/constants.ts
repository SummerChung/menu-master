import { LanguageOption } from './types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'zh-TW', label: 'Traditional Chinese', nativeLabel: '繁體中文' },
  { code: 'en-US', label: 'English', nativeLabel: 'English' },
  { code: 'ko-KR', label: 'Korean', nativeLabel: '한국어' },
  { code: 'fr-FR', label: 'French', nativeLabel: 'Français' },
  { code: 'es-ES', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'ja-JP', label: 'Japanese', nativeLabel: '日本語' },
];

export const MOCK_LOADING_STEPS = [
  "Identifying menu layout...",
  "Recognizing text...",
  "Translating items...",
  "Extracting prices...",
  "Organizing categories...",
];