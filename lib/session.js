"use server";

import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
    console.log("sessionToken: ", cookieStore.get("token"));
    if (!cookieStore.get("token")) return null;
    return cookieStore.get("token").value;
}