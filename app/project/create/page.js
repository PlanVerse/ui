import { getSession } from "@/lib/session";
import ProjectCreatePage from "@/clientpages/project/ProjectCreatePage";

export default async function Page() {
    const token = await getSession();

    return (
        <ProjectCreatePage token={token} />
    )
}