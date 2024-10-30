"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent",
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Avatar>
              {/* TODO 이미지 최적화가 안되고 있어 확인 필요 */}
              <AvatarImage src="logo_small.png" alt="@shadcn" />
              <AvatarFallback>PMS</AvatarFallback>
            </Avatar>
          </Link>
          <div className="ml-auto flex gap-2">
            <Link href="/login" className="flex items-center space-x-2">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link href="/signup" className="flex items-center space-x-2">
              <Button>Sign Up</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
