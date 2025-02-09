"use client";

import DetailModal from "@/components/DetailModal";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getAvatarFallback } from "@/lib/avatar";
import { getApi } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
// import { teamListMock } from "@/mock/team";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    teamName: z.string({
        message: "팀 이름을 입력해주세요"
    }),
    teamDescription: z.string().max(100, {
        message: "설명은 최대 100자까지 입력할 수 있습니다"
    })
});

const TeamTable = ({
    list,
    setDetailModalIsOpen,
    token,
    setDetailModalTeam,
    isCreator,
    setIsCreator
}) => {
    const handleDetailModal = async (teamId) => {
        setIsCreator(isCreator);
        const requestTeamDetail = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/team/info/${teamId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setDetailModalTeam(requestTeamDetail.data);
    };

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
                            {team.teamMemberInfos && team.teamMemberInfos.length > 0 && team.teamMemberInfos.map((member, index) => (
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
                                    handleDetailModal(team.id);
                                    setDetailModalIsOpen(true);
                                }}
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
    const [detailModalTeam, setDetailModalTeam] = useState(null);
    const [isCreator, setIsCreator] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            teamName: detailModalTeam?.name || "",
            teamDescription: detailModalTeam?.description || ""
        }
    });

    useEffect(() => {
        async function fetchTeamList() {
            const requestCreatedTeamList = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/team/list/creator`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (requestCreatedTeamList.status === 401) {
                await removeSession();
            };

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

            if (requestJoinedTeamList.status === 401) {
                await removeSession();
            };

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

    const onSubmit = (values) => {
        console.log(values);
    };

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
                    token={token}
                    setDetailModalTeam={setDetailModalTeam}
                    isCreator={true}
                    setIsCreator={setIsCreator}
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
                    token={token}
                    setDetailModalTeam={setDetailModalTeam}
                    isCreator={false}
                    setIsCreator={setIsCreator}
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
            {detailModalTeam &&
                <DetailModal
                    title="팀 상세정보"
                    isOpen={detailModalIsOpen}
                    setIsOpen={setDetailModalIsOpen}
                >
                    <Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                form.handleSubmit(onSubmit);
                            }}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="teamName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>팀 이름</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="teamName"
                                                className="rounded-sm"
                                                disabled={!isEditing}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="teamDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>설명</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                id="teamDescription"
                                                className="rounded-sm resize-none"
                                                disabled={!isEditing}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isCreator && isEditing &&
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-primary-500 text-white"
                                    >
                                        저장
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditing(false);
                                        }}
                                    >
                                        취소
                                    </Button>
                                </div>
                            }
                        </form>
                    </Form>
                    {isCreator && !isEditing &&
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                className="bg-primary-500 text-white hover:bg-primary-600"
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            >
                                수정
                            </Button>
                            <Button variant="destructive">
                                삭제
                            </Button>
                        </div>
                    }
                </DetailModal>
            }
        </>
    );
};
