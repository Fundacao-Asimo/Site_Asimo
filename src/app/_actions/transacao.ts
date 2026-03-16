'use server';

import DB_transacoes from "../_lib/DB_transacoes";
import type { TransacaoInfo, TransacaoProps } from "../_lib/DB_transacoes";
import { isSessionValid } from "../_lib/session";

export async function query_trans_id(id: number) {
    return await DB_transacoes.query_trans_id(id);
}

export async function list_trans() {
    return await DB_transacoes.list_trans();
}

export async function insert_trans(dados: TransacaoInfo) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_transacoes.insert_trans(dados);
}

export async function delete_trans(id: number) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_transacoes.delete_trans(id);
}

export async function edit_trans(dados: TransacaoProps) {
    return await DB_transacoes.edit_trans(dados);
}

export async function upload_anexo_trans(foto: File, nome: string) {
    return await DB_transacoes.upload_anexo_trans(foto, nome);
}