"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getApi, postApi } from "@/lib/axios";
import { setSession } from "@/lib/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  email: z.string({
    message: "이메일을 입력해주세요"
  }),
  password: z.string({
    message: "비밀번호을 입력해주세요"
  })
});

export default function SignInPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values) {
    try {
      const requestSignIn = await postApi(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
        email: values.email,
        pwd: values.password
      });
      const accessToken = requestSignIn.data.accessToken;
      await setSession(accessToken);
      alert("로그인 되었습니다");

      // 팀 목록이 있는지 확인 후 있으면 팀 목록 페이지로, 없는 경우 팀 생성 페이지로 이동
      const fetchTeamList = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/team/list/creator`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (fetchTeamList.data.content.length > 0) {
        router.replace(`/team/list`);
      } else {
        router.replace("/team/create");
      }
    } catch (err) {
      alert("로그인 중 오류가 발생했습니다.");
    };
  };

  return (
    <div className="w-full flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-96 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">
            로그인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)(e);
              }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        className="rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        className="rounded-sm"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary-500"
                >
                  로그인
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-secondary-100 justify-center text-sm py-3">
          아직 계정이 없으신가요?&nbsp;
          <Link href={"/account/signup"} className="underline text-primary-500">
            회원가입
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}