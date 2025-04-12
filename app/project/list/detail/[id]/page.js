import ProjectDetailPage from "@/clientpages/project/ProjectDetailPage";
import Loading from "@/components/Loading";
import { getSession } from "@/lib/session";
import dynamic from "next/dynamic";

const ProjectEditorPage = dynamic(() => import("@/clientpages/project/ProjectEditorPage"), {
    loading: () => <Loading />,
    ssr: false
});

export default async function page() {
    const token = await getSession();

    return (
        // <ProjectDetailPage token={token} />
        <ProjectEditorPage token={token} />
    )
}