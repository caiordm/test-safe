import { render, screen, fireEvent } from '@testing-library/svelte';
import Login from '../../../../src/routes/login/+page.svelte';

describe('Login Page - Renderização', () => {
  it('Deve exibir o botão de login', () => {
    render(Login);
    
    // Verifica se o botão "Entrar" está presente
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('Deve exibir o texto "Carregando..." ao enviar o formulário', async () => {
    render(Login);
    
    // Enviar o formulário (simulando a digitação de dados)
    fireEvent.input(screen.getByPlaceholderText('Nome do usuário'), { target: { value: 'usuario' } });
    fireEvent.input(screen.getByPlaceholderText('Senha'), { target: { value: 'senha' } });
    
    fireEvent.click(screen.getByText('Entrar'));
    
    // Espera pelo texto "Carregando..."
    expect(await screen.findByText('Carregando...')).toBeInTheDocument();
  });
});
