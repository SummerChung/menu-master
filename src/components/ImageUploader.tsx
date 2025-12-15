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
    <div className="flex flex-col h-full bg-[#fafaf9] min-h-screen relative">
      <header className="absolute top-0 left-0 w-full p-4 z-10 flex items-center">
        <button
          onClick={onBack}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-stone-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 flex flex-col p-6 pt-20">
        <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-stone-800">{t('upload.title')}</h2>
            <p className="text-stone-500 text-sm max-w-xs mx-auto leading-relaxed">
                {t('upload.subtitle')}
            </p>
        </div>

        {/* Image Preview Grid */}
        <div className="flex-1 overflow-y-auto mb-6">
            {selectedFiles.length === 0 ? (
                <div className="h-64 border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center text-stone-400 bg-stone-100/50">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-sm">{t('upload.noImages')}</span>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-stone-200 group">
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
                    <button onClick={triggerCamera} className="aspect-[3/4] rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors">
                        <Plus className="w-8 h-8 mb-1" />
                        <span className="text-xs">{t('upload.addPage')}</span>
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Action Area */}
      <div className="p-6 bg-white rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] space-y-4">
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
            <div className="grid grid-cols-2 gap-4">
                <button
                onClick={triggerCamera}
                className="bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-transform active:scale-95"
                >
                <Camera className="w-6 h-6" />
                <span className="font-semibold">{t('upload.camera')}</span>
                </button>
                
                <button
                onClick={triggerGallery}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 py-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 transition-transform active:scale-95"
                >
                <ImageIcon className="w-6 h-6" />
                <span className="font-semibold">{t('upload.gallery')}</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;