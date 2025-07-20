'use client'

import styles from '@/app/styles/login.module.css';
import Image from 'next/image';
import z from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { validateCredentials } from '@/app/lib/credentials';

export interface LoginCredentials {
    email: string,
    password: string
}

const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(2, {message: 'Senha requer no mínimo 2 caracteres'})
})

export default function LoginPage(){

    const loginAction = async (formData: FormData) => {

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
        <div className={styles['login-container']}>
            <div className={styles['login-background']}>
                <Image 
                    src="/campo.avif"
                    alt="Campo de futebol"
                    fill
                    className={styles['background-image']}
                    priority
                />
                <div className={styles.overlay}></div>
            </div>
            
            <form className={styles['login-form']} action={loginAction}>
                <div className={styles['logo-container']}>
                    <h1 className={styles['login-title']}>⚽ Futebol League Manager</h1>
                    <p className={styles['login-subtitle']}>Entre para gerenciar sua liga!</p>
                </div>
                
                <div className={styles['inputs-container']}>
                    <section className={styles['user-input']}>
                        <div className={styles['input-icon']}>
                            <span className={styles.icon}>👤</span>
                        </div>
                        <input type="email" name="email" id="email" placeholder="Email" className={styles['form-input']}/>
                    </section>
                    
                    <section className={styles['user-input']}>
                        <div className={styles['input-icon']}>
                            <span className={styles.icon}>🔒</span>
                        </div>
                        <input type="password" name="password" id="password" placeholder="Senha" className={styles['form-input']}/>
                    </section>
                </div>
                
                <button className={styles['login-button']} type="submit">
                    <span className={styles['button-text']}>Entrar</span>
                    <span className={styles['button-icon']}>⚽</span>
                </button>
                
                <div className={styles['link-cadastrar']}>
                    Não tem conta? Clique <Link className={styles['btn-criar-conta']} href="/create">aqui</Link>
                </div>
            </form>
        </div>
    )
}