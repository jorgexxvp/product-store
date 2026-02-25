import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './Layout';

vi.mock('@/presentation/common/components/Header', () => ({
  Header: () => <header data-testid="mock-header">HeaderMock</header>,
}));

describe('Layout Component', () => {
  it('renders Header and children properly', () => {
    render(
      <Layout>
        <div data-testid="mock-children">Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('wraps children in a main tag with correct accessibility elements', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabIndex', '-1');
  });
});
