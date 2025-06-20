import { render, screen } from '@testing-library/react';
import Login from './page';

describe('Login', () => {
  test('renderiza o título da página de login', () => {
    render(<Login />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renderiza campo de e-mail', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
  });

  test('renderiza campo de senha', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });

  test('botão de login está presente', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});
