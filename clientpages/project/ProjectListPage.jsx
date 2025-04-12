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
import Loading from "@/components/Loading";

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
        {/* 프로젝트 목록 테이블 */}
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
                        프로젝트 구성원
                    </TableHead>
                    <TableHead className="w-32 text-center"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {list.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell className="text-center border-r">
                            <Link
                                className="text-blue-600 text-decoration-line: underline"
                                href={`/project/list/detail/${project.id}`}
                            >
                                {project.name}
                            </Link>
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
                                disabled={!isCreator}
                            >
                                수정
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)

export default function ProjectListPage({ token }) {
    // 프로젝트 목록 페이지
    const [isLoading, setIsLoading] = useState(true);
    const [projectList, setProjectList] = useState([]);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreator, setIsCreator] = useState(false);
    const [projectMember, setProjectMember] = useState("");
    const [projectMembers, setProjectMembers] = useState([]);
    const [authorityModalIsOpen, setAuthorityModalIsOpen] = useState(false);

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

    function deleteProject() {
        if (confirm("프로젝트를 정말 삭제하시겠습니까?")) {
            setProjectList(projectList.filter((id) => id !== projectList));
        } else {
            return;
        }
    }

    // function modifyProject() {
    //     if (confirm("프로젝트 정보를 수정하시겠습니까?")) {
    //         alert("프로젝트 정보가 수정되었습니다.");
    //     } else {
    //         return;
    //     }
    // }

    async function onProjectSubmit(values) {
        try {
            await putApi(`/project/info`, {
                projectId: selectedProject.id,
                name: values.projectName || selectedProject.name,
                description: values.projectDescription || selectedProject.description,
                invite: projectMembers.filter((projectMember) => !selectedProject.projectMemberInfos.find((pm) => pm.email === projectMember)),
                exclude: projectMembers.filter((projectMember) => selectedProject.projectMemberInfos.find((pm) => pm.email === projectMember))
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDetailModalIsOpen(false);
            window.location.reload();
        } catch (error) {
            return;
        };
    };

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

        Promise.all([
            fetchProjectList(),
        ])
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedProject && selectedProject.projectMemberInfos) {
            setProjectMembers(selectedProject.projectMemberInfos.map((projectMember) => projectMember.email));
        }
    }, [selectedProject]);

    if (isLoading) {
        return <Loading />
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                프로젝트 목록
            </h1>
            {projectList.lnegth > 0 &&
                <ProjectTable
                    list={projectList}
                    setAuthorityModalIsOpen={setAuthorityModalIsOpen}
                    setDetailModalIsOpen={setDetailModalIsOpen}
                    setSelectedProject={setSelectedProject}
                    setIsCreator={setIsCreator}
                    isCreator={true}
                />
            }
            {projectList.length === 0 &&
                <div className="w-full h-[calc(100vh-176px)] flex flex-col gap-4 items-center justify-center">
                    <p className="w-fit">
                        소속된 프로젝트가 없습니다.
                    </p>
                    <Link href="/project/create">
                        <Button
                            variant="outline"
                            className="bg-primary-500 text-white"
                            disabled={!isCreator}
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
                            form.handleSubmit(onProjectSubmit)(e);
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
                                            placeholder="프로젝트명을 입력하세요"
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
                                    <FormLabel>프로젝트 설명</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            id="projectDescription"
                                            placeholder="프로젝트 설명을 입력하세요"
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
                            <Label className="text-sm font-medium">프로젝트 구성원</Label>
                            <Input
                                id="projectMembers"
                                placeholder="추가할 프로젝트 구성원의 이메일 주소를 입력해주세요"
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
                            {/* 수정할 부분 */}
                            <Button
                                className="bg-primary-500 text-white disabled:bg-gray-400"
                                disabled={!isCreator}
                                onClick={deleteProject}
                            >
                                삭제
                            </Button>
                            {/* 수정할 부분 */}
                            <Button
                                type="submit"
                                className="bg-primary-500 text-white disabled:bg-gray-400"
                                disabled={!isCreator}
                            >
                                저장
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-primary-500 text-white px-3"
                                onClick={() => {
                                    setAuthorityModalIsOpen(true);
                                    setIsCreator(isCreator);
                                }}
                                disabled={!isCreator}
                            >
                                권한설정
                            </Button>
                        </div>
                    </form>
                </Form>
            </DetailModal>
            <DetailModal
                title="프로젝트 구성원 권한설정"
                isOpen={authorityModalIsOpen}
                setIsOpen={setAuthorityModalIsOpen}
            >
                <Label>구성원 목록</Label>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center border-r">
                                이름
                            </TableHead>
                            <TableHead className="text-center border-r">
                                이메일
                            </TableHead>
                            <TableHead className="text-center">
                                권한 여부
                            </TableHead>
                            <TableHead className="w-32 text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projectList.projectMemberInfos &&
                            <TableRow key={projectList.projectMemberInfos.id}>
                                <TableCell className="text-center border-r">
                                    {projectList.projectMemberInfos.value}
                                </TableCell>
                                <TableCell className="text-center border-r">
                                    {projectList.projectMemberInfos.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        className="bg-primary-500 text-white px-3"
                                        variant="outline"
                                    >
                                        관리자
                                    </Button>
                                    <Button
                                        className="bg-"
                                    >
                                        구성원
                                    </Button>
                                    {/* {projectList.projectMemberInfos.creator} */}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>

                </Table>
            </DetailModal>
        </>
    )
}