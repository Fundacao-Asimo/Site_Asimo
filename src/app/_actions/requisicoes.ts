'use server';

import type { RequiInfo, RequiProps } from "../_lib/DB_requisicoes";
import { isSessionValid } from "../_lib/session";
import DB_req from "../_lib/DB_requisicoes";

export async function query_req_id(id: number) {
    return await DB_req.query_req_id(id);
}

export async function list_req(idMembro: number = 0) {
    return await DB_req.list_req(idMembro);
}

export async function insert_req(dados: RequiInfo) {
    return await DB_req.insert_req(dados);
}

export async function delete_req(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_req.delete_req(id);
}

export async function edit_req(dados: RequiProps) {
    return await DB_req.edit_req(dados);
}

export async function upload_anexo_req(foto: File, nome: string) {
    return await DB_req.upload_anexo_req(foto, nome);
}