import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom'; // Direkter Import hier auch

// Mocke die SVG-Imports
jest.mock('../assets/react.svg', () => 'react-svg');
jest.mock('/vite.svg', () => 'vite-svg');

describe('App Component', () => {
  test('rendert die Überschrift korrekt', () => {
    render(<App />);
    
    const headingElement = screen.getByText('Vite + React');
    expect(headingElement).toBeInTheDocument();
  });
  
  test('rendert den Zähler mit Initialwert 0', () => {
    render(<App />);
    
    const buttonElement = screen.getByText(/count is 0/i);
    expect(buttonElement).toBeInTheDocument();
  });
  
  test('enthält Links zu Vite und React', () => {
    render(<App />);
    
    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    const reactLink = screen.getByRole('link', { name: /react logo/i });
    
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
  });
});