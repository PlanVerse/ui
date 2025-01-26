import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default function TeamMemberPage() {
    // const token = await getSession();
    // if (!token) {
    //     return redirect("/");
    // };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                팀 관리
            </h1>
        </>
    )
}