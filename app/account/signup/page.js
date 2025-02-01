"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { postApi } from "@/lib/axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string({
    message: "이름을 입력해주세요"
  }),
  nickName: z.string({
    message: "닉네임을 입력해주세요"
  }),
  email: z.string({
    message: "이메일을 입력해주세요"
  }),
  password: z.string({
    message: "비밀번호을 입력해주세요"
  }),
  confirmPassword: z.string({
    message: "비밀번호가 일치하지 않습니다"
  })
});

export default function Page() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nickName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(values) {
    const name = values.name;
    const nickName = values.nickName;
    const email = values.email;
    const password = values.password;
    const confirmPassword = values.confirmPassword;
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    };

    try {
      await postApi(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
        name: name,
        nickName: nickName,
        email: email,
        pwd: password
      });
      alert("회원가입이 완료되었습니다");
      router.replace("/account/signin");
    } catch (err) {
      alert("회원가입 중 오류가 발생했습니다");
    };
  };

  return (
    <div className="w-full flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-96 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>
            계정을 생성하기 위해 아래 있는 정보를 입력하세요
          </CardDescription>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        className="rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="nickName"
                        className="rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPassword"
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
                  회원가입
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-secondary-100 justify-center text-sm py-3">
          이미 계정이 있으신가요?&nbsp;
          <Link href={"/account/signin"} className="underline text-primary-500">
            로그인
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
