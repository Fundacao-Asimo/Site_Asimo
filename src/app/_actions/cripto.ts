'use server';

import SV_cripto from "../_lib/SV_cripto";

export async function criptografar_senha(senha: string) {
    return await SV_cripto.encryptSenha(senha);
}

export async function descriptografar_senha(senha: string, hash: string) {
    return await SV_cripto.desencryptSenha(senha, hash);
}

export async function criptografar_cpf(cpf: string) {
    return SV_cripto.encryptCPF(cpf);
}

export async function descriptografar_cpf(hash: string) {
    return SV_cripto.decryptCPF(hash);
}