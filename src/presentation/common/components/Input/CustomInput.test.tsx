import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomInput } from './CustomInput';

describe('CustomInput', () => {
  it('renders correctly with default props', () => {
    render(<CustomInput placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
  });

  it('renders the icon if provided', () => {
    const iconUrl = 'test-icon.svg';
    const { container } = render(<CustomInput icon={iconUrl} placeholder="Search" />);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', iconUrl);
  });

  it('calls onChange handler when typed into', () => {
    const handleChange = vi.fn();
    render(<CustomInput placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Type here');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe('test');
  });
});
