import React, { useRef, useEffect } from 'react';
import { MemeImage } from '../types';
import { DownloadIcon } from './icons';

interface MemeCanvasProps {
  image: MemeImage | null;
  caption: string;
}

export const MemeCanvas: React.FC<MemeCanvasProps> = ({ image, caption }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    if (!ctx || !container) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image.src;
    img.onload = () => {
      const containerWidth = container.clientWidth;
      const scale = containerWidth / img.width;
      canvas.width = containerWidth;
      canvas.height = img.height * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (caption) {
        const fontSize = canvas.width * 0.08;
        ctx.font = `bold ${fontSize}px Impact, sans-serif`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize * 0.05;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        const text = caption.toUpperCase();
        const x = canvas.width / 2;
        const maxWidth = canvas.width * 0.9;
        const lineHeight = fontSize * 1.1;

        // --- Text Wrapping Logic ---
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        // --- Drawing Logic (from bottom up) ---
        let y = canvas.height - (canvas.height * 0.05); 

        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          ctx.strokeText(line, x, y);
          ctx.fillText(line, x, y);
          y -= lineHeight;
        }
      }
    };
  }, [image, caption]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const link = document.createElement('a');
    link.download = `${image.name.split('.')[0]}-meme.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="relative w-full bg-bf-gray-800 rounded-lg overflow-hidden shadow-lg border border-bf-gray-700 min-h-[300px] flex items-center justify-center">
        {image ? (
          <canvas ref={canvasRef} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="font-teko text-3xl text-gray-500 uppercase tracking-widest">Warte auf Bildauswahl</p>
          </div>
        )}
      </div>
      {image && (
        <button 
          onClick={handleDownload}
          className="w-full flex items-center justify-center px-4 py-3 bg-bf-blue text-white font-bold font-teko text-xl rounded-md shadow-md hover:bg-sky-600 disabled:bg-bf-gray-600 transition-colors duration-200 uppercase tracking-wider"
        >
          <DownloadIcon className="w-6 h-6 mr-2" />
          Meme herunterladen
        </button>
      )}
    </div>
  );
};