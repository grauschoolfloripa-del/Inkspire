import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Move } from 'lucide-react';

interface BodyTryOnProps {
  tattooBase64: string;
}

export const BodyTryOn: React.FC<BodyTryOnProps> = ({ tattooBase64 }) => {
  const [background, setBackground] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(0.8);
  const [blendMode, setBlendMode] = useState<any>('multiply');
  
  // Position state for the tattoo overlay
  const [position, setPosition] = useState({ x: 50, y: 50 }); // percentages
  const [scale, setScale] = useState(30); // percentage width
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackground(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x, y });
  };

  return (
    <div className="bg-ink-800 rounded-xl p-4 border border-ink-700 mt-4">
        <h3 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
            <Move size={18} className="text-gold-500"/> Provador Virtual
        </h3>
        
        {!background ? (
            <div className="border-2 border-dashed border-ink-600 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-gold-500/50 transition-colors cursor-pointer relative">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-gray-300 font-medium">Carregar Foto do Corpo</p>
                <p className="text-gray-500 text-xs mt-1">Tire uma foto do braço, perna ou costas</p>
            </div>
        ) : (
            <div className="space-y-4">
                <div 
                    ref={containerRef}
                    className="relative w-full aspect-[3/4] md:aspect-video bg-black rounded-lg overflow-hidden cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Background Body Image */}
                    <img 
                        src={background} 
                        alt="Corpo" 
                        className="absolute inset-0 w-full h-full object-cover" 
                    />

                    {/* Tattoo Overlay */}
                    <div 
                        onMouseDown={handleMouseDown}
                        style={{ 
                            position: 'absolute',
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            width: `${scale}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: opacity,
                            mixBlendMode: blendMode
                        }}
                        className="cursor-move group"
                    >
                        <img 
                            src={`data:image/png;base64,${tattooBase64}`} 
                            alt="Sobreposição Tattoo"
                            className="w-full h-auto pointer-events-none" 
                        />
                        {/* Scale Handle visual indicator */}
                        <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-all rounded"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Tamanho</label>
                        <input 
                            type="range" 
                            min="5" 
                            max="80" 
                            value={scale} 
                            onChange={(e) => setScale(Number(e.target.value))}
                            className="w-full accent-gold-500 h-2 bg-ink-900 rounded-lg appearance-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Opacidade</label>
                        <input 
                            type="range" 
                            min="0.1" 
                            max="1" 
                            step="0.05"
                            value={opacity} 
                            onChange={(e) => setOpacity(Number(e.target.value))}
                            className="w-full accent-gold-500 h-2 bg-ink-900 rounded-lg appearance-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Modo de Mistura</label>
                        <select 
                            value={blendMode} 
                            onChange={(e) => setBlendMode(e.target.value)}
                            className="w-full bg-ink-900 border border-ink-600 rounded text-sm p-1 text-gray-300"
                        >
                            <option value="multiply">Multiplicação (Realista)</option>
                            <option value="normal">Normal</option>
                            <option value="darken">Escurecer</option>
                            <option value="overlay">Sobrepor</option>
                        </select>
                    </div>
                </div>
                
                <button 
                    onClick={() => setBackground(null)}
                    className="w-full py-2 flex items-center justify-center gap-2 text-sm text-red-400 hover:bg-red-900/20 rounded transition-colors"
                >
                    <X size={14} /> Remover Foto
                </button>
            </div>
        )}
    </div>
  );
};