"use client";

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { useRouter } from 'next/navigation'; 

export default function ProjectCreatePage() {
  const [projectMember, setProjectMember] = useState('');
  const [members, setMembers] = useState([]);
  // const router = useRouter();
  
  const formSchema = z.object({
    projectName: z.string({
        // invalid_type_error: '프로젝트 이름을 다시 입력하세요'
    }).max(50),
    projectDescription: z.string({
        // invalid_type_error: '프로젝트 설명을 다시 입력하세요'
    }).max(100),
    // projectMember: z.string().email(),
    })

  const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            projectDescription: "",
        }
    });

    function addMember() {
        setProjectMember("");
        if (members.includes(projectMember)) {
            return;
        }
        setMembers([...members, projectMember]);
    };

    async function onSubmit(values) {
        console.log(values);
        await postApi(`/project`, {
            name: values.projectName,
            description: values.projectDescription,
            invite: members,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        router.refresh();
    };
    

  return (
    <div>
        <h1 className="text-2xl font-bold mb-8">
            프로젝트 생성
        </h1>
        <Form {...form}>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit(onSubmit);
                }}
                className="space-y-8 max-w-96 mx-auto"
            >
                {/* 프로젝트 생성 입력 폼 */}
                <FormField 
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>프로젝트 이름</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="projectName"
                                    placeholder="프로젝트명을 입력하세요"
                                    className="rounded-sm"
                                />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>프로젝트 설명</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    id="projectDescription"
                                    placeholder="프로젝트 설명을 입력하세요"
                                    className="resize-none rounded-sm"
                                />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )}
                />                    
                <div className="relative">
                    <Label htmlFor="projectMember">
                        프로젝트 구성원 추가
                    </Label>
                <Input
                    id = "projectMember"
                    type = "text"
                    placeholder = "추가할 구성원의 이메일을 입력하세요"
                    value = {projectMember}
                    className = "rounded-sm my-2"
                    onChange={(e) => setProjectMember(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addMember();
                        };
                    }}
                />
                    {projectMember.length > 0 && (
                            <div
                                className="absolute top-[69px] left-0 right-0 bg-gray-100 p-2"
                                onClick={addMember}
                            >
                                {projectMember}
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
                            onClick={() => window.location.reload()}
                        >
                            프로젝트 생성
                        </Button>
                </div>
            </form>
        </Form>
    </div>
  );
}
