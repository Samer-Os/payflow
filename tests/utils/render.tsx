import { render } from "@testing-library/react";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "next-themes";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <LanguageProvider>{ui}</LanguageProvider>
    </ThemeProvider>
  );
}
