// jest.setup.ts
import '@testing-library/jest-dom'; // Dies fügt die toBeInTheDocument() und andere Matcher hinzu

// Wenn du window.matchMedia in deinen Komponenten verwendest
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// React 19 spezifische Konfiguration
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    // Stelle sicher, dass wir die neuesten React-Features korrekt mocken
    useId: jest.fn(() => 'mocked-id-123'),
  };
});

// Füge eine Meldung hinzu, um zu verifizieren, dass diese Datei geladen wird
console.log('Jest setup file has been loaded!');
