import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import Dashboard from "../../src/routes/pre-register/+page.svelte";
import { vi } from 'vitest';

vi.mock("$lib/services/authService");

describe("Fluxo de Autenticação", () => {
  it("Deve realizar logout corretamente", async () => {
    render(Dashboard);
    
    const logoutButton = await screen.findByRole('button', { name: /sair/i });
    await fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem("access")).toBeNull();
    });
  });
});