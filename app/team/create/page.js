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
import { useRouter } from "next/navigation";

const formSchema = z.object({
    teamName: z.string(),
    teamDescription: z.string().max(100)
});

export default function TeamCreatePage() {
    const [teamMember, setTeamMember] = useState("");
    const [members, setMembers] = useState([]);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: "",
            teamDescription: ""
        }
    });

    function addMember() {
        setTeamMember("");
        if (members.includes(teamMember)) {
            return;
        }
        setMembers([...members, teamMember]);
    };

    async function onSubmit(values) {
        // const createTeam = await axios.post("", {}, {
        //     method: "POST"
        // });
        console.log(values);
        router.reload();
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                팀 생성
            </h1>
            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)(e);
                    }}
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
                                        className="rounded-sm"
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
                                        className="resize-none rounded-sm"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="relative">
                        <Label htmlFor="teamMembers">팀원 추가</Label>
                        <Input
                            id="teamMembers"
                            placeholder="추가할 팀원의 이메일 주소를 입력해주세요"
                            onChange={(e) => {
                                setTeamMember(e.target.value);
                            }}
                            value={teamMember}
                            className="rounded-sm my-2"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addMember();
                                };
                            }}
                        />
                        {teamMember.length > 0 && (
                            <div
                                className="absolute top-[69px] left-0 right-0 bg-gray-100 p-2"
                                onClick={addMember}
                            >
                                {teamMember}
                            </div>
                        )}
                        <div className="w-full flex gap-2 flex-wrap">
                            {members.length > 0 &&
                                members.map((member, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="w-fit flex items-center gap-2"
                                    >
                                        {member}
                                        <X
                                            className="w-3 h-3"
                                            onClick={() => {
                                                setMembers(members.filter((m) => m !== member));
                                            }}
                                        />
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
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