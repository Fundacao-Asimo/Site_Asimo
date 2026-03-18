'use server';

import DB_caixa from "../_lib/DB_caixa";
import { isSessionValid } from "../_lib/session";

export async function query_caixa() {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_caixa.query_caixa();
}

export async function add_caixa(valor: number, entrada: boolean) {
    const session = await isSessionValid()

    if(!session || !session.isAdm)
        throw new Error("Sem permissão")

    return await DB_caixa.add_caixa(valor, entrada);
}