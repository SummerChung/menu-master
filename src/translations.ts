import { LanguageOption } from './types';

export type TranslationKey = 
  | 'upload.title'
  | 'upload.subtitle'
  | 'upload.camera'
  | 'upload.gallery'
  | 'upload.analyze'
  | 'upload.noImages'
  | 'upload.addPage'
  | 'processing.title'
  | 'ordering.title'
  | 'ordering.rescan'
  | 'ordering.add'
  | 'ordering.totalItems'
  | 'ordering.viewOrder'
  | 'summary.title'
  | 'summary.showStaff'
  | 'summary.speechBubble'
  | 'summary.speechSub'
  | 'summary.total'
  | 'summary.finish';

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  'en-US': {
    'upload.title': 'Scan Menu',
    'upload.subtitle': "Take photos of all menu pages. We'll combine them into one order list.",
    'upload.camera': 'Camera',
    'upload.gallery': 'Gallery',
    'upload.analyze': 'Analyze Menu',
    'upload.noImages': 'No images selected',
    'upload.addPage': 'Add Page',
    'processing.title': 'Analyzing Menu...',
    'ordering.title': 'Menu',
    'ordering.rescan': 'Rescan',
    'ordering.add': 'Add',
    'ordering.totalItems': 'Total items',
    'ordering.viewOrder': 'View Order List',
    'summary.title': 'Order List',
    'summary.showStaff': 'Show this screen to staff',
    'summary.speechBubble': 'Excuse me, I would like to order this.',
    'summary.speechSub': '(Please translate this to local staff)',
    'summary.total': 'Total',
    'summary.finish': 'Finish & Clear',
  },
  'zh-TW': {
    'upload.title': '掃描菜單',
    'upload.subtitle': '請拍攝菜單的所有頁面，我們會將其合併為一張點餐清單。',
    'upload.camera': '相機',
    'upload.gallery': '相簿',
    'upload.analyze': '開始分析',
    'upload.noImages': '尚未選擇圖片',
    'upload.addPage': '新增頁面',
    'processing.title': '正在分析菜單...',
    'ordering.title': '菜單',
    'ordering.rescan': '重新掃描',
    'ordering.add': '加入',
    'ordering.totalItems': '共計項目',
    'ordering.viewOrder': '查看點餐清單',
    'summary.title': '點餐清單',
    'summary.showStaff': '請向店員出示此畫面',
    'summary.speechBubble': '不好意思，我想點這些。',
    'summary.speechSub': '(Excuse me, I would like to order this.)',
    'summary.total': '總計',
    'summary.finish': '完成並清除',
  },
  'ja-JP': {
    'upload.title': 'メニューをスキャン',
    'upload.subtitle': 'メニューの全ページを撮影してください。1つの注文リストにまとめます。',
    'upload.camera': 'カメラ',
    'upload.gallery': 'アルバム',
    'upload.analyze': '分析する',
    'upload.noImages': '画像が選択されていません',
    'upload.addPage': 'ページ追加',
    'processing.title': 'メニューを分析中...',
    'ordering.title': 'メニュー',
    'ordering.rescan': '再スキャン',
    'ordering.add': '追加',
    'ordering.totalItems': '合計点数',
    'ordering.viewOrder': '注文リストを見る',
    'summary.title': '注文リスト',
    'summary.showStaff': 'この画面を店員に見せてください',
    'summary.speechBubble': 'すみません、これを注文したいです。',
    'summary.speechSub': '(Excuse me, I would like to order this.)',
    'summary.total': '合計',
    'summary.finish': '終了してクリア',
  },
  'ko-KR': {
    'upload.title': '메뉴 스캔',
    'upload.subtitle': '모든 메뉴 페이지를 촬영하세요. 하나의 주문 목록으로 통합해 드립니다.',
    'upload.camera': '카메라',
    'upload.gallery': '갤러리',
    'upload.analyze': '분석 시작',
    'upload.noImages': '선택된 이미지 없음',
    'upload.addPage': '페이지 추가',
    'processing.title': '메뉴 분석 중...',
    'ordering.title': '메뉴',
    'ordering.rescan': '다시 스캔',
    'ordering.add': '추가',
    'ordering.totalItems': '총 항목',
    'ordering.viewOrder': '주문 목록 보기',
    'summary.title': '주문 목록',
    'summary.showStaff': '직원에게 이 화면을 보여주세요',
    'summary.speechBubble': '저기요, 이걸로 주문할게요.',
    'summary.speechSub': '(Excuse me, I would like to order this.)',
    'summary.total': '합계',
    'summary.finish': '완료 및 초기화',
  },
  'fr-FR': {
    'upload.title': 'Scanner le menu',
    'upload.subtitle': 'Prenez des photos de toutes les pages. Nous les combinerons en une liste.',
    'upload.camera': 'Caméra',
    'upload.gallery': 'Galerie',
    'upload.analyze': 'Analyser',
    'upload.noImages': 'Aucune image',
    'upload.addPage': 'Ajouter',
    'processing.title': 'Analyse en cours...',
    'ordering.title': 'Menu',
    'ordering.rescan': 'Rescanner',
    'ordering.add': 'Ajouter',
    'ordering.totalItems': 'Articles',
    'ordering.viewOrder': 'Voir la commande',
    'summary.title': 'Commande',
    'summary.showStaff': 'Montrez cet écran au personnel',
    'summary.speechBubble': "Excusez-moi, je voudrais commander ceci.",
    'summary.speechSub': '(Excuse me, I would like to order this.)',
    'summary.total': 'Total',
    'summary.finish': 'Terminer',
  },
  'es-ES': {
    'upload.title': 'Escanear menú',
    'upload.subtitle': 'Toma fotos de todas las páginas. Las combinaremos en una lista.',
    'upload.camera': 'Cámara',
    'upload.gallery': 'Galería',
    'upload.analyze': 'Analizar',
    'upload.noImages': 'Sin imágenes',
    'upload.addPage': 'Añadir',
    'processing.title': 'Analizando...',
    'ordering.title': 'Menú',
    'ordering.rescan': 'Escanear de nuevo',
    'ordering.add': 'Añadir',
    'ordering.totalItems': 'Artículos',
    'ordering.viewOrder': 'Ver pedido',
    'summary.title': 'Lista de pedido',
    'summary.showStaff': 'Muestre esta pantalla al personal',
    'summary.speechBubble': 'Disculpe, me gustaría pedir esto.',
    'summary.speechSub': '(Excuse me, I would like to order this.)',
    'summary.total': 'Total',
    'summary.finish': 'Terminar',
  }
};

export const getTranslation = (langCode: string, key: string): string => {
  const lang = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];
  return lang[key] || TRANSLATIONS['en-US'][key] || key;
};

export const LOADING_STEPS: Record<string, string[]> = {
  'en-US': [
    "Identifying menu layout...",
    "Recognizing text...",
    "Translating items...",
    "Extracting prices...",
    "Organizing categories...",
  ],
  'zh-TW': [
    "正在識別菜單排版...",
    "正在辨識文字內容...",
    "正在翻譯菜色...",
    "正在擷取價格...",
    "正在分類整理...",
  ],
  'ja-JP': [
    "レイアウトを認識中...",
    "テキストを読み取り中...",
    "メニューを翻訳中...",
    "価格を抽出中...",
    "カテゴリーを整理中...",
  ],
  'ko-KR': [
    "메뉴 레이아웃 식별 중...",
    "텍스트 인식 중...",
    "메뉴 번역 중...",
    "가격 추출 중...",
    "카테고리 정리 중...",
  ],
  // Fallback for others
  'fr-FR': [
    "Analysis de la mise en page...",
    "Reconnaissance du texte...",
    "Traduction en cours...",
    "Extraction des prix...",
    "Organisation des catégories...",
  ],
  'es-ES': [
    "Identificando diseño...",
    "Reconociendo texto...",
    "Traduciendo artículos...",
    "Extrayendo precios...",
    "Organizando categorías...",
  ]
};
