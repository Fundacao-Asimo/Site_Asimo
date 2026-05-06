'use client'

import styles from './login.module.css';
import z from 'zod';
import toast from 'react-hot-toast';
import { validateCredentials } from '@/app/_lib/credentials';
import Image from 'next/image';
import Link from 'next/link';
import { criptografar_cpf, descriptografar_cpf } from '../_actions/cripto';

const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(2, {message: 'Senha requer no mínimo 2 caracteres'})
});

export interface LoginCredentials {
    email: string,
    password: string
}

export default function LoginPage(){

    const loginAction = async (formData: FormData) => {
        if(formData.get('cpf') as string !== "")
            console.log(await criptografar_cpf(formData.get('cpf') as string));

        if(formData.get('descpf') as string !== "")
            console.log(await descriptografar_cpf(formData.get('descpf') as string));

        const loginData: LoginCredentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        const result = LoginSchema.safeParse(loginData);

        if(!result.success){

            let errorMsg = '';

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }
        
        const loginValidacao = await validateCredentials(loginData);

        if(loginValidacao){
            toast.error(loginValidacao.error);
            return;
        }
        
    }

    return (
        <div className={styles.container}>

            {/* LADO ESQUERDO */}
            <div className={styles.leftSide}>
                <div className={styles.brandBox}>
                    <Image src={"/Robo.png"} alt="Robo da Fundação Asimo" width={200} height={200} className={styles.logo}/>

                    <h1 className={styles.title}>
                        FUNDAÇÃO ASIMO
                    </h1>

                    <p className={styles.subtitle}>
                        Portal do Membro
                    </p>

                    <div className={styles.features}>
                        <p>✔ Banco de Horas</p>
                        <p>✔ Free Time</p>
                        <p>✔ Presenças</p>
                        <p>✔ Gestão Integrada</p>
                    </div>

                    <Link className={styles.voltar} href={"/"}>← Voltar para página principal</Link>
                </div>
            </div>

            {/* LOGIN */}
            <div className={styles.rightSide}>
                <div className={styles.card}>

                <h2 className={styles.loginTitle}>Entrar</h2>
                <p className={styles.loginSubtitle}>
                    Acesse sua conta
                </p>

                    <form className={styles.form} action={loginAction}>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input type="email" name="email" id="email" placeholder="seu@email.com" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Cpf</label>
                            <input type="text" name="cpf" id="cpf" placeholder="seu@email.com" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>desCpf</label>
                            <input type="text" name="descpf" id="descpf" placeholder="seu@email.com" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Senha</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" />
                        </div>
                        <button className={styles.loginButton}>Entrar</button>
                        <Link className={styles.voltar2} href={"/"}>← Voltar para página principal</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}