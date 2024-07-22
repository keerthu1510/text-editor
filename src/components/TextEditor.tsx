import React, { useState, useEffect } from 'react';
import './TextEditor.css';
import FontSelector from './FontSelector';
import FontWeightSelector from './FontWeightSelector';
import ItalicToggle from './ItalicToggle';
import fontsDataJson from '../Fonts.json';
import { Fonts } from '../types';
import loadFont from './fontLoder';

const fontsData: Fonts = fontsDataJson as Fonts;

const getClosestFontVariant = (fontFamily: string, fontWeight: string, isItalic: boolean): string => {
  const availableVariants = Object.keys(fontsData[fontFamily]);
  const targetVariant = isItalic ? `${fontWeight}italic` : fontWeight;

  if (availableVariants.includes(targetVariant)) {
    return targetVariant;
  }

  const weights = availableVariants.filter(variant => !variant.includes('italic')).map(variant => parseInt(variant));
  const closestWeight = weights.reduce((prev, curr) => Math.abs(curr - parseInt(fontWeight)) < Math.abs(prev - parseInt(fontWeight)) ? curr : prev);
  const closestVariant = isItalic ? `${closestWeight}italic` : `${closestWeight}`;
  
  return closestVariant;
};

const sanitizeEditorState = (state: any): { text: string, fontFamily: string, fontWeight: string, isItalic: boolean } => {
  const defaultFontFamily = 'Alata';
  const defaultFontWeight = '400';
  const defaultIsItalic = false;

  const fontFamily = fontsData[state.fontFamily] ? state.fontFamily : defaultFontFamily;
  const closestVariant = getClosestFontVariant(fontFamily, state.fontWeight || defaultFontWeight, state.isItalic || defaultIsItalic);
  const fontWeight = closestVariant.replace('italic', '');
  const isItalic = closestVariant.includes('italic');

  return {
    text: state.text || '',
    fontFamily,
    fontWeight,
    isItalic,
  };
};

const TextEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('Alata');
  const [fontWeight, setFontWeight] = useState('400');
  const [isItalic, setIsItalic] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('textEditorState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        const sanitizedState = sanitizeEditorState(parsedState);
        setText(sanitizedState.text);
        setFontFamily(sanitizedState.fontFamily);
        setFontWeight(sanitizedState.fontWeight);
        setIsItalic(sanitizedState.isItalic);
        const fontUrl = fontsData[sanitizedState.fontFamily][sanitizedState.fontWeight];
        loadFont(sanitizedState.fontFamily, fontUrl);
      } catch (error) {
        console.error('Error parsing saved state:', error);
      }
    } else {
      const fontUrl = fontsData[fontFamily]['400'];
      loadFont(fontFamily, fontUrl);
    }
  }, []);

  useEffect(() => {
    const editorState = {
      text,
      fontFamily,
      fontWeight,
      isItalic,
    };
    localStorage.setItem('textEditorState', JSON.stringify(editorState));
  }, [text, fontFamily, fontWeight, isItalic]);

  const handleFontFamilyChange = (newFontFamily: string) => {
    const closestVariant = getClosestFontVariant(newFontFamily, fontWeight, isItalic);
    const fontUrl = fontsData[newFontFamily][closestVariant];
    loadFont(newFontFamily, fontUrl);
    setFontFamily(newFontFamily);
    setFontWeight(closestVariant.replace('italic', ''));
    setIsItalic(closestVariant.includes('italic'));
  };

  const handleFontWeightChange = (newFontWeight: string) => {
    const closestVariant = getClosestFontVariant(fontFamily, newFontWeight, isItalic);
    const fontUrl = fontsData[fontFamily][closestVariant];
    loadFont(fontFamily, fontUrl);
    setFontWeight(closestVariant.replace('italic', ''));
    setIsItalic(closestVariant.includes('italic'));
  };

  const handleToggleItalic = () => {
    const closestVariant = getClosestFontVariant(fontFamily, fontWeight, !isItalic);
    const fontUrl = fontsData[fontFamily][closestVariant];
    loadFont(fontFamily, fontUrl);
    setIsItalic(!isItalic);
  };

  const handleSave = () => {
    const editorState = {
      text,
      fontFamily,
      fontWeight,
      isItalic,
    };
    localStorage.setItem('textEditorState', JSON.stringify(editorState));
    alert('Text editor state saved!');
  };

  const handleReset = () => {
    setText('');
    setFontFamily('Alata');
    setFontWeight('400');
    setIsItalic(false);
    localStorage.removeItem('textEditorState');
    alert('Text editor state reset!');
  };

  return (
    <div className="container">
      <h1 className="heading">Text Editor</h1>
      <div className="editor-container">
        <div className="textarea-container">
          <textarea
            style={{
              fontFamily: `${fontFamily}, sans-serif`,
              fontWeight,
              fontStyle: isItalic ? 'italic' : 'normal',
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="selectors-container">
          <div className="selector">
            <label>Font Family</label>
            <FontSelector
              fonts={Object.keys(fontsData)}
              selectedFontFamily={fontFamily}
              onFontFamilyChange={handleFontFamilyChange}
            />
          </div>
          <div className="selector">
            <label>Font Weight</label>
            <FontWeightSelector
              fontWeights={Object.keys(fontsData[fontFamily])}
              selectedFontWeight={fontWeight}
              onFontWeightChange={handleFontWeightChange}
            />
          </div>
          <div className="selector">
            <label>Italic</label>
            <ItalicToggle
              isItalic={isItalic}
              onToggleItalic={handleToggleItalic}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
              fontsData={fontsData}
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TextEditor;
