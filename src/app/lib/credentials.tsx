'use server';

import { redirect } from "next/navigation";
import ConexaoBD from "./ConexaoBD";

import bcrypt from "bcrypt";
import { createSessionToken } from "./session";
import { MembroProps } from "../ui/membro-card";
import { LoginCredentials } from "../login/page";

const userDBFile = 'usuarios-db.json';

export async function createUser(data: MembroProps){

    const password = data.password;

    const passwordCrypt = await bcrypt.hash(password,10);
    const users = await ConexaoBD.retornaBD(userDBFile);

    for(const user of users)
    {
        if(user.email === data.email){
            return {error: 'Usuário ou senha incorretos'};
        }
    }

    const novoUser = data;
    novoUser.id = (users[users.length - 1].id) + 1;
    novoUser.password = passwordCrypt;

    users.push(novoUser);
    ConexaoBD.armazenaBD(userDBFile,users);
    return {success: 'Usuário Criado com Sucesso'}

}

export async function validateCredentials(data: LoginCredentials){

    const email = data.email;
    const password = data.password;

    const usuariosDB = await ConexaoBD.retornaBD(userDBFile);

    const user = usuariosDB.find(user => user.email === email);

    if(!user)
        return {error: 'Usuário não encontrado'};
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch)
    {
        await createSessionToken(user.id, user.adm);
        redirect('/main');
    }
    else{
        return {error: 'Usuario ou senhas incorretos'}
    }

} 