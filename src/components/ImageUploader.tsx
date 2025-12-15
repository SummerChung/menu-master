import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, ArrowLeft, X, Check, Plus } from 'lucide-react';
import { getTranslation } from '../translations';

interface Props {
  onBack: () => void;
  onImagesConfirmed: (files: File[]) => void;
  langCode: string;
}

const ImageUploader: React.FC<Props> = ({ onBack, onImagesConfirmed, langCode }) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Create local URLs for previewing images
  const previewUrls = React.useMemo(() => {
    return selectedFiles.map(file => URL.createObjectURL(file));
  }, [selectedFiles]);

  // Clean up URLs to avoid memory leaks
  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Append new files to existing ones
      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
    // Reset input so same file can be selected again if needed
    if (e.target) e.target.value = '';
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerCamera = () => cameraInputRef.current?.click();
  const triggerGallery = () => galleryInputRef.current?.click();

  const handleConfirm = () => {
    if (selectedFiles.length > 0) {
      onImagesConfirmed(selectedFiles);
    }
  };

  const t = (key: string) => getTranslation(langCode, key);

  return (
    <div className="flex flex-col h-[100dvh] bg-[#fafaf9] relative overflow-hidden">
      {/* Header */}
      <header className="flex-none p-4 pt-6 flex items-center relative z-10">
        <button
          onClick={onBack}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-stone-700 mr-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
             <h2 className="text-xl font-bold text-stone-800 leading-tight">{t('upload.title')}</h2>
             <p className="text-stone-500 text-xs leading-tight line-clamp-1 mt-0.5">
                {t('upload.subtitle')}
            </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-hidden flex flex-col relative">
        {selectedFiles.length === 0 ? (
            // Empty State: Centered, no scrolling needed
            <div className="flex-1 flex flex-col items-center justify-center p-8 pb-12">
                <div className="w-full max-w-[260px] aspect-[3/4] border-2 border-dashed border-stone-300 rounded-3xl flex flex-col items-center justify-center text-stone-400 bg-stone-50/50">
                    <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
                    <span className="text-sm font-medium opacity-60">{t('upload.noImages')}</span>
                </div>
            </div>
        ) : (
            // List State: Scrollable when content exceeds height
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-stone-200 group bg-white">
                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors backdrop-blur-sm"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                    {/* Add more button */}
                    <button onClick={triggerCamera} className="aspect-[3/4] rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-50 transition-colors bg-white/50">
                        <Plus className="w-6 h-6 mb-1 opacity-60" />
                        <span className="text-xs font-medium">{t('upload.addPage')}</span>
                    </button>
                </div>
            </div>
        )}
      </div>

      {/* Action Area - Fixed at bottom */}
      <div className="flex-none p-4 pb-8 bg-white rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] space-y-3 z-20">
        {/* Hidden Inputs */}
        <input
            type="file"
            accept="image/*"
            ref={cameraInputRef}
            onChange={handleFileChange}
            className="hidden"
            capture="environment"
        />
        <input
            type="file"
            accept="image/*"
            ref={galleryInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
        />

        {selectedFiles.length > 0 ? (
            <button
                onClick={handleConfirm}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white text-lg font-bold py-4 rounded-2xl shadow-lg shadow-amber-200/50 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
                <Check className="w-6 h-6" />
                <span>{t('upload.analyze')} ({selectedFiles.length})</span>
            </button>
        ) : (
            <div className="grid grid-cols-2 gap-3">
                <button
                onClick={triggerCamera}
                className="bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 h-20"
                >
                <Camera className="w-7 h-7 mb-1" />
                <span className="font-semibold text-sm">{t('upload.camera')}</span>
                </button>
                
                <button
                onClick={triggerGallery}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 py-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 h-20"
                >
                <ImageIcon className="w-7 h-7 mb-1" />
                <span className="font-semibold text-sm">{t('upload.gallery')}</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;