import React from 'react';

interface FontWeightSelectorProps {
  fontWeights: string[];
  selectedFontWeight: string;
  onFontWeightChange: (fontWeight: string) => void;
}

const FontWeightSelector: React.FC<FontWeightSelectorProps> = ({ fontWeights, selectedFontWeight, onFontWeightChange }) => {
  // Exclude specific italic weights
  const filteredFontWeights = fontWeights.filter(weight => !weight.includes('italic'));

  return (
    <select value={selectedFontWeight} onChange={(e) => onFontWeightChange(e.target.value)}>
      {filteredFontWeights.map((weight) => (
        <option key={weight} value={weight}>
          {weight}
        </option>
      ))}
    </select>
  );
};

export default FontWeightSelector;
