import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
// import { getSession, getApi } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Todo: 권한에 따라 프로젝트 생성버튼이 있거나 없게 하기

const ProjectTable = ({ plist }) => (
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
                {plist.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell className="text-center border-r">
                            {project.name}
                        </TableCell>
                        <TableCell className="text-center border-r">
                            {project.description}
                        </TableCell>
                        <TableCell className="text-center flex">
                            {project.projectMemberInfos.length > 0 && project.projectMemberInfos.map((member, index) => (
                                <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm border border-gray-500 text-white rounded-full flex items-center justify-center font-semibold`}>
                                    {getAvatarFallback(member.username)}
                                </div>
                            ))}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <div
            className="w-full flex justify-end"
        >
            <Link href="/project/create">
                <Button
                    variant="outline"
                    className="bg-primary-500"
                >
                새 프로젝트 생성
                </Button>
            </Link>
        </div>
    </div>
)

export default async function ProjectListPage() {
    // 프로젝트 목록 페이지

    //  const token = await getSession();

    let createdProjectList = [];
    let joinedProjectList = [];

    // const requestCreatedProjectList = await getApi(`${process.env.API_URL}/team/list/creator?page=1`, null, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    //     .catch(async (error) => {
    //         if (error.status === 401) {
    //             await removeSession();
    //         }
    //     });

    // const requestJoinedProjectList = await getApi(`${process.env.API_URL}/team/list/member`, null, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    //     .catch(async (error) => {
    //         if (error.status === 401) {
    //             await removeSession();
    //         }
    //     });

    // if (requestCreatedProjectList.data.content.length > 0) {
    //     createdProjectList.push(...requestCreatedProjectList.data.content);
    // };

    // if (requestJoinedProjectList.data.content.length > 0) {
    //     joinedProjectList.push(...requestJoinedProjectList.data.content);
    // };

    return(
        <>
        <h1 className="text-2xl font-bold mb-8">
            프로젝트 목록
        </h1>
        <h2 className="text-xl font-semibold mb-8">
            생성한 프로젝트
        </h2>
        {createdProjectList.length > 0 &&
            <ProjectTable list={createdProjectList} />
        }
        <div className="h-px bg-gray-200 my-8"></div>
        <h2 className="text-xl font-semibold mb-8">
            소속된 프로젝트
        </h2>
        {joinedProjectList.length > 0 &&
            <ProjectTable list={joinedProjectList} />
        }
        {/* Todo: 권한에 따라 메시지와 버튼유무를 다르게 하기 */}
        {createdProjectList.length === 0 && joinedProjectList.length === 0 &&
            <div className="w-full h-[calc(100vh-176px)] flex flex-col gap-4 items-center justify-center">
                <p className="w-fit">
                    소속된 프로젝트가 없습니다.
                </p>
                <Link href="/project/create">
                    <Button
                        variant="outline"
                        className="bg-primary-500 text-white"
                    >
                        새 프로젝트 생성
                    </Button>
                </Link>
            </div>
        }
    </>
    )
}