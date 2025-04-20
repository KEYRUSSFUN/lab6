import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MyButton from './MyButton';

describe('Компонент моей кнопки', () => {
  it('Рендерится с текстом', () => {
    render(<MyButton>Click me</MyButton>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  it('Вызывается при клике когда активна', () => {
    const handleClick = vi.fn();
    render(<MyButton onClick={handleClick}>Click me</MyButton>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Не вызывается при клике когда неактивна', () => {
    const handleClick = vi.fn();
    render(<MyButton onClick={handleClick} disabled>Click me</MyButton>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).not.toHaveBeenCalled();
  });
});