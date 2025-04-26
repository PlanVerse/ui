"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
    const cookieStore = cookies();
    if (!cookieStore.get("token")) return null;
    return cookieStore.get("token").value;
}

export async function setSession(token, lifeTime) {
    const cookieStore = cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        maxAge: lifeTime ? lifeTime : 60 * 60 * 87600
    });
}

export async function removeSession() {
    const cookieStore = cookies();
    cookieStore.delete("token", {
        httpOnly: true
    });
    redirect("/account/signin");
}
