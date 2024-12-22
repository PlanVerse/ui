import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";
import { getSession } from "./session";

export default async function Provider({ children }) {
    const headersList = await headers();
    const header_url = headersList && headersList.get("X-Url") || "";
    const isHideSidebar = header_url.includes("/signin") ||
        header_url.includes("/signup") ||
        header_url === process.env.BASE_URL;
    const token = await getSession();
        
    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {!isHideSidebar && <Sidebar />}
            {children}
        </ThemeProvider>
    )
}