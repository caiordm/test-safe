import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import Login from '../../src/routes/login/+page.svelte';
import { login } from "$lib/services/authService";
import { vi } from "vitest";

// Mock do serviço de login
vi.mock("$lib/services/authService", () => ({
    login: vi.fn(),
}));

describe("Login Page - Fluxo de login", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test("Deve exibir erro ao falhar no login", async () => {
        login.mockRejectedValue(new Error("Credenciais inválidas"));

        render(Login);

        const usernameInput = screen.getByPlaceholderText("Nome do usuário");
        const passwordInput = screen.getByPlaceholderText("Senha");
        const button = screen.getByRole("button", { name: /entrar/i });

        await fireEvent.input(usernameInput, { target: { value: "errado" } });
        await fireEvent.input(passwordInput, { target: { value: "senhaerrada" } });
        await fireEvent.click(button);

        expect(await screen.findByText("Error: Credenciais inválidas")).toBeInTheDocument();
    });

    test("Deve redirecionar para /pre-register ao logar com sucesso", async () => {
        login.mockResolvedValue({ access: "token" });

        // Mock do window.location
        const originalLocation = window.location;
        delete window.location;
        window.location = { href: "" } as Location;

        render(Login);

        const usernameInput = screen.getByPlaceholderText("Nome do usuário");
        const passwordInput = screen.getByPlaceholderText("Senha");
        const button = screen.getByRole("button", { name: /entrar/i });

        await fireEvent.input(usernameInput, { target: { value: "user" } });
        await fireEvent.input(passwordInput, { target: { value: "pass" } });
        await fireEvent.click(button);

        await waitFor(() => expect(window.location.href).toBe("/pre-register"));

        // Restaurar window.location original
        window.location = originalLocation;
    });
});
