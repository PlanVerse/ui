import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";
// import { getSession } from "./session";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Provider({ children }) {
    const headersList = await headers();
    const headerUrl = headersList && headersList.get("X-Url") || "";
    const isHideSidebar = headerUrl === `${process.env.BASE_URL}/` ||
        headerUrl.includes("/account/signin") ||
        headerUrl.includes("/account/signup");

    // const token = await getSession();
    
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