import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { getApi } from "@/lib/axios";
import { getSession, removeSession } from "@/lib/session";
// import { teamListMock } from "@/mock/team";
import Link from "next/link";
// import { redirect } from "next/navigation";

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

export default async function Page() {
    const token = await getSession();

    let teamList = [];

    const requestTeamList = await getApi(`${process.env.API_URL}/team/list/creator?page=1`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch(async (error) => {
        if (error.status === 401) {
            await removeSession();
        }
    });

    if (requestTeamList && requestTeamList.ok && requestTeamList.data.content.length > 0) {
        teamList = requestTeamList.data.content;
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                팀 목록
            </h1>
            {teamList.length > 0 ?
                <div className="border rounded-md overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-center border-r">
                                    팀 이름
                                </TableHead>
                                <TableHead className="text-center border-r">
                                    설명
                                </TableHead>
                                <TableHead className="text-center">
                                    팀원
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamList.map((team) => (
                                <TableRow key={team.id}>
                                    <TableCell className="text-center border-r">
                                        {team.name}
                                    </TableCell>
                                    <TableCell className="text-center border-r">
                                        {team.description}
                                    </TableCell>
                                    <TableCell className="text-center flex">
                                        {team.members.length > 0 && team.members.map((member, index) => (
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
            :
                <div className="w-full h-[calc(100vh-176px)] flex flex-col gap-4 items-center justify-center">
                    <p className="w-fit">
                        소속된 팀이 없습니다
                    </p>
                    <Link href="/team/create">
                        <Button
                            variant="outline"
                            className="bg-primary-500 text-white"
                        >
                            팀 생성
                        </Button>
                    </Link>
                </div>
            }
        </>
    );
};