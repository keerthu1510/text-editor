// Import the necessary module to load the font
const loadFont = (fontFamily: string, fontUrl: string) => {
  const font = new FontFace(fontFamily, `url(${fontUrl})`);
  
  font.load().then((loadedFontFace) => {
    document.fonts.add(loadedFontFace);
    console.log(`Font ${fontFamily} loaded and added to document.`);
  }).catch((error) => {
    console.error(`Failed to load font ${fontFamily} from ${fontUrl}:`, error);
  });
};

export default loadFont;
