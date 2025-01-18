import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function SignUp() {
  return (
    (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">계정 생성하기</CardTitle>
        <CardDescription>
          계정을 생성하기 위해 아래 있는 정보를 입력하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="이메일을 입력하세요" className="rounded-sm" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">비밀번호</Label>
            </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
                className="rounded-sm" 
                required 
              />
          </div>
          <div className="grid gap-2">    
            <div className="flex items-center">
              <Label htmlfor="passwordConfirm">비밀번호 확인</Label>
            </div>
              <Input 
                id="passwordConfirm" 
                type="passowrd" 
                placeholder="비밀번호를 한 번 더 입력하세요" 
                className="rounded-sm" 
                required 
              />
          </div>
          <Button 
            type="submit" 
            className="w-full
                      bg-primary-500"
          >
            회원가입
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href={"/auth/signin"} className="underline">
            로그인
          </Link>
        </div>
      </CardContent>
    </Card>)
  );
}
