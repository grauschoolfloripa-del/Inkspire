import React, { useState, useRef } from 'react';
import { GeneratedSet } from '../types';
import { Printer, Eye, Layers, Download, BookOpen, Info } from 'lucide-react';

interface ResultCardProps {
  set: GeneratedSet;
}

export const ResultCard: React.FC<ResultCardProps> = ({ set }) => {
  const [view, setView] = useState<'color' | 'stencil' | 'split'>('split');
  const printRef = useRef<HTMLImageElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Decalque - ${set.id}</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100vh; filter: contrast(150%); }
            </style>
          </head>
          <body>
            <img src="data:image/png;base64,${set.stencilImage}" />
            <script>
              window.onload = () => { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDownload = (base64: string, type: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64}`;
    link.download = `inkspire-${type}-${set.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-ink-800 rounded-xl overflow-hidden border border-ink-700 shadow-2xl mb-8">
      {/* Header Controls */}
      <div className="p-4 border-b border-ink-700 flex flex-wrap justify-between items-center gap-4">
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <span className="text-gold-500 font-bold uppercase tracking-wider">{set.style}</span>
          <span className="text-ink-700">•</span>
          <span>{set.viewLabel || 'Design Gerado'}</span>
        </div>
        
        <div className="flex gap-2 bg-ink-900 p-1 rounded-lg">
          <button 
            onClick={() => setView('color')}
            className={`p-2 rounded-md transition-colors ${view === 'color' ? 'bg-ink-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            title="Ver Colorido"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={() => setView('split')}
            className={`p-2 rounded-md transition-colors ${view === 'split' ? 'bg-ink-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            title="Visualização Dividida"
          >
            <Layers size={18} />
          </button>
          <button 
            onClick={() => setView('stencil')}
            className={`p-2 rounded-md transition-colors ${view === 'stencil' ? 'bg-ink-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            title="Ver Decalque (Stencil)"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Image Display */}
      <div className="relative aspect-video w-full bg-white/5 p-4 flex justify-center items-center">
        {view === 'color' && (
          <img src={`data:image/png;base64,${set.colorImage}`} alt="Design Colorido" className="max-h-[500px] object-contain shadow-lg rounded" />
        )}
        {view === 'stencil' && (
          <img src={`data:image/png;base64,${set.stencilImage}`} alt="Design Decalque" className="max-h-[500px] object-contain shadow-lg rounded grayscale contrast-125" />
        )}
        {view === 'split' && (
          <div className="flex w-full gap-4 h-full justify-center">
            <div className="flex-1 flex justify-center items-center bg-black/20 rounded-lg p-2">
              <img src={`data:image/png;base64,${set.colorImage}`} alt="Colorido" className="max-h-full max-w-full object-contain rounded" />
            </div>
            <div className="flex-1 flex justify-center items-center bg-white rounded-lg p-2">
               <img src={`data:image/png;base64,${set.stencilImage}`} alt="Decalque" className="max-h-full max-w-full object-contain filter grayscale contrast-125" />
            </div>
          </div>
        )}
      </div>

      {/* Description / Meaning Section */}
      {set.meaning && (
        <div className="px-6 py-5 bg-ink-900/50 border-t border-ink-700/50">
          <div className="flex items-start gap-3">
             <div className="bg-ink-800 p-2 rounded-lg text-gold-500 mt-1">
               <BookOpen size={18} />
             </div>
             <div>
               <h5 className="text-gold-500 font-serif text-sm font-bold uppercase tracking-wider mb-2">Conceito & Simbolismo</h5>
               <div 
                 className="text-gray-300 text-sm leading-relaxed prose prose-invert prose-sm max-w-none prose-strong:text-white prose-ul:list-disc prose-ul:pl-4"
                 dangerouslySetInnerHTML={{ __html: set.meaning }} 
               />
             </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-4 bg-ink-900 border-t border-ink-700 flex justify-between items-center">
        <div className="text-xs text-gray-500 truncate max-w-[30%] hidden sm:block">
          "{set.originalPrompt}"
        </div>
        <div className="flex gap-3 flex-wrap justify-end w-full sm:w-auto">
          <button 
            onClick={() => handleDownload(set.colorImage, 'color')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <Download size={14} /> Cor
          </button>
          <button 
            onClick={() => handleDownload(set.stencilImage, 'stencil')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <Download size={14} /> Decalque
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-md text-sm font-bold shadow-lg shadow-gold-900/20 transition-all"
          >
            <Printer size={16} /> IMPRIMIR DECALQUE
          </button>
        </div>
      </div>
    </div>
  );
};