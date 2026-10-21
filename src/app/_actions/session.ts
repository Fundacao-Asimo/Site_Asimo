'use server';

import { redirect } from "next/navigation";
import { deleteSessionCookie } from "@/app/_lib/session";

export async function logout() {
    await deleteSessionCookie();
    redirect('/login');
}
