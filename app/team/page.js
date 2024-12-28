import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
    const token = await getSession();
    if (!token) {
        return redirect("/");
    };

    return (
        <></>
    );
};