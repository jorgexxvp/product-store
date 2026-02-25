import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomInput } from './CustomInput';

describe('Componente CustomInput', () => {
  it('se renderiza correctamente con las propiedades por defecto', () => {
    render(<CustomInput placeholder="Marcador de posición de prueba" />);

    const input = screen.getByPlaceholderText('Marcador de posición de prueba');
    expect(input).toBeInTheDocument();
  });

  it('renderiza el icono si se proporciona uno', () => {
    const urlIcono = 'test-icon.svg';
    const { container } = render(<CustomInput icon={urlIcono} placeholder="Buscar" />);

    const imagen = container.querySelector('img');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', urlIcono);
  });

  it('el icono tiene aria-hidden="true" para no interrumpir lectores de pantalla', () => {
    const { container } = render(<CustomInput icon="test-icon.svg" placeholder="Buscar" />);

    const imagen = container.querySelector('img');
    expect(imagen).toHaveAttribute('aria-hidden', 'true');
  });

  it('renderiza un label asociado cuando se proporcionan label e id', () => {
    render(<CustomInput id="busqueda" label="Buscar productos" placeholder="Buscar" />);

    const label = screen.getByText('Buscar productos');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'busqueda');

    const input = screen.getByPlaceholderText('Buscar');
    expect(input).toHaveAttribute('id', 'busqueda');
  });

  it('no renderiza label si no se proporciona la prop label', () => {
    render(<CustomInput id="busqueda" placeholder="Buscar" />);

    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('llama al manejador onChange cuando se escribe en él', () => {
    const manejarCambio = vi.fn();
    render(<CustomInput placeholder="Escribe aquí" onChange={manejarCambio} />);

    const input = screen.getByPlaceholderText('Escribe aquí');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(manejarCambio).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe('test');
  });
});
