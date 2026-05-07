import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/render";
import userEvent from "@testing-library/user-event";
import TransactionsClient from "@/components/Dashboard/TransactionsClient";

describe("TransactionsClient", () => {
  it("renders all transactions by default", () => {
    const { getAllByRole } = renderWithProviders(<TransactionsClient />);
    const dataRows = getAllByRole("row").slice(1);
    expect(dataRows.length).toBe(8);
  });

  it("filters rows by status when a filter chip is clicked", async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = renderWithProviders(<TransactionsClient />);

    await user.click(getByRole("button", { name: /^pending$/i }));

    const dataRows = getAllByRole("row").slice(1);
    expect(dataRows.length).toBe(2);
    dataRows.forEach((row) => {
      expect(row.textContent?.toLowerCase()).toContain("pending");
    });
  });

  it("filters rows by free-text search across name, id, and amount", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getAllByRole } = renderWithProviders(<TransactionsClient />);

    const search = getByLabelText(/search transactions/i);
    await user.type(search, "Notion");

    const dataRows = getAllByRole("row").slice(1);
    expect(dataRows.length).toBeGreaterThan(0);
    dataRows.forEach((row) => {
      expect(row.textContent).toContain("Notion");
    });
  });

  it("shows an empty state when no rows match", async () => {
    const user = userEvent.setup();
    const { getByLabelText, getByText } = renderWithProviders(<TransactionsClient />);

    await user.type(getByLabelText(/search transactions/i), "zzz-no-match");

    expect(getByText(/no transactions match your search/i)).toBeInTheDocument();
  });
});
