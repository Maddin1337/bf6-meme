import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageSelector } from './components/ImageSelector';
import { MemeCanvas } from './components/MemeCanvas';
import { ControlPanel } from './components/ControlPanel';
import { MemeImage } from './types';
import * as geminiService from './services/geminiService';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<MemeImage | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string>('');
  const [isLoadingCaptions, setIsLoadingCaptions] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageSrcToParts = async (src: string): Promise<{ base64: string; mimeType: string; }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Failed to get canvas context'));
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const base64 = dataUrl.split(',')[1];
        resolve({ base64, mimeType });
      };
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  const handleImageSelect = (image: MemeImage) => {
    setSelectedImage(image);
    setCaptions([]);
    setSelectedCaption('');
    setError(null);
  };
  
  const handleGenerateCaptions = useCallback(async () => {
    if (!selectedImage) return;
    setIsLoadingCaptions(true);
    setError(null);
    setCaptions([]);
    try {
      const { base64, mimeType } = await imageSrcToParts(selectedImage.src);
      const generatedCaptions = await geminiService.generateCaptions(base64, mimeType);
      setCaptions(generatedCaptions);
    } catch (e) {
      console.error(e);
      setError('Fehler beim Generieren der Bildunterschriften. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoadingCaptions(false);
    }
  }, [selectedImage]);

  const handleEditImage = useCallback(async (prompt: string) => {
    if (!selectedImage) return;
    setIsLoadingEdit(true);
    setError(null);
    try {
      const { base64, mimeType } = await imageSrcToParts(selectedImage.src);
      const editedImageBase64 = await geminiService.editImage(base64, mimeType, prompt);
      const newSrc = `data:image/png;base64,${editedImageBase64}`;
      setSelectedImage(prev => ({
        ...prev!,
        src: newSrc,
        id: `edited-${Date.now()}`
      }));
      setCaptions([]);
    } catch (e) {
      console.error(e);
      setError('Fehler beim Bearbeiten des Bildes. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoadingEdit(false);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-bf-black text-white font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ImageSelector 
            onImageSelect={handleImageSelect} 
            selectedImageId={selectedImage?.id}
          />
          
          {error && (
            <div className="my-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <MemeCanvas image={selectedImage} caption={selectedCaption} />
            </div>
            <div className="lg:col-span-2">
              <ControlPanel
                onGenerateCaptions={handleGenerateCaptions}
                onEditImage={handleEditImage}
                captions={captions}
                onCaptionSelect={setSelectedCaption}
                selectedCaption={selectedCaption}
                isLoadingCaptions={isLoadingCaptions}
                isLoadingEdit={isLoadingEdit}
                hasImage={!!selectedImage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
