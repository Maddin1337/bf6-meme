import React, { useState } from 'react';
import { MagicWandIcon, EditIcon } from './icons';
import { Loader } from './Loader';

interface ControlPanelProps {
  onGenerateCaptions: () => void;
  onEditImage: (prompt: string) => void;
  captions: string[];
  onCaptionSelect: (caption: string) => void;
  selectedCaption: string;
  isLoadingCaptions: boolean;
  isLoadingEdit: boolean;
  hasImage: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onGenerateCaptions,
  onEditImage,
  captions,
  onCaptionSelect,
  selectedCaption,
  isLoadingCaptions,
  isLoadingEdit,
  hasImage,
}) => {
  const [editPrompt, setEditPrompt] = useState('');

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPrompt.trim()) {
      onEditImage(editPrompt);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-bf-gray-800 rounded-lg p-6 border border-bf-gray-700">
        <h2 className="text-2xl font-teko tracking-wider uppercase text-gray-200 mb-4">2. Magische Bildunterschrift</h2>
        <button
          onClick={onGenerateCaptions}
          disabled={!hasImage || isLoadingCaptions || isLoadingEdit}
          className="w-full flex items-center justify-center px-4 py-3 bg-bf-orange text-black font-bold font-teko text-xl rounded-md shadow-md hover:bg-orange-500 disabled:bg-bf-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 uppercase tracking-wider"
        >
          {isLoadingCaptions ? <Loader /> : <><MagicWandIcon className="w-6 h-6 mr-2" /> Bildunterschriften generieren</>}
        </button>
        {captions.length > 0 && (
          <div className="mt-4 space-y-2">
            {captions.map((caption, index) => (
              <button
                key={index}
                onClick={() => onCaptionSelect(caption)}
                className={`w-full text-left p-3 rounded-md transition-colors duration-200 text-sm ${selectedCaption === caption ? 'bg-bf-orange text-black font-semibold' : 'bg-bf-gray-700 hover:bg-bf-gray-600 text-gray-200'}`}
              >
                "{caption}"
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-bf-gray-800 rounded-lg p-6 border border-bf-gray-700">
        <h2 className="text-2xl font-teko tracking-wider uppercase text-gray-200 mb-4">3. KI-Bildbearbeitung</h2>
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <input
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="z.B. 'Füge einen Retro-Filter hinzu'"
            disabled={!hasImage || isLoadingCaptions || isLoadingEdit}
            className="w-full bg-bf-gray-700 border border-bf-gray-600 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:ring-bf-orange focus:border-bf-orange transition-colors duration-200 font-sans disabled:bg-bf-gray-800 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!hasImage || !editPrompt.trim() || isLoadingCaptions || isLoadingEdit}
            className="w-full flex items-center justify-center px-4 py-3 bg-bf-blue text-white font-bold font-teko text-xl rounded-md shadow-md hover:bg-sky-600 disabled:bg-bf-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 uppercase tracking-wider"
          >
            {isLoadingEdit ? <Loader /> : <><EditIcon className="w-6 h-6 mr-2" /> Bild bearbeiten</>}
          </button>
        </form>
      </div>
    </div>
  );
};
