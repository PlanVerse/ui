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
import { getSession, removeSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { postApi } from "@/lib/axios";

export function ProfileDropDown() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = await getSession();
      await postApi(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await removeSession();
      alert("로그아웃 되었습니다");
      router.replace("/account/signin");
    } catch (error) {
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
            <Link href="/team/management" className="w-full cursor-pointer">
              팀 설정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/project/setting" className="w-full cursor-pointer">
              프로젝트 설정
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent> 
    </DropdownMenu>
  )
}
