import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";

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
        <DropdownMenuItem>마이페이지</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>팀 설정</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>프로젝트 설정</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent> 
    </DropdownMenu>
  );
}
