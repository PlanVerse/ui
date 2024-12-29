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

export default async function Sidebar() {
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
                                    <Link href="/team" className="hover:cursor-pointer">
                                        <SidebarMenuSubItem className="text-white">
                                            팀 목록
                                        </SidebarMenuSubItem>
                                    </Link>
                                    <Link href="/team/create" className="hover:cursor-pointer">
                                        <SidebarMenuSubItem className="text-white">
                                            팀 생성
                                        </SidebarMenuSubItem>
                                    </Link>
                                    <Link href="/team/add-user" className="hover:cursor-pointer">
                                        <SidebarMenuSubItem className="text-white">
                                            팀원 추가
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
                                    <Link href="/project" className="hover:cursor-pointer">
                                        <SidebarMenuSubItem className="text-white">
                                            프로젝트 목록
                                        </SidebarMenuSubItem>
                                    </Link> 
                                    <Link href="/project/create" className="hover:cursor-pointer">   
                                        <SidebarMenuSubItem className="text-white">
                                            프로젝트 생성
                                        </SidebarMenuSubItem>
                                    </Link>
                                    <Link href="/project/member" className="hover:cursor-pointer">
                                        <SidebarMenuSubItem className="text-white">
                                            인원 추가
                                        </SidebarMenuSubItem>
                                    </Link>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>
        </ShadcnSidebar>
    )
};