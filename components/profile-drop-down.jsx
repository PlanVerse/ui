import { LogOut, Mail, Plus, Settings, User, UserPlus, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import * as React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export function ProfileDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Avatar>
          <AvatarImage src="/logo_small.png" alt="logo" />
           <Image
            src="/logo_small.png"
            alt="logo"
            width={50}
            height={50}
            priority="true"
          /> 
           <AvatarFallback>Me</AvatarFallback>
        </Avatar> */}
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>My Page</DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}

         <DropdownMenuGroup> 
          
           {/* <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem> */}
{/* 
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem> */}
         </DropdownMenuGroup> 
        {/* <DropdownMenuSeparator />  */}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            {/* <Users /> */}
            <span>Team Setting</span>
          </DropdownMenuItem>

          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}

          <DropdownMenuItem>
            {/* <Plus /> */}
            <span>Project Setting</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem>
          {/* <LogOut /> */}
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent> 
    </DropdownMenu>
  );
}
