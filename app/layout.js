import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export const metadata = {
  title: "PMS",
  description: "Project Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
    <head />
    <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
    </body>
    </html>
  );
}
