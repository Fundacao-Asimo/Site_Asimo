'use server';

import DB_user from "@/app/_lib/DB_user";
import type { MembroInfo, MembroProps } from "@/app/_lib/DB_user";
import { isSessionValid } from "../_lib/session";

export async function query_user_id(id: number) {
    return await DB_user.query_user_id(id);
}

export async function query_user_name(name: string) {
    return await DB_user.query_user_name(name);
}

export async function query_user_email(email: string) {
    return await DB_user.query_user_email(email);
}

export async function list_user() {
    return await DB_user.list_user();
}

export async function list_ids_user() {
    return await DB_user.list_ids_user();
}

export async function insert_user(dados: MembroInfo) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_user.insert_user(dados);
}

export async function delete_user(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_user.delete_user(id);
}

export async function edit_user(dados: MembroProps) {
    return await DB_user.edit_user(dados);
}

export async function upload_foto(foto: File, nome: string) {
    return await DB_user.upload_foto(foto, nome);
}