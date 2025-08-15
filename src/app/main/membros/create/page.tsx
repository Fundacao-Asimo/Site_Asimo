'use client';

import z from 'zod';
import Link from "next/link";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import { createUser } from '@/app/lib/credentials';
import { MembroProps } from '@/app/ui/membro-card';

const CreateUserSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha precisa no mínimo 4 caracteres'}),
    confPassword: z.string({message: 'Insira uma confirmação de senha'}).trim().min(1, {message: 'Confirmar Senha não pode ser vazia'}),
}).refine((data) => data.password === data.confPassword, {
    message: "Senhas não conferem",
    path: ["confPassword"]
});

export default function CreateMembro() {

    const router = useRouter();

    const addMembro = async (formData: FormData) => {

        const createUserData = {
            id: 0 as number,
            nome: formData.get('nome') as string,
            nick: formData.get('nick') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confPassword: formData.get('conf-password') as string,
            nasc: formData.get('data_nasc') as string,
            ingresso: new Date().toISOString().split('T')[0] as string,
            adm: false as boolean,
            foto: null
        }

        const result = CreateUserSchema.safeParse(createUserData);

        if(!result.success){

            let errorMsg = '';

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }
        
        const retorno = await createUser(createUserData as MembroProps);

        if(retorno.error){
            toast.error(retorno.error);
            return;
        }else if(retorno.success){
            toast.success(retorno.success);
            router.push('/login');
        }
    }


    return(
        <main className="create-membro-container">
            <h1>Inserir Inserir Membro</h1>
            <form action={addMembro} className="create-membro-form">
                <section className="membro-input">
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome do Membro"
                        aria-label="Nome do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="nick"
                        name="nick"
                        placeholder="Apelido do Membro"
                        aria-label="Apelido do Membro"
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email do Membro"
                        aria-label="Email do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="date"
                        id="data_nasc"
                        name="data_nasc"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Senha do Membro"
                        aria-label="Senha do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="password"
                        id="conf-password"
                        name="conf-password"
                        placeholder="Confirme Senha do Membro"
                        aria-label="Confirme Senha do Membro"
                        required
                    />
                </section>
                <button>Adicionar Membro</button>
            </form>
            <Link href={'/main/membros'}>Voltar para lista</Link>
        </main>
    );
}