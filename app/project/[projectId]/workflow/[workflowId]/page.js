import { getSession } from "@/lib/session";
import dynamic from "next/dynamic";

const ProjectWorkflowPage = dynamic(() => import("@/clientpages/project/ProjectWorkflowPage"), { ssr: false });

export default async function page() {
    const token = await getSession();

    return (
        <ProjectWorkflowPage token={token} />
    )
}
