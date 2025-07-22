'use client'

import styles from '@/app/styles/login.module.css';
import z from 'zod';
import toast from 'react-hot-toast';
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
            <form className={styles['login-form']} action={loginAction}>
                <div className={styles['logo-container']}>
                    <h1 className={styles['login-title']}>Fundação Asimo</h1>
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
                </button>
            </form>
        </div>
    );
}