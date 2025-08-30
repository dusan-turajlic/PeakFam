import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('PeakFam')).toBeInTheDocument();
  });

  it('displays initial calorie count of 0', () => {
    render(<App />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments calories when +100 button is clicked', () => {
    render(<App />);
    const addButton = screen.getByText('+100');
    fireEvent.click(addButton);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('increments calories when +200 button is clicked', () => {
    render(<App />);
    const addButton = screen.getByText('+200');
    fireEvent.click(addButton);
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('resets calories to 0 when reset button is clicked', () => {
    render(<App />);
    const addButton = screen.getByText('+100');
    const resetButton = screen.getByText('Reset');
    
    fireEvent.click(addButton);
    expect(screen.getByText('100')).toBeInTheDocument();
    
    fireEvent.click(resetButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
