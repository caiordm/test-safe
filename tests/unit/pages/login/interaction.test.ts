import { render, screen, fireEvent } from "@testing-library/svelte";
import Login from '../../../../src/routes/login/+page.svelte';

describe("Login Page - Interação", () => {
    test("Deve permitir digitar nome de usuário e senha", async () => {
        render(Login);

        const usernameInput = screen.getByPlaceholderText("Nome do usuário");
        const passwordInput = screen.getByPlaceholderText("Senha");

        await fireEvent.input(usernameInput, { target: { value: "meuUser" } });
        await fireEvent.input(passwordInput, { target: { value: "minhaSenha" } });

        expect(usernameInput).toHaveValue("meuUser");
        expect(passwordInput).toHaveValue("minhaSenha");
    });

    test("Deve exibir 'Carregando...' ao clicar no botão", async () => {
        render(Login);

        const button = screen.getByRole("button", { name: /entrar/i });
        await fireEvent.click(button);

        expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });
});
