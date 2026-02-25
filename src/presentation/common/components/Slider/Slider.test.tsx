import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('renders children correctly', () => {
    render(
      <Slider>
        <div data-testid="slide-1">Slide 1</div>
        <div data-testid="slide-2">Slide 2</div>
      </Slider>,
    );
    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
  });

  it('can trigger drag events without crashing', () => {
    const { container } = render(
      <Slider>
        <div>Content</div>
      </Slider>,
    );

    const sliderContainer = container.firstChild?.firstChild as HTMLElement;

    fireEvent.mouseDown(sliderContainer, { pageX: 100 });
    expect(sliderContainer.className).toContain('cursor-grabbing');

    fireEvent.mouseMove(sliderContainer, { pageX: 50 });

    fireEvent.mouseUp(sliderContainer);
    expect(sliderContainer.className).not.toContain('cursor-grabbing');
  });
});
