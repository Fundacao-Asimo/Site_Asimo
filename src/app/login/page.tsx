'use client'

import styles from './login.module.css';
import z from 'zod';
import toast from 'react-hot-toast';
import { validateCredentials } from '@/app/_lib/credentials';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(2, {message: 'Senha requer no mínimo 2 caracteres'})
});

export interface LoginCredentials {
    email: string,
    password: string
}

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginAction = async (formData: FormData) => {
        setIsLoading(true);

        try {
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
            }
        } catch {
            toast.error('Não foi possível entrar. Tente novamente.');
        } finally {
            setIsLoading(false);
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

                    <form className={styles.form} action={loginAction} onSubmit={() => setIsLoading(true)}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="seu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" autoComplete="current-password" />
                        </div>
                        <button className={styles.loginButton} disabled={isLoading} aria-busy={isLoading}>
                            {isLoading && <span className={styles.spinner} aria-hidden="true" />}
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <Link className={styles.voltar2} href={"/"}>← Voltar para página principal</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
