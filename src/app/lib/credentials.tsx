'use server';

import { redirect } from "next/navigation";
import DB_user, { MembroInfo } from "./DB_user";

import bcrypt from "bcrypt";
import { createSessionToken } from "./session";
import { LoginCredentials } from "../login/page";

export async function createUser(data: MembroInfo)
{
    const password = data.senha;
    const passwordCrypt = await bcrypt.hash(password,10);

    data.senha = passwordCrypt;

    const retorno = await DB_user.insert_user(data);

    if(retorno)
    {
        return {success: 'Usuário cadastrado com sucesso'};
    }
    return {error: 'Erro ao cadastrar usuário'};
}

export async function validateCredentials(data: LoginCredentials)
{
    const email = data.email;
    const password = data.password;

    const user = await DB_user.query_user_email(email);

    if(!user)
        return {error: 'Usuário não encontrado'};
    const isMatch = await bcrypt.compare(password, user.senha);

    if(isMatch)
    {
        await createSessionToken(user.id, user.adm);
        redirect('/main');
    }
    else{
        return {error: 'Usuario ou senhas incorretos'};
    }
} 