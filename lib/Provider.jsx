"use client";

import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
// import { getSession } from "./session";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Provider({ children }) {
    const pathname = usePathname();
    const isHideSidebar = pathname === `/` ||
        pathname.includes("/account/signin") ||
        pathname.includes("/account/signup");

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