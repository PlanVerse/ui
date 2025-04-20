import ProjectWorkflowPage from "@/clientpages/project/ProjectWorkflowPage";
import { getSession } from "@/lib/session";

export default async function page() {
    const token = await getSession();

    return(
            <ProjectWorkflowPage token={token} />
    )
}