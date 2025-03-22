"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getApi } from "@/lib/axios";

const ProjectDetailTable = ({
    list
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
                {list.map((project) => (
                <TableRow key={project.id}>
                    {project.description}
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)

export default function ProjectDetailPage({ token }) {

    const [loading, setIsLoading] = useState(true);
    const [projectDetail, setProjectDetail] = useState([]);

useEffect(()=> {
    async function fetchProjectDetail() {
        const requestProjectDetail = await getApi(`/project/list/1`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
        })

        if (requestProjectDetail.status === 401) {
            await removeSession();
        }

        if (requestProjectDetail.data.content.length > 0) {
            setProjectDetail(requestProjectDetail.data.content);
        };
    };

    Promise.all([
        fetchProjectDetail(),
    ])
        .then(() => {
            setIsLoading(false);
        });
}, []);

console.log(projectDetail);
    return(
        <>
                {/* {projectDetail.id === id &&
                 <h1 className="text-2xl font-bold mb-8">{projectDetail.name}</h1>
                } */}
            
            <ProjectDetailTable 
                list={projectDetail}
            />
        </>
    )
}