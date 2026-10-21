'use server';

import { redirect } from "next/navigation";
import { MembroInfo } from "./DB_user";

import { createSessionToken } from "./session";
import { LoginCredentials } from "../login/page";
import { insert_user } from "../_actions/user";
import DB_user from "./DB_user";
import SV_cripto from "./SV_cripto";

export async function createUser(data: MembroInfo)
{
    data.senha = await SV_cripto.encryptSenha(data.senha);
    data.cpf = SV_cripto.encryptCPF(data.cpf);

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

    const user = await DB_user.query_user_email(email);

    if(!user || user?.ativo === false)
        return {error: 'Usuario ou senhas incorretos'};

    const isMatch = await SV_cripto.desencryptSenha(data.password, user.senha);

    if(isMatch)
    {
        let status = true;
        if(user.id !== 1 && (user.nasc_date === "" || user.nasc_date === null || user.matricula === "" || user.matricula === null || user.curso === "" || user.curso === null || user.telefone === "" || user.telefone === null || user.endereco === "" || user.endereco === null || user.cpf === "" || user.cpf === null))
        {
            status = false;
        }
        await createSessionToken(user.id, user.adm, status);
        if(status)
            redirect('/main');
        else
            redirect("/main/perfil");
    }
    else{
        return {error: 'Usuario ou senhas incorretos'};
    }
}
