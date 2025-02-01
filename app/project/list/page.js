import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
// import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const bgColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-slate-400",
    "bg-pink-400",
    "bg-teal-400",
    "bg-cyan-400",
]

export default async function ProjectListPage() {
    // 프로젝트 목록 페이지

    // const token = await getSession();

    let adminProjectList = [];
    let joinedProjectList = [];

    return(
        <>
            <h1 className="text-2xl font-bold mb-8">
                프로젝트 목록
            </h1>
            <h1>
                <b>생성한 프로젝트 목록</b>
            </h1>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {adminProjectList.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="text-center border-r">
                                    {project.name}
                                </TableCell>
                                <TableCell className="text-center border-r">
                                    {project.description}
                                </TableCell>
                                <TableCell className="text-center flex">
                                    {project.members.length > 0 && project.members.map((member, index) => (
                                        <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm ${bgColors[Math.floor(Math.random() * bgColors.length)]} text-white rounded-full flex items-center justify-center font-semibold`}>
                                            {getAvatarFallback(member.name)}
                                        </div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <h1>
                <b>소속된 프로젝트 목록</b>
            </h1>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {joinedProjectList.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="text-center border-r">
                                    {project.name}
                                </TableCell>
                                <TableCell className="text-center border-r">
                                    {project.description}
                                </TableCell>
                                <TableCell className="text-center flex">
                                    {project.members.length > 0 && project.members.map((member, index) => (
                                        <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm ${bgColors[Math.floor(Math.random() * bgColors.length)]} text-white rounded-full flex items-center justify-center font-semibold`}>
                                            {getAvatarFallback(member.name)}
                                        </div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div
                className="w-full flex justify-end"
            >
            <Link
                href="/project/create"
            >
                <Button
                    className="bg-primary-500"
                >
                    새 프로젝트 생성
                </Button>
            </Link>
            </div>
        </>
    )
}