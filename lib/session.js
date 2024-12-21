"use server";

import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
    if (!cookieStore.get("token")) return null;
    return cookieStore.get("token").value;
}