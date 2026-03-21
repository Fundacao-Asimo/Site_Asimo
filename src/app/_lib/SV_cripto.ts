import crypto from "crypto";
import bcrypt from "bcrypt";

const ALGORITHM = "aes-256-cbc";
const KEY = Buffer.from(process.env.CPF_SECRET_KEY!, "hex");

const PEPPER_SENHA = process.env.PASSWORD_PEPPER!;
const PEPPER_CPF = process.env.CPF_PEPPER!;
const ROUNDS = Number(process.env.BCRYPT_ROUNDS);

// 🔐 Criptografar CPF (com IV aleatório)
function encryptCPF(cpf: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const value = cpf + PEPPER_CPF;

    let encrypted = cipher.update(value, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
}

// 🔓 Descriptografar CPF
function decryptCPF(data: string): string {
    const [ivHex, encrypted] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    // remove pepper antes de retornar
    return decrypted.replace(PEPPER_CPF, "");
}

// 🔐 Hash da senha
async function encryptSenha(senha: string): Promise<string> {
    const password = senha + PEPPER_SENHA;
    return await bcrypt.hash(password, ROUNDS);
}

// 🔍 Comparar senha
async function desencryptSenha(senha: string, hash: string): Promise<boolean> {
    const password = senha + PEPPER_SENHA;
    return await bcrypt.compare(password, hash);
}

const SV_cripto = {
    encryptCPF,
    decryptCPF,
    encryptSenha,
    desencryptSenha
};

export default SV_cripto;