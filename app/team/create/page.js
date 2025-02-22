import { getSession } from "@/lib/session";
import TeamCreatePage from "@/clientpages/team/TeamCreatePage";

export default async function Page() {
    const token = await getSession();

    return (
        <TeamCreatePage token={token} />
    )
}
