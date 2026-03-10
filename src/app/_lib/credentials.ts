'use server';

import { redirect } from "next/navigation";
import { MembroInfo } from "./DB_user";

import bcrypt from "bcrypt";
import { createSessionToken } from "./session";
import { LoginCredentials } from "../login/page";
import { insert_user, query_user_email } from "../_actions/user";

const PEPPER_SENHA = process.env.PASSWORD_PEPPER!;
const PEPPER_CPF = process.env.CPF_PEPPER!;
const ROUNDS = Number(process.env.BCRYPT_ROUNDS);

export async function createUser(data: MembroInfo)
{
    const password = data.senha + PEPPER_SENHA;
    const cpf = data.cpf + PEPPER_CPF;
    const passwordCrypt = await bcrypt.hash(password, ROUNDS);
    const cpfCrypt = await bcrypt.hash(cpf, ROUNDS);

    data.senha = passwordCrypt;
    data.cpf = cpfCrypt;

    const retorno = await insert_user(data);

    if(retorno)
    {
        return {success: 'Usuário cadastrado com sucesso'};
    }
    return {error: 'Erro ao cadastrar usuário'};
}

export async function validateCredentials(data: LoginCredentials)
{
    const email = data.email;
    const password = data.password + PEPPER_SENHA;

    const user = await query_user_email(email);

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