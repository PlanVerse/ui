import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/lib/Provider";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "PlanVerse",
  description: "Project Management System",
};

export default async function RootLayout({ children }) {
  const token = await getSession();

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
      </head>
      <body>
        <Provider>
          <Header token={token} />
          <main>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
