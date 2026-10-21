'use server';

import DB_horas from "@/app/_lib/DB_horas";
import type { HoraInfo, HoraProps } from "@/app/_lib/DB_horas";
import { isSessionValid } from "../_lib/session";

async function requireSession() {
    const session = await isSessionValid();
    const userId = session ? Number(session.userId) : NaN;

    if (!session || !Number.isSafeInteger(userId) || userId <= 0) {
        throw new Error("Sessão inválida");
    }

    return { userId, isAdm: session.isAdm === true };
}

async function requireAdmin() {
    const session = await requireSession();
    if (!session.isAdm) throw new Error("Sem permissão");
    return session;
}

export async function query_hora_id(id: number) {
    await requireAdmin();
    return await DB_horas.query_hora_id(id);
}

export async function list_horas_geral() {
    await requireAdmin();
    return await DB_horas.list_horas_geral();
}

export async function list_horas_membro(id: number, aprovado: boolean | null = null) {
    const session = await requireSession();
    if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Membro inválido");
    if (!session.isAdm && id !== session.userId) throw new Error("Sem permissão");
    return await DB_horas.list_horas_membro(id, aprovado);
}

export async function insert_hora(dados: Pick<HoraInfo, "horas" | "data" | "tipo" | "descricao">) {
    const session = await requireSession();

    if (
        !dados ||
        !Number.isFinite(dados.horas) || dados.horas <= 0 || dados.horas > 24 ||
        typeof dados.data !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dados.data) ||
        typeof dados.tipo !== "string" || dados.tipo.length > 60 ||
        typeof dados.descricao !== "string" || dados.descricao.trim().length === 0 || dados.descricao.length > 2000
    ) {
        throw new Error("Quantidade de horas inválida");
    }

    const dadosValidados: HoraInfo = {
        horas: dados.horas,
        data: dados.data,
        tipo: dados.tipo,
        descricao: dados.descricao.trim(),
        aprovado: null,
        membro: session.userId,
    };

    return await DB_horas.insert_hora(dadosValidados);
}

export async function delete_hora(id: number) {
    const session = await requireSession();
    if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Registro inválido");

    return await DB_horas.delete_hora(id, session.isAdm ? undefined : session.userId);
}

export async function edit_hora(dados: HoraProps) {
    await requireAdmin();
    return await DB_horas.edit_hora(dados);
}
