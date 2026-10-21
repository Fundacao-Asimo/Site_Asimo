'use server';

import DB_user from "@/app/_lib/DB_user";
import type { MembroInfo, MembroProps } from "@/app/_lib/DB_user";
import { createSessionToken, deleteSessionCookie, isSessionValid } from "../_lib/session";

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

function publicMember(membro: MembroProps, includeEmail = false): MembroProps {
    return {
        ...membro,
        email: includeEmail ? membro.email : "",
        senha: "",
        nasc_date: "",
        ingresso_date: "",
        matricula: "",
        curso: "",
        endereco: "",
        cpf: "",
        desligamento_date: null,
        desligamento_motivo: null,
    };
}

export async function update_cookie() {
    const session = await requireSession();
    const { userId } = session;

    const user = await DB_user.query_user_id(userId);
    if (!user) throw new Error("Membro não encontrado");
    if (!user.ativo) {
        await deleteSessionCookie();
        throw new Error("Conta inativa");
    }

    const status = user.id === 1 || Boolean(
        user.nasc_date && user.matricula && user.curso && user.telefone && user.endereco && user.cpf
    );

    await deleteSessionCookie();
    await createSessionToken(userId, user.adm === true, status);
}

export async function query_user_id(id: number) {
    const session = await requireSession();
    if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Membro inválido");

    const membro = await DB_user.query_user_id(id);
    if (!membro) return null;

    if (session.isAdm || id === session.userId) {
        return { ...membro, senha: "" };
    }

    return publicMember(membro);
}

export async function query_user_name(name: string) {
    await requireAdmin();
    const membro = await DB_user.query_user_name(name);
    return membro ? { ...membro, senha: "" } : null;
}

export async function list_user(ativo: boolean | null = true) {
    const session = await requireSession();
    const membros = await DB_user.list_user(session.isAdm ? ativo : true);

    return session.isAdm
        ? membros.map((membro) => ({ ...membro, senha: "" }))
        : membros.map((membro) => publicMember(membro, true));
}

export async function list_ids_user(ativo: boolean | null = true) {
    await requireAdmin();
    return await DB_user.list_ids_user(ativo);
}

export async function insert_user(dados: MembroInfo) {
    await requireAdmin();
    return await DB_user.insert_user(dados);
}

export async function delete_user(id: number) {
    await requireAdmin();
    return await DB_user.delete_user(id);
}

export async function edit_user(dados: MembroProps) {
    const session = await isSessionValid();
    const userId = session ? Number(session.userId) : NaN;

    if (!session || !Number.isSafeInteger(userId) || userId <= 0) {
        throw new Error("Sessão inválida");
    }

    if (!session.isAdm && dados.id !== userId) {
        throw new Error("Sem permissão");
    }

    if (session.isAdm) return await DB_user.edit_user(dados);

    const dadosPerfil = {
        id: userId,
        nome_completo: dados.nome_completo,
        apelido: dados.apelido,
        email: dados.email,
        senha: dados.senha,
        nasc_date: dados.nasc_date,
        ingresso_date: dados.ingresso_date,
        foto_url: dados.foto_url,
        adm: false,
        matricula: dados.matricula,
        area: dados.area,
        curso: dados.curso,
        telefone: dados.telefone,
        endereco: dados.endereco,
        cpf: dados.cpf,
    };

    return await DB_user.edit_user(dadosPerfil);
}

export async function upload_foto(foto: File, nome: string) {
    await requireSession();
    return await DB_user.upload_foto(foto, nome);
}
