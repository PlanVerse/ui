import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { teamListMock } from "@/mock/team";

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

export default function ProjectListPage() {
    // 프로젝트 목록 페이지
    return(
        <>
            <h1 className="text-2xl font-bold mb-8">
                프로젝트 목록
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
                                    {teamListMock.map((project) => (
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
        </>
    )
}