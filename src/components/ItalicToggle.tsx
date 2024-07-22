import React from 'react';
import { Fonts } from '../types';
import './ItalicToggle.css'; // Make sure to create and import the CSS file

interface ItalicToggleProps {
  isItalic: boolean;
  onToggleItalic: () => void;
  fontFamily: string;
  fontWeight: string;
  fontsData: Fonts;
}

const ItalicToggle: React.FC<ItalicToggleProps> = ({ isItalic, onToggleItalic, fontFamily, fontWeight, fontsData }) => {
  const canToggleItalic = fontsData[fontFamily][`${fontWeight}italic`];

  return (
    <label className="switch">
      <input 
        type="checkbox" 
        checked={isItalic} 
        onChange={onToggleItalic} 
        disabled={!canToggleItalic} 
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ItalicToggle;
