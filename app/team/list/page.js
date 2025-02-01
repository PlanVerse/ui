import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { getApi } from "@/lib/axios";
import { getSession, removeSession } from "@/lib/session";
// import { teamListMock } from "@/mock/team";
import Link from "next/link";
// import { redirect } from "next/navigation";

const bgColors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
];
const colorLevel = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
];

const randomBgColors = `bg-${bgColors[Math.floor(Math.random() * bgColors.length)]}-${colorLevel[Math.floor(Math.random() * colorLevel.length)]}`;

const TeamTable = ({ list }) => (
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
                {list.map((team) => (
                    <TableRow key={team.id}>
                        <TableCell className="text-center border-r">
                            {team.name}
                        </TableCell>
                        <TableCell className="text-center border-r">
                            {team.description}
                        </TableCell>
                        <TableCell className="text-center flex">
                            {team.teamMemberInfos.length > 0 && team.teamMemberInfos.map((member, index) => (
                                <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm ${randomBgColors} text-white rounded-full flex items-center justify-center font-semibold`}>
                                    {getAvatarFallback(member.username)}
                                </div>
                            ))}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)

export default async function Page() {
    const token = await getSession();

    let createdTeamList = [];
    let joinedTeamList = [];

    const requestCreatedTeamList = await getApi(`${process.env.API_URL}/team/list/creator?page=1`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(async (error) => {
            if (error.status === 401) {
                await removeSession();
            }
        });

    const requestJoinedTeamList = await getApi(`${process.env.API_URL}/team/list/member`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .catch(async (error) => {
            if (error.status === 401) {
                await removeSession();
            }
        });

    if (requestCreatedTeamList.data.content.length > 0) {
        createdTeamList.push(...requestCreatedTeamList.data.content);
    };

    if (requestJoinedTeamList.data.content.length > 0) {
        joinedTeamList.push(...requestJoinedTeamList.data.content);
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                팀 목록
            </h1>
            <h2 className="text-xl font-semibold mb-8">
                생성한 팀
            </h2>
            {createdTeamList.length > 0 &&
                <TeamTable list={createdTeamList} />
            }
            <div className="h-px bg-gray-200 my-8"></div>
            <h2 className="text-xl font-semibold mb-8">
                소속된 팀
            </h2>
            {joinedTeamList.length > 0 &&
                <TeamTable list={joinedTeamList} />
            }
            {/* TODO: 권한애 따라 empty text 변경 */}
            {createdTeamList.length === 0 && joinedTeamList.length === 0 &&
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
