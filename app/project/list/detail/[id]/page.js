import ProjectDetailPage from "@/clientpages/project/ProjectDetailPage";
import { getSession } from "@/lib/session";

export default async function page() {
    const token = await getSession();
        return (
            <ProjectDetailPage token={token} />
        )
}