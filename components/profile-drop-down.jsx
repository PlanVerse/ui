import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { getSession, removeSession } from "@/lib/session";
import { redirect } from "next/navigation";

export function ProfileDropDown() {
  const handleLogout = async () => {
    try {
      const token = await getSession();
      const requestLogout = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (requestLogout.status !== 200) {
        return alert(requestLogout.data.message);
      };
      await removeSession();
      alert("로그아웃 되었습니다");
      redirect("/account/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    };
  };

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
        <DropdownMenuItem>
          <Link href="/account/mypage" className="w-full cursor-pointer">
            마이페이지
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            팀 설정
          </DropdownMenuItem>
          <DropdownMenuItem>
            프로젝트 설정
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onclick={handleLogout}>
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent> 
    </DropdownMenu>
  )
}
