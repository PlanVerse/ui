import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AccountLayout({ children }) {
    const token = await getSession();

    if (token) {
        return redirect("/team/list");
    };

    return (
        <>
            {children}
        </>
    )
}