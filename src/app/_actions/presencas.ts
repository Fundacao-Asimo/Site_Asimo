'use server';

import type { PresencaInfo, PresencaProps } from "../_lib/DB_presencas";
import DB_presenca from "../_lib/DB_presencas";
import { isSessionValid } from "../_lib/session";

export async function query_presenca_id(id: number) {
    return await DB_presenca.query_presenca_id(id);
}

export async function list_presencas(idMembro: number = 0, idEvento: number = 0) {
    return await DB_presenca.list_presencas(idMembro, idEvento);
}

export async function insert_lista_presencas(dados: PresencaInfo[]) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_presenca.insert_lista_presencas(dados);
}

export async function insert_presenca(dados: PresencaInfo) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_presenca.insert_presenca(dados);
}

export async function delete_presenca(id: number) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_presenca.delete_presenca(id);
}

export async function edit_presenca(dados: PresencaProps) {
    const session = await isSessionValid();

    if(!session || !session.isAdm)
        throw new Error("Sem permissão");

    return await DB_presenca.edit_presenca(dados);
}