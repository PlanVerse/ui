"use client";

import DetailModal from "@/components/DetailModal";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { getApi } from "@/lib/axios";
// import { teamListMock } from "@/mock/team";
import Link from "next/link";
import { useEffect, useState } from "react";

const TeamTable = ({
    list,
    setDetailModalIsOpen
}) => {
    return (
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
                    <TableHead className="w-32 text-center"></TableHead>
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
                                <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm border border-gray-400 rounded-full flex items-center justify-center font-semibold`}>
                                    {getAvatarFallback(member.username)}
                                </div>
                            ))}
                        </TableCell>
                        <TableCell className="w-32 text-center">
                            <Button
                                variant="outline"
                                className="bg-primary-500 text-white px-3"
                                onClick={() => setDetailModalIsOpen(true)}
                            >
                                상세정보
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default function TeamListPage({ token }) {
    const [isLoading, setIsLoading] = useState(true);
    const [createdTeamList, setCreatedTeamList] = useState([]);
    const [joinedTeamList, setJoinedTeamList] = useState([]);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchTeamList() {
            const requestCreatedTeamList = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/team/list/creator?page=1`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (requestCreatedTeamList.data.content.length > 0) {
                setCreatedTeamList(requestCreatedTeamList.data.content);
            };
        };

        async function fetchJoinedTeamList() {
            const requestJoinedTeamList = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/team/list/member`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (requestJoinedTeamList.data.content.length > 0) {
                setJoinedTeamList(requestJoinedTeamList.data.content);
            };
        };

        Promise.all([
            fetchTeamList(),
            fetchJoinedTeamList()
        ]).then(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />
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
                <TeamTable
                    list={createdTeamList}
                    setDetailModalIsOpen={setDetailModalIsOpen}
                />
            }
            <div className="w-full h-px bg-gray-200 my-8"></div>
            <h2 className="text-xl font-semibold mb-8">
                소속된 팀
            </h2>
            {joinedTeamList.length > 0 &&
                <TeamTable
                    list={joinedTeamList}
                    setDetailModalIsOpen={setDetailModalIsOpen}
                />
            }
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
            <DetailModal
                title="팀 상세정보"
                isOpen={detailModalIsOpen}
                setIsOpen={setDetailModalIsOpen}
            >
                <p>
                    팀 상세정보
                </p>
            </DetailModal>
        </>
    );
};
