"use client";

import DetailModal from "@/components/DetailModal";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getAvatarFallback } from "@/lib/avatar";
import { getApi, putApi } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
// import { teamListMock } from "@/mock/team";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const teamDetailSchema = z.object({
    teamName: z.string(),
    teamDescription: z.string().max(100),
    // teamMembers: z.array(z.object({
    //     id: z.string(),
    //     username: z.string(),
    //     profileImageUrl: z.string()
    // }))
});

const TeamTable = ({
    list,
    setDetailModalIsOpen,
    setSelectedTeam,
    isCreator,
    setIsCreator
}) => {
    return (
        <div className="border rounded-md overflow-hidden">
            <Table>
                <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="text-center border-r w-1/4">
                        팀 이름
                    </TableHead>
                    <TableHead className="text-center border-r w-1/4">
                        설명
                    </TableHead>
                    <TableHead className="text-center border-r w-1/4">
                        팀원
                    </TableHead>
                    <TableHead className="w-32 text-center w-1/4"></TableHead>
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
                        <TableCell className="text-center border-r flex">
                            {team.teamMemberInfos && team.teamMemberInfos.length > 0 && team.teamMemberInfos.map((member, index) => (
                                <div
                                    key={`${member.id}_${index}`}
                                    className="-ml-4 first:ml-0 w-10 h-10 text-sm border border-gray-400 rounded-full flex items-center justify-center font-semibold bg-white"
                                >
                                    {getAvatarFallback(member.username)}
                                </div>
                            ))}
                        </TableCell>
                        <TableCell className="w-32 text-center">
                            <Button
                                variant="outline"
                                className="bg-primary-500 text-white px-3"
                                onClick={() => {
                                    setSelectedTeam(team);
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
        </div>
    )
}

export default function TeamListPage({ token }) {
    const [isLoading, setIsLoading] = useState(true);
    const [createdTeamList, setCreatedTeamList] = useState([]);
    const [joinedTeamList, setJoinedTeamList] = useState([]);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamMember, setTeamMember] = useState("");
    const [members, setMembers] = useState([]);
    const [isCreator, setIsCreator] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(teamDetailSchema),
        defaultValues: {
            teamName: "",
            teamDescription: ""
        }
    });

    function addMember() {
        setTeamMember("");
        if (members.includes(teamMember)) {
            return;
        }
        setMembers([...members, teamMember]);
    };

    async function onSubmit(values) {
        try {
            await putApi(`/team/info`, {
                teamId: selectedTeam.id,
                name: values.teamName || selectedTeam.name,
                description: values.teamDescription || selectedTeam.description,
                invite: members.filter((member) => !selectedTeam.teamMemberInfos.find((m) => m.email === member)),
                exclude: members.filter((member) => selectedTeam.teamMemberInfos.find((m) => m.email === member))
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDetailModalIsOpen(false);
            // router.refresh();
            window.location.reload();
        } catch (error) {
            return;
        };
    };

    useEffect(() => {
        async function fetchTeamList() {
            const requestCreatedTeamList = await getApi(`/team/list/create`, null, {
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
            const requestJoinedTeamList = await getApi(`/team/list/member`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (requestJoinedTeamList.status === 401) {
                await removeSession();
            } else if (requestJoinedTeamList.status === 404) {
                return;
            } else if (requestJoinedTeamList.data.content.length > 0) {
                setJoinedTeamList(requestJoinedTeamList.data.content);
            };
        };

        Promise.all([
            fetchTeamList(),
            fetchJoinedTeamList()
        ])
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedTeam && selectedTeam.teamMemberInfos) {
            setMembers(selectedTeam.teamMemberInfos.map((member) => member.email));
        }
    }, [selectedTeam]);

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
                    setSelectedTeam={setSelectedTeam}
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
                    setSelectedTeam={setSelectedTeam}
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
            <DetailModal
                title="팀 상세정보"
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
                            name="teamName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>팀 이름</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="teamName"
                                            placeholder="팀명을 입력하세요"
                                            className="rounded-sm"
                                            value={selectedTeam.name || field.value}
                                            onChange={(e) => {
                                                setSelectedTeam({
                                                    ...selectedTeam,
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
                            name="teamDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>설명</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            id="teamDescription"
                                            placeholder="팀 설명을 입력하세요"
                                            className="rounded-sm"
                                            value={selectedTeam.description || field.value}
                                            onChange={(e) => {
                                                setSelectedTeam({
                                                    ...selectedTeam,
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
                                id="teamMembers"
                                placeholder="추가할 팀원의 이메일 주소를 입력해주세요"
                                onChange={(e) => {
                                    setTeamMember(e.target.value);
                                }}
                                value={teamMember}
                                className="rounded-sm my-2"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addMember();
                                    };
                                }}
                                disabled={!isCreator}
                            />
                            {teamMember.length > 0 && (
                                <div
                                    className="absolute top-[69px] left-0 right-0 flex items-center justify-between bg-gray-100 p-2 cursor-pointer"
                                    onClick={addMember}
                                >
                                    {teamMember}
                                    <Plus size={16} className="!w-4 !h-4" />
                                </div>
                            )}
                            <div className="w-full flex gap-2 flex-wrap">
                                {members.length > 0 &&
                                    members.map((member, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="w-fit flex items-center gap-2"
                                        >
                                            {member}
                                            <X
                                                className="w-3 h-3"
                                                onClick={() => {
                                                    if (!isCreator) return;
                                                    setMembers(members.filter((m) => m !== member));
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
    );
};
