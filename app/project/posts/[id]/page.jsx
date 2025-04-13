import Loading from "@/components/Loading";
import { getSession } from "@/lib/session";
import dynamic from "next/dynamic";

// TODO: Text Editor 검색

const ProjectEditorPage = dynamic(() => import("@/clientpages/project/ProjectEditorPage"), {
    loading: () => <Loading />,
    ssr: false
});

export default async function Page() {
    const token = await getSession();

    return (
        <ProjectEditorPage token={token} />
    )
}