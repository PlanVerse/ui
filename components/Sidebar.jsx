import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { SidebarProvider, Sidebar as ShadcnSidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem } from "./ui/sidebar";

export default async function Sidebar() {
    return (
        <SidebarProvider defaultOpen>
            <ShadcnSidebar>
                <SidebarContent>
                    <SidebarMenu>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        팀
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            팀 목록
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            팀 생성
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                    <SidebarMenu>
                        <Collapsible className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        프로젝트
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            프로젝트 목록
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            프로젝트 생성
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarContent>
            </ShadcnSidebar>
        </SidebarProvider>
    )
};