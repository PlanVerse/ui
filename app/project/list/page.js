import ProjectListPage from "@/clientpages/project/ProjectListPage";
import { getSession } from "@/lib/session";

export default async function Page() {
    const token = await getSession();

    return (
        <ProjectListPage token={token} />
    )
}