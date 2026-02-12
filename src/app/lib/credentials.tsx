'use server';

import { redirect } from "next/navigation";
import ConexaoBD, { MembroProps } from "./ConexaoBD";

import bcrypt from "bcrypt";
import { createSessionToken } from "./session";
import { LoginCredentials } from "../login/page";
import DB from "./ConexaoBD";

export async function createUser(data: MembroProps)
{
    const password = data.senha;
    const passwordCrypt = await bcrypt.hash(password,10);

    data.senha = passwordCrypt;

    const retorno = await DB.insert_user(data);

    if(retorno)
    {
        return null;
    }
    return {error: 'Usuário não inserido'};
}

export async function validateCredentials(data: LoginCredentials)
{
    const email = data.email;
    const password = data.password;

    const user = await DB.query_user_email(email);

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