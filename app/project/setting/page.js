import ProjectSettingPage from "@/clientpages/project/ProjectSettingPage";
import { getSession } from "@/lib/session";

export default async function Page() {
    const token = await getSession();

    return (
        <ProjectSettingPage token={token} />
    )
}