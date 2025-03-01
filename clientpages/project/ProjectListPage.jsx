"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getApi } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import DetailModal from "@/components/DetailModal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
// import { boolean } from "zod";
// import { useState } from "react";

const projectDetailSchema = z.object({
    projectName: z.string().max(50),
    projectDescription: z.string().max(100),
})

const ProjectTable = ({ 
    list, 
    setDetailModalIsOpen,
    setSelectedProject,
    isCreator,
    setIsCreator,
}) => (
    <div className="border rounded-md overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="text-center border-r">
                        프로젝트 이름
                    </TableHead>
                    <TableHead className="text-center border-r">
                        설명
                    </TableHead>
                    <TableHead className="text-center">
                        프로젝트 멤버
                    </TableHead>
                    <TableHead className="w-32 text-center"></TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                {list.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell className="text-center border-r">
                            {project.name}
                        </TableCell>
                        <TableCell className="text-center border-r">
                            {project.description}
                        </TableCell>
                        <TableCell className="text-center flex">
                            {project.projectMemberInfos && project.projectMemberInfos.length > 0 && project.projectMemberInfos.map((member, index) => (
                                <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm border border-gray-400 rounded-full flex items-center justify-center font-semibold`}>
                                    {getAvatarFallback(member.username)}
                                </div>
                            ))}
                        </TableCell>
                        <TableCell className="w-32 text-center">
                            <Button
                                variant="outline"
                                className="bg-primary-500 text-white px-3"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setDetailModalIsOpen(true);
                                    setIsCreator(isCreator);
                                }}
                            >
                                상세정보
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {/* <div
            className="w-full flex justify-end"
        >
            <Link href="/project/create">
                <Button
                    variant="outline"
                    className="bg-primary-500 text-white disabled:bg-gray-400"
                    // disabled={!invalidProjectCreator}
                >
                    새 프로젝트 생성
                </Button>
            </Link>
        </div> */}
    </div>
)

export default function ProjectListPage( { token }) {
    // 프로젝트 목록 페이지
    const [isLoading, setIsLoading] = useState(true);
    const [projectList, setProjectList] = useState([]);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreator, setIsCreator] = useState(false);
    const [projectMember, setProjectMember] = useState("");
    const [projectMembers, setProjectMembers] = useState([]);

    const form = useForm({
        resolver: zodResolver(projectDetailSchema),
        defaultValues: {
            teamName: "",
            teamDescription: ""
        }
    });

    function addProjectMember() {
        setProjectMember("");
        if (projectMembers.includes(projectMember)) {
            return;
        }
        setProjectMembers([...projectMembers, projectMember]);
    };

    // async function fetchProjectInfos() {
    //     const requestProjectInfos = await getApi(`${process.env.API_URL}/project/info/1`,
    //     {
    //         id: number,
    //         projectInfoId: number,
    //         teamInfoid: number,
    //         userInfoId: number,
    //         creator: boolean,
    //         username: string,
    //         email: string,
    //     }, {    
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    // }

    useEffect(() => {
    async function fetchProjectList() {
        const requestProjectList = await getApi(`/project/list/1`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
           
        if (requestProjectList.status === 401) {
            await removeSession();
        }
            
        if (requestProjectList.data.content.length > 0) {
            setProjectList(requestProjectList.data.content);
        };
    };

    // async function fetchJoinedProjectList() {
    //     const requestJoinedProjectList = await getApi(`${process.env.API_URL}/project/list/member`, null, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })

    //     if (requestJoinedProjectList.status === 401) {
    //         await removeSession();
    //     }
        
    //     if (requestJoinedProjectList.data.content.length > 0) {
    //         setJoinedProjectList(requestJoinedProjectList.data.content);
    //     };
    // };
    
    Promise.all([
        fetchProjectList(),
        // fetchJoinedProjectList(),
        // fetchProjectInfos(),
    ])
        .then(() => {
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (selectedProject) {
            setProjectMembers(selectedProject.projectMemberInfos.map((projectMember) => projectMember.email));
        }
    }, [selectedProject]);

    return(
        <>
        <h1 className="text-2xl font-bold mb-8">
            프로젝트 목록
        </h1>
        {projectList.length > 0 &&
            <h2 className="text-xl font-semibold mb-8">
                생성한 프로젝트
            </h2> &&
            <ProjectTable 
                list={projectList}
                setDetailModalIsOpen={setDetailModalIsOpen}
                setSelectedProject={setSelectedProject} 
                isCreator={true}
                setIsCreator={setIsCreator}
            />
        }
        {/* <div className="h-px bg-gray-200 my-8"></div> */}
        {/* {joinedProjectList.length > 0 &&
            <h2 className="text-xl font-semibold mb-8">
                소속된 프로젝트
            </h2> &&
            <ProjectTable list={joinedProjectList} />
        } */}
        {/* Todo: 권한에 따라 메시지와 버튼유무를 다르게 하기 */}
        {projectList.length === 0 &&
            <div className="w-full h-[calc(100vh-176px)] flex flex-col gap-4 items-center justify-center">
                <p className="w-fit">
                    소속된 프로젝트가 없습니다.
                </p>
                <Link href="/project/create">
                    <Button
                        variant="outline"
                        className="bg-primary-500 text-white"
                        // disabled={!invalidProjectCreator}
                    >
                        새 프로젝트 생성
                    </Button>
                </Link>
            </div>
        }
            <DetailModal
                title="프로젝트 상세정보"
                isOpen={detailModalIsOpen}
                setIsOpen={setDetailModalIsOpen}
            >
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
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>프로젝트 이름</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="projectName"
                                            placeholder="팀명을 입력하세요"
                                            className="rounded-sm"
                                            value={selectedProject.name || field.value}
                                            onChange={(e) => {
                                                setSelectedProject({
                                                    ...selectedProject,
                                                    name: e.target.value
                                                });
                                            }}
                                            disabled={!isCreator}
                                            required={isCreator}
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
                                    <FormLabel>설명</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            id="projectDescription"
                                            placeholder="팀 설명을 입력하세요"
                                            className="rounded-sm"
                                            value={selectedProject.description || field.value}
                                            onChange={(e) => {
                                                setSelectedProject({
                                                    ...selectedProject,
                                                    description: e.target.value
                                                });
                                            }}
                                            disabled={!isCreator}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="relative">
                            <Label className="text-sm font-medium">팀원</Label>
                            <Input
                                id="projectMembers"
                                placeholder="추가할 팀원의 이메일 주소를 입력해주세요"
                                onChange={(e) => {
                                    setProjectMember(e.target.value);
                                }}
                                value={projectMember}
                                className="rounded-sm my-2"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addProjectMember();
                                    };
                                }}
                                disabled={!isCreator}
                            />
                            {projectMember.length > 0 && (
                                <div
                                    className="absolute top-[69px] left-0 right-0 bg-gray-100 p-2"
                                    onClick={addProjectMember}
                                >
                                    {projectMember}
                                </div>
                            )}
                            <div className="w-full flex gap-2 flex-wrap">
                                {projectMembers.length > 0 &&
                                    projectMembers.map((projectMember, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="w-fit flex items-center gap-2"
                                        >
                                            {projectMember}
                                            <X
                                                className="w-3 h-3"
                                                onClick={() => {
                                                    if (!isCreator) return;
                                                    setProjectMembers(projectMembers.filter((m) => m !== projectMember));
                                                }}
                                            />
                                        </Badge>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="bg-primary-500 text-white disabled:bg-gray-400"
                                disabled={!isCreator}
                            >
                                저장
                            </Button>
                        </div>
                    </form>
                </Form>
            </DetailModal>
    </>
    )
}