"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProfileDropDown } from "@/components/profile-drop-down";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header({ token }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      `fixed top-0 ${token ? "left-[255px]" : "w-full"} right-0 z-50 transition-all duration-200`,
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent",
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Avatar>
              {/*<AvatarImage src="/logo_small.png" alt="logo" />*/}
              <Image
                src="/Logo_transparent.png"
                alt="logo"
                width={50}
                height={50}
                priority="true"
              />
              <AvatarFallback>PMS</AvatarFallback>
            </Avatar>
          </Link>
          <div className="ml-auto flex gap-2 items-center">
            {token ? (
              <ProfileDropDown />
            ) : (!pathname.includes("/signin") && !pathname.includes("/signup")) && (
              <Link href="/account/signin" className="flex items-center space-x-2">
                <Button variant="outline">Log in</Button>
              </Link>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
