'use client';

import z from 'zod';
import Link from "next/link";
import toast from 'react-hot-toast';
import { createUser } from '@/app/_lib/credentials';
import { MembroInfo } from '@/app/_lib/DB_user';
import { upload_foto } from '@/app/_actions/user';
import { useRef, useState } from 'react';
import styles from "./create_page.module.css"

const CreateUserSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string({message: 'Insira uma senha'}).trim().min(8, {message: 'Senha precisa no mínimo 8 caracteres'}),
    confSenha: z.string({message: 'Insira uma confirmação de senha'}).trim().min(1, {message: 'Confirmar Senha não pode ser vazia'}),
}).refine((data) => data.senha === data.confSenha, {
    message: "Senhas não conferem",
    path: ["confSenha"]
});

export default function CreateMembro()
{
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    function handleChangeCpf(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatCPF(e.target.value);
        setCpf(formatted);
    }

    function formatCPF(value: string) {
        value = value.replace(/\D/g, "");
        value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return value;
    }

    function handleChangeTel(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatTel(e.target.value);
        setTel(formatted);
    }

    function formatTel(value: string) {
        value = value.replace(/\D/g, "");
        value = value.slice(0, 11);

        if (value.length <= 10) {
            // Telefone sem o 9 (fixo ou celular antigo)
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            // Celular com 9 dígitos
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
        }

        return value;
    }

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
            foto: formData.get('foto') as File | null,
            matricula: formData.get('matricula') as string,
            area: formData.get('area') as string,
            curso: formData.get('curso') as string,
            telefone: formData.get('telefone') as string,
            endereco: formData.get('endereco') as string,
            cpf: formData.get('cpf') as string
        }

        createUserData.curso = createUserData.curso.toUpperCase();
        if(!createUserData.apelido || createUserData.apelido.trim() === "")
            createUserData.apelido = createUserData.nome_completo.split(' ')[0];

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
        
        let url_nova_foto = null;
        if(createUserData.foto && createUserData.foto.size > 0)
        {
            url_nova_foto = await upload_foto(createUserData.foto, createUserData.nome_completo);

            if(!url_nova_foto){
                toast.error('Não foi possível fazer upload do arquivo');
                return;
            }
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
            formRef.current?.reset();
            setCpf("");
            setTel("");
        }
    }

    return(
        <main>
            <div className={styles.container}>
                <h1 className={styles.title}>Inserir Membro</h1>

                <form
                    ref={formRef}
                    className={styles.form}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await addMembro(formData);
                    }}
                    encType="multipart/form-data"
                >
                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="nome_completo">Nome Completo</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="nome_completo"
                            name="nome_completo"
                            placeholder="Nome do Membro"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="apelido">Apelido</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="apelido"
                            name="apelido"
                            placeholder="Apelido do Membro"
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="cpf">CPF</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={cpf}
                            id="cpf"
                            name="cpf"
                            onChange={handleChangeCpf}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="telefone">Telefone</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={tel}
                            id="telefone"
                            name="telefone"
                            onChange={handleChangeTel}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="endereco">Endereço</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="endereco"
                            name="endereco"
                            placeholder="Endereço"
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="matricula">Matrícula</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="matricula"
                            name="matricula"
                            placeholder="Matrícula do Membro"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="curso">Sigla do Curso</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="curso"
                            name="curso"
                            placeholder="Sigla do Curso"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="area">Área</label>
                        <select
                            className={styles.select}
                            name="area"
                            id="area"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Selecione uma área</option>
                            <option value="Docência">Docência</option>
                            <option value="Projetos">Projetos</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Gestão">Gestão</option>
                            <option value="AudioVisual">AudioVisual</option>
                        </select>
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">E-mail</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email do Membro"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="nasc_date">Data de Nascimento</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="nasc_date"
                            name="nasc_date"
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="senha">Senha</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha do Membro"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="foto">Foto</label>
                        <input
                            className={styles.fileInput}
                            type="file"
                            id="foto"
                            name="foto"
                            accept="image/*"
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="conf-senha">Confirme a Senha</label>
                        <input
                            className={styles.input}
                            type="password"
                            id="conf-senha"
                            name="conf-senha"
                            placeholder="Confirme a senha"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="adm">Diretor</label>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="adm"
                            name="adm"
                        />
                    </section>

                    <button className={styles.button}>Adicionar Membro</button>
                </form>

                <Link href="/main/controle-membros" className={styles.backLink}>
                    Voltar para lista
                </Link>
            </div>
        </main>
    );
}