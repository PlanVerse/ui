import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";
import { getSession } from "./session";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Provider({ children }) {
    const headersList = await headers();
    const header_url = headersList && headersList.get("X-Url") || "";
    const isHideSidebar = header_url === `${process.env.BASE_URL}/` ||
        header_url.includes("/signin") ||
        header_url.includes("/signup");

    const token = await getSession();
    
    return (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {!isHideSidebar ? (
                <SidebarProvider>
                    <Sidebar />
                    {children}
                </SidebarProvider>
            ) : (
                <>
                    {children}
                </>
            )}
        </ThemeProvider>
    )
}