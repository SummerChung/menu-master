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
      {/* Header - Compact */}
      <header className="flex-none p-4 pt-4 flex items-center relative z-10">
        <button
          onClick={onBack}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-stone-700 mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
             <h2 className="text-xl font-bold text-stone-800 leading-tight">{t('upload.title')}</h2>
             <p className="text-stone-500 text-xs leading-tight line-clamp-1">
                {t('upload.subtitle')}
            </p>
        </div>
      </header>

      {/* Main Content - Flex Grow to take available space */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 w-full">
        {/* Image Preview Grid */}
        <div className="h-full">
            {selectedFiles.length === 0 ? (
                <div className="h-full min-h-[300px] border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center text-stone-400 bg-stone-100/50">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-sm">{t('upload.noImages')}</span>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 pb-4">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-stone-200 group bg-white">
                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors backdrop-blur-sm"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                    {/* Placeholder to suggest adding more */}
                    <button onClick={triggerCamera} className="aspect-[3/4] rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors bg-white">
                        <Plus className="w-8 h-8 mb-1" />
                        <span className="text-xs">{t('upload.addPage')}</span>
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Action Area - Fixed at bottom */}
      <div className="flex-none p-4 pb-6 bg-white rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] space-y-3 z-20">
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
                className="bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 h-24"
                >
                <Camera className="w-8 h-8 mb-1" />
                <span className="font-semibold text-sm">{t('upload.camera')}</span>
                </button>
                
                <button
                onClick={triggerGallery}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 py-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 h-24"
                >
                <ImageIcon className="w-8 h-8 mb-1" />
                <span className="font-semibold text-sm">{t('upload.gallery')}</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;