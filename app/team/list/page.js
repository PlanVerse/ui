import TeamListPage from "@/clientpages/team/TeamListPage";
import { getSession } from "@/lib/session";
// import { teamListMock } from "@/mock/team";

export default async function Page() {
    const token = await getSession();

    return (
        <TeamListPage token={token} />
    );
};
