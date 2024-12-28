"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
    teamName: z.string(),
    teamDescription: z.string().max(100),
    teamMembers: z.array(z.string())
})

export default function TeamCreatePage() {
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [teamMember, setTeamMember] = useState("");
    const [members, setMembers] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "",
            teamDescription: "",
            teamMembers: []
        }
    });

    function onSubmit(values) {
        console.log(values);
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                팀 생성
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-96 mx-auto"
                >
                    <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>팀 이름</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="teamName"
                                        placeholder="팀명을 입력하세요"
                                        value={teamName}
                                        onChange={(e) => {
                                            setTeamName(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="teamDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>설명</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        id="teamDescription"
                                        placeholder="설명을 입력하세요"
                                        className="resize-none"
                                        value={teamDescription}
                                        onChange={(e) => {
                                            setTeamDescription(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="teamMembers"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>팀원 추가</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="teamMembers"
                                        placeholder="추가할 팀원의 이메일 주소를 입력해주세요"
                                        onChange={(e) => {
                                            setTeamMember(e.target.value);
                                        }}
                                        value={teamMember}
                                    />
                                </FormControl>
                                {/* {members.map((member, index) => ( */}
                                    <Badge
                                        // key={index}
                                        variant="secondary"
                                        className="w-fit flex items-center gap-2"
                                    >
                                        {/* {member} */}
                                        {teamMember}
                                        <X className="w-3 h-3" />
                                    </Badge>
                                {/* ))} */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-end">
                        <Button
                            type="submit"
                            className="bg-primary-500"
                        >
                            팀 만들기
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};