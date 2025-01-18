"use client";

import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarGroup,
    SidebarGroupLabel
} from "./ui/sidebar";
import Link from "next/link";
// import { headers } from "next/headers";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    // const headersList = headers();
    // const headerUrl = headersList && headersList.get("X-Url") || "";
    // console.log("headerUrl: ", headerUrl);
    const pathname = usePathname();
    const headerUrl = pathname;

    return (
        <ShadcnSidebar>
            <SidebarContent>
                <SidebarMenu>
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger className="text-white">
                                    팀
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <Link href="/team/list" className="cursor-pointer">
                                        <SidebarMenuSubItem className={`px-2 py-1 hover:bg-white hover:text-primary-500 transition-all ${headerUrl.includes("/team/list") ? "text-primary-500 bg-white font-semibold" : "text-white"}`}>
                                            팀 목록
                                        </SidebarMenuSubItem>
                                    </Link>
                                    <Link href="/team/create" className="cursor-pointer">
                                        <SidebarMenuSubItem className={`px-2 py-1 hover:bg-white hover:text-primary-500 transition-all ${headerUrl.includes("/team/create") ? "text-primary-500 bg-white font-semibold" : "text-white"}`}>
                                            팀 생성
                                        </SidebarMenuSubItem>
                                    </Link>
                                    <Link href="/team/management" className="cursor-pointer">
                                        <SidebarMenuSubItem className={`px-2 py-1 hover:bg-white hover:text-primary-500 transition-all ${headerUrl.includes("/team/member") ? "text-primary-500 bg-white font-semibold" : "text-white"}`}>
                                            팀 관리
                                        </SidebarMenuSubItem>
                                    </Link>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </SidebarMenu>
                <SidebarMenu>
                    <Collapsible className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger className="text-white">
                                    프로젝트
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <Link href="/project" className="cursor-pointer">
                                        <SidebarMenuSubItem className={`px-2 py-1 hover:bg-white text-white hover:text-primary-500 transition-all ${headerUrl.includes("/project") ? "text-primary-500 bg-white font-semibold" : ""}`}>
                                            프로젝트 목록
                                        </SidebarMenuSubItem>
                                    </Link> 
                                    <Link href="/project/create" className="cursor-pointer">   
                                        <SidebarMenuSubItem className={`px-2 py-1 hover:bg-white text-white hover:text-primary-500 transition-all ${headerUrl.includes("/project/create") ? "text-primary-500 bg-white font-semibold" : ""}`}>
                                            프로젝트 생성
                                        </SidebarMenuSubItem>
                                    </Link>
                                    <Link href="/project/management" className="cursor-pointer">
                                        <SidebarMenuSubItem className={`px-2 py-1 hover:bg-white text-white hover:text-primary-500 transition-all ${headerUrl.includes("/project/member") ? "text-primary-500 bg-white font-semibold" : ""}`}>
                                            프로젝트 관리
                                        </SidebarMenuSubItem>
                                    </Link>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>
        </ShadcnSidebar>
    );
};