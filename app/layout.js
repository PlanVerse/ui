import "./globals.css";
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
      <head>
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
      </head>
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
