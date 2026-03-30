'use server';

import DB_escolas from "../_lib/DB_escolas";
import type { EscolaInfo, EscolaProps } from "@/app/_lib/DB_escolas";
import { isSessionValid } from "../_lib/session";

export async function query_escola_id(id: number) {
    return await DB_escolas.query_escola_id(id);
}

export async function list_escolas() {
    return await DB_escolas.list_escolas();
}

export async function list_escolas_membro(id: number) {
    return await DB_escolas.list_escolas_membro(id);
}

export async function delete_escola(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_escolas.delete_escola(id);
}

export async function insert_escola(dados: EscolaInfo) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_escolas.insert_escola(dados);
}

export async function edit_escola(dados: EscolaProps) {
    return await DB_escolas.edit_escola(dados);
}