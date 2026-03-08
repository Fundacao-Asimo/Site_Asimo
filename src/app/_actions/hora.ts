'use server';

import DB_horas from "@/app/_lib/DB_horas";
import type { HoraInfo, HoraProps } from "@/app/_lib/DB_horas";
import { isSessionValid } from "../_lib/session";

export async function query_hora_id(id: number) {
    return await DB_horas.query_hora_id(id);
}

export async function list_horas_geral() {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_horas.list_horas_geral();
}

export async function list_horas_membro(id: number, aprovado: boolean | null = null) {
    return await DB_horas.list_horas_membro(id, aprovado);
}

export async function insert_hora(dados: HoraInfo) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_horas.insert_hora(dados);
}

export async function delete_hora(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_horas.delete_hora(id);
}

export async function edit_hora(dados: HoraProps) {
    return await DB_horas.edit_hora(dados);
}