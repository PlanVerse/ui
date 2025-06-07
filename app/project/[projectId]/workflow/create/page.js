import { getSession } from "@/lib/session";
import dynamic from "next/dynamic";

const ProjectWorkflowCreatePage = dynamic(() => import("@/clientpages/project/ProjectWorkflowCreatePage"), { ssr: false });

export default async function page() {
    const token = await getSession();
    return (
        <ProjectWorkflowCreatePage token={token} />
    )
}