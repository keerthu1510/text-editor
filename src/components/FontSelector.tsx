import React from 'react';

interface FontSelectorProps {
  fonts: string[];
  selectedFontFamily: string;
  onFontFamilyChange: (fontFamily: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, selectedFontFamily, onFontFamilyChange }) => {
  return (
    <select value={selectedFontFamily} onChange={(e) => onFontFamilyChange(e.target.value)}>
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;
