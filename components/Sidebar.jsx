import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
    SidebarProvider,
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarGroup,
    SidebarGroupLabel
} from "./ui/sidebar";

export default async function Sidebar() {
    return (
        <SidebarProvider defaultOpen>
            <ShadcnSidebar>
                <SidebarContent>
                    <SidebarMenu>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        팀
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            팀 목록
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            팀 생성
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            인원 추가
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    </SidebarMenu>
                    <SidebarMenu>
                        <Collapsible className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        프로젝트
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            프로젝트 목록
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            프로젝트 생성
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            인원 추가
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarContent>
            </ShadcnSidebar>
        </SidebarProvider>
    )
};