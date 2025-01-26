import { getSession } from "@/lib/session";

export default async function TeamLayout({ children }) {
    const token = await getSession();

    if (!token) {
        return redirect("/login");
    };

    return (
        <div className="w-full min-h-dvh pt-[88px] px-6 pb-6">
            {children}
        </div>
    )
};