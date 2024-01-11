import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

jest.mock('axios');

describe('AppFunctional component', () => {
  test('renders without crashing', () => {
    render(<AppFunctional />);
  });

  test('moves left when left button is clicked', () => {
    render(<AppFunctional />);
    fireEvent.click(screen.getByText('LEFT'));
    expect(screen.getByText('Coordinates (1,2)')).toBeInTheDocument();
  });

  test('resets the state when reset button is clicked', () => {
    render(<AppFunctional />);
    fireEvent.click(screen.getByText('LEFT')); 
    fireEvent.click(screen.getByText('reset'));
    expect(screen.getByText('Coordinates (2,2)')).toBeInTheDocument();
    expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
  });

  test('displays "B" at the correct position on the grid', () => {
    render(<AppFunctional />);
    expect(screen.getByText('B')).toBeInTheDocument();
    fireEvent.click(screen.getByText('RIGHT'));
    expect(screen.getByText('B')).toBeInTheDocument();
    fireEvent.click(screen.getByText('DOWN'));
    expect(screen.getByText('B')).toBeInTheDocument();
  });
  test('displays "B" at the correct position on the grid', () => {
    render(<AppFunctional />);
    expect(screen.getByText('B')).toBeInTheDocument();
    fireEvent.click(screen.getByText('RIGHT'));
    expect(screen.getByText('B')).toBeInTheDocument();
    fireEvent.click(screen.getByText('DOWN'));
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});