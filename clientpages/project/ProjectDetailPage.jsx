"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { useEffect, useState } from "react";
import { getApi } from "@/lib/axios";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RemoveFormatting } from "lucide-react";
import { removeSession } from "@/lib/session";

const ProjectDetailTable = ({
    requestProjectDetail
}) => (
    <div className="border rounded-md overflow-hidden">
        {/* 프로젝트 상세 정보 테이블 */}
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="text-center border-r">
                        프로젝트 설명
                    </TableHead>
                    <TableHead className="text-center border-r">
                        프로젝트 구성원
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {requestProjectDetail && (
                    <TableRow key={requestProjectDetail.id}>
                        <TableCell className="text-center border-r">
                            {requestProjectDetail.description}
                        </TableCell>
                        <TableCell className="text-center flex">
                            {requestProjectDetail.projectMemberInfos && requestProjectDetail.projectMemberInfos.length > 0 && requestProjectDetail.projectMemberInfos.map((member, index) => (
                                <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm border border-gray-400 rounded-full flex items-center justify-center font-semibold`}>
                                    {getAvatarFallback(member.username)}
                                </div>
                            ))}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
)

export default function ProjectDetailPage({ token }) {

    const [workflowList, setWorkflowList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [projectDetail, setProjectDetail] = useState([]);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        async function fetchWorkflowList() {
            const requestWorkflowList = await getApi(`/workflow/list/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(requestWorkflowList);

            if (requestWorkflowList.status === 401) {
                return await removeSession();
            }
            setWorkflowList(requestWorkflowList.data);
        };

        Promise.all([
            fetchWorkflowList(),
        ])
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        async function fetchProjectDetail() {
            const requestProjectDetail = await getApi(`/project/info/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(requestProjectDetail);

            if (requestProjectDetail.status === 401) {
                return await removeSession();
            }
            setProjectDetail(requestProjectDetail.data);
        };

        Promise.all([
            fetchProjectDetail(),
        ])
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                {projectDetail.name}
            </h1>

            <ProjectDetailTable
                requestProjectDetail={projectDetail}
            />

            <div className="w-full h-px bg-gray-200 my-8"></div>

            <h1 className="text-2xl font-bold mb-8">
                워크플로우
            </h1>
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center border-r">
                                제목
                            </TableHead>
                            <TableHead className="text-center">
                                진행 단계
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>

            <div className="w-full h-px bg-gray-200 my-8"></div>

            <div
                className="w-full flex justify-end"
            >
                <Button
                    className="bg-primary-500 hover:bg-primary-600"
                >
                    <Link
                        href="/project/list"
                    >
                        목록
                    </Link>
                </Button>
            </div>
        </>
    )
}