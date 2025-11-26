import React from 'react';
import { TattooStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: TattooStyle;
  onSelect: (style: TattooStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {Object.values(TattooStyle).map((style) => (
        <button
          key={style}
          onClick={() => onSelect(style)}
          className={`
            px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border
            ${selectedStyle === style 
              ? 'bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20' 
              : 'bg-ink-800 text-gray-400 border-ink-700 hover:border-gray-500 hover:text-gray-200'
            }
          `}
        >
          {style}
        </button>
      ))}
    </div>
  );
};