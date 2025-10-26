import React, { useRef } from 'react';
import { MemeImage } from '../types';
import { BATTLEFIELD_MEME_TEMPLATES } from '../constants';
import { UploadIcon } from './icons';

interface ImageSelectorProps {
  onImageSelect: (image: MemeImage) => void;
  selectedImageId?: string;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect, selectedImageId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect({
          id: `uploaded-${Date.now()}`,
          src: e.target?.result as string,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-bf-gray-800 rounded-lg p-6 border border-bf-gray-700">
      <h2 className="text-2xl font-teko tracking-wider uppercase text-gray-200 mb-4">1. Wähle ein Bild</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <button
          onClick={handleUploadClick}
          className="group rounded-md flex flex-col items-center justify-center bg-bf-gray-700 border-2 border-dashed border-bf-gray-600 hover:border-bf-orange transition-colors duration-200 aspect-square"
        >
          <UploadIcon className="w-10 h-10 text-gray-400 group-hover:text-bf-orange transition-colors duration-200" />
          <span className="mt-2 text-sm font-semibold text-gray-300">Eigenes Bild hochladen</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {BATTLEFIELD_MEME_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onImageSelect(template)}
            className={`group rounded-md overflow-hidden relative border-2 transition-all duration-200 ${selectedImageId === template.id ? 'border-bf-orange' : 'border-transparent hover:border-bf-gray-600'}`}
          >
            <img
              src={template.src}
              alt={template.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <span className="absolute bottom-2 left-3 font-teko text-xl text-white tracking-wide uppercase">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
