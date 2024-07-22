# Text Editor

This is a simple text editor application that allows users to change the font family, font weight, and toggle italic styles. The editor state is saved in the browser's local storage so that the user's settings persist even after the page is reloaded.

## Features

- **Change Font Family:** Users can select a font family from a predefined list.
- **Change Font Weight:** Users can choose the font weight for the selected font family.
- **Toggle Italic Style:** Users can toggle the italic style for the text.
- **Persistent State:** The editor's state (text, font family, font weight, and italic style) is saved in local storage and persists even after the page is reloaded.
- **Save and Reset:** Users can manually save the current state and reset the editor to its default settings.

## Usage
 - **Typing Text:** Start typing in the text area.
 - **Selecting Font Family:** Use the dropdown menu to select a font family.
 - **Selecting Font Weight:** Use the dropdown menu to select a font weight.
 - **Toggling Italic Style:** Click the italic button to toggle the italic style.
 - **Saving State:** Click the "Save" button to save the current state to local storage.
 - **Resetting State:** Click the "Reset" button to clear the text and reset the font settings to default.
 - **Page Reload:** Reload the page to see the saved state persist with the last entered text and selected font settings.

## Implementation Details:

## TextEditor Component
 -**State Management:** The component uses useState to manage the text, font family, font weight, and italic style.
 -**Local Storage:** useEffect is used to load the saved state from local storage on initial render and save the state to local storage whenever it changes.
 -**Font Loading:** The loadFont utility function is used to dynamically load the selected font.
 -**State Sanitization:** The sanitizeEditorState function ensures the loaded state is valid and falls back to default values if necessary.
 -**Closest Font Variant:** The getClosestFontVariant function determines the closest available font variant when a selected variant is not available.

## Additional Functionalities
**Save Function:** Saves the current state to local storage and displays an alert.
**Reset Function:** Resets the editor to the default state and removes the saved state from local storage.
