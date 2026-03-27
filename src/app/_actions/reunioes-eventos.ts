'use server';

import type { EventoInfo, EventoProps } from "../_lib/DB_reunioes-eventos";
import DB_eventos from "../_lib/DB_reunioes-eventos";
import { isSessionValid } from "../_lib/session";

export async function query_evento_id(id: number) {
    return await DB_eventos.query_evento_id(id);
}

export async function list_eventos(area: string | null = null, tipo: string | null = null) {
    return await DB_eventos.list_eventos(area, tipo);
}

export async function insert_evento(dados: EventoInfo) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_eventos.insert_evento(dados);
}

export async function delete_evento(id: number) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_eventos.delete_evento(id);
}

export async function edit_evento(dados: EventoProps) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_eventos.edit_evento(dados);
}