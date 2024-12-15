import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/lib/Provider";

export const metadata = {
  title: "PlanVerse",
  description: "Project Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
