import { render, screen, waitFor } from "@testing-library/svelte";
import Dashboard from "../../../../src/routes/pre-register/+page.svelte";
import { getPreRegisterList } from "$lib/services/preRegisterService";
import { vi } from "vitest";

vi.mock("$lib/services/preRegisterService", () => ({
  getPreRegisterList: vi.fn(),
}));

test("Deve carregar a lista de pré-registros ao montar", async () => {
  const mockPreRegisterList = [
    { id: 1, name: "John Doe", email: "john@example.com", cpf: "12345678901", phone: "987654321", status: "pending", assignor: { fantasy_name: "Clinica" } },
    { id: 2, name: "Jane Doe", email: "jane@example.com", cpf: "12345678902", phone: "987654322", status: "registered", assignor: { fantasy_name: "Clinica" } }
  ];

  getPreRegisterList.mockResolvedValue(mockPreRegisterList);

  render(Dashboard);

  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
