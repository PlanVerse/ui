import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";

export default async function Provider({ children }) {
    const headersList = await headers();
    const header_url = headersList && headersList.get("X-Url") || "";
    const isHideSidebar = header_url.includes("/signin") ||
        header_url.includes("/signup") ||
        header_url === process.env.BASE_URL;
        
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