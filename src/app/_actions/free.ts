'use server';

import DB_free from "@/app/_lib/DB_free";
import type { FreeTimeInfo, FreeTimeProps } from "@/app/_lib/DB_free";
import { isSessionValid } from "../_lib/session";

export async function query_free_id(id: number) {
    const session = await isSessionValid();
    if (!session || !session.isAdm) throw new Error("Sem permissão");
    return await DB_free.query_free_id(id);
}

export async function insert_free(dados: FreeTimeInfo) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_free.insert_free(dados);
}

export async function delete_free(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_free.delete_free(id);
}

export async function edit_free(dados: FreeTimeProps) {
    const session = await isSessionValid();
    const userId = session ? Number(session.userId) : NaN;

    if (!session || !Number.isSafeInteger(userId) || userId <= 0)
        throw new Error("Sessão inválida");

    if (session.isAdm) return await DB_free.edit_free(dados);

    return await DB_free.edit_free({ ...dados, membro: userId }, userId);
}

export async function list_free() {
    const session = await isSessionValid();
    if (!session || !session.isAdm) throw new Error("Sem permissão");
    return await DB_free.list_free();
}

export async function query_free_membro(id: number) {
    const session = await isSessionValid();
    const userId = session ? Number(session.userId) : NaN;

    if (!session || !Number.isSafeInteger(userId) || userId <= 0) {
        throw new Error("Sessão inválida");
    }

    if (!session.isAdm && id !== userId) throw new Error("Sem permissão");
    return await DB_free.query_free_membro(id);
}

export async function insert_free_vazia(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_free.insert_free_vazia(id);
}
