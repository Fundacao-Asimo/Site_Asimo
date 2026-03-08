'use client';

import z from 'zod';
import Link from "next/link";
import toast from 'react-hot-toast';
import { createUser } from '@/app/_lib/credentials';
import { MembroInfo } from '@/app/_lib/DB_user';
import { upload_foto } from '@/app/_actions/user';

const CreateUserSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string({message: 'Insira uma senha'}).trim().min(8, {message: 'Senha precisa no mínimo 8 caracteres'}),
    confSenha: z.string({message: 'Insira uma confirmação de senha'}).trim().min(1, {message: 'Confirmar Senha não pode ser vazia'}),
}).refine((data) => data.senha === data.confSenha, {
    message: "Senhas não conferem",
    path: ["confPassword"]
});

export default function CreateMembro()
{
    const addMembro = async (formData: FormData) => {

        const createUserData = {
            nome_completo: formData.get('nome_completo') as string,
            apelido: formData.get('apelido') as string,
            email: formData.get('email') as string,
            senha: formData.get('senha') as string,
            confSenha: formData.get('conf-senha') as string,
            nasc_date: formData.get('nasc_date') as string,
            ingresso_date: new Date().toISOString().split('T')[0] as string,
            adm: formData.get('adm') !== null,
            foto: formData.get('foto') as File
        }

        const result = CreateUserSchema.safeParse(createUserData);

        if(!result.success)
        {
            let errorMsg = '';

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }
        
        const url_nova_foto = await upload_foto(createUserData.foto, createUserData.nome_completo);

        if(!url_nova_foto){
            toast.error('Não foi possível fazer upload do arquivo');
            return;
        }

        const {confSenha, foto, ...rest} = createUserData;

        const newUser: MembroInfo = {
            ...rest,
            foto_url: url_nova_foto
        }

        const retorno = await createUser(newUser);

        if(retorno.error){
            toast.error(retorno.error);
            return;
        }else if(retorno.success){
            toast.success(retorno.success);
            // formData.set('nome_completo', "");
            // formData.set('apelido', "");
            // formData.set('email', "");
            // formData.set('senha', "");
            // formData.set('conf-senha', "");
            // formData.set('nasc_date', "");
            // formData.set('adm', "");
            // formData.set('foto', "");
        }
    }
    return(
        <main className="create-membro-container">
            <h1>Inserir Membro</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await addMembro(formData);
                }}
                encType="multipart/form-data"
                className="create-membro-form"
            >
                <section className="membro-input">
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="nome_completo"
                        name="nome_completo"
                        placeholder="Nome do Membro"
                        aria-label="Nome do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="apelido"
                        name="apelido"
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
                        id="nasc_date"
                        name="nasc_date"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="file"
                        id="foto"
                        name="foto"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha do Membro"
                        aria-label="Senha do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="password"
                        id="conf-senha"
                        name="conf-senha"
                        placeholder="Confirme Senha do Membro"
                        aria-label="Confirme Senha do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="checkbox"
                        id="adm"
                        name="adm"
                    />
                </section>
                <button>Adicionar Membro</button>
            </form>
            <Link href={'/main/membros'}>Voltar para lista</Link>
        </main>
    );
}