import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import ContactForm from "@/components/Contact/Form";

const toastSuccessMock = vi.hoisted(() => vi.fn());

vi.mock("react-hot-toast", () => ({
  default: { success: toastSuccessMock },
  Toaster: () => null,
}));

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Jane Smith" } });
  fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "jane@example.com" } });
  fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    toastSuccessMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what are you looking for/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("shows 'Send message' button in idle state", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows 'Sending…' while the request is in flight", async () => {
    render(<ContactForm />);

    act(() => { fillAndSubmit(); });

    // setLoading(true) has fired — check loading state before advancing timers
    expect(screen.getByText("Sending…")).toBeInTheDocument();

    // Clean up: resolve the 900 ms timer so the promise settles
    await act(async () => { vi.advanceTimersByTime(1000); });
  });

  it("fires toast.success with the correct message after submission", async () => {
    render(<ContactForm />);

    await act(async () => {
      fillAndSubmit();
      vi.advanceTimersByTime(1000);
    });

    expect(toastSuccessMock).toHaveBeenCalledOnce();
    expect(toastSuccessMock).toHaveBeenCalledWith(
      "Message sent! We'll be in touch within 1 business day."
    );
  });

  it("resets all fields to empty after a successful submission", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    expect(nameInput.value).toBe("Jane Smith");

    await act(async () => {
      fireEvent.submit(nameInput.closest("form")!);
      vi.advanceTimersByTime(1000);
    });

    expect(nameInput.value).toBe("");
  });
});
