"use server";

import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = cookies();
    if (!cookieStore.get("token")) return null;
    return cookieStore.get("token").value;
};

export async function setSession(token) {
    const cookieStore = cookies();
    cookieStore.set("token", token, {
        httpOnly: true
    });
};

export async function removeSession() {
    const cookieStore = cookies();
    cookieStore.delete("token", {
        httpOnly: true
    });
    redirect("/account/signin");
};