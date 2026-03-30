"use client";

import z from 'zod';
import { MembroProps } from "@/app/_lib/DB_user";
import toast from 'react-hot-toast';
import Link from "next/link";
import styles from "./perfil_page.module.css"
import { edit_user, upload_foto } from '@/app/_actions/user';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateUserSchema = z.object({
    email: z.string(),
    //email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string(),
    confSenha: z.string(),
}).refine((data) => data.senha === data.confSenha, {
    message: "Senhas não conferem",
    path: ["confSenha"]
});

export default function FormPerfil({membro}: {membro: MembroProps | null})
{
    const router = useRouter();
    useEffect(() => {
        if (!membro) {
            toast.error("Erro ao carregar dados do membro!");
            router.push("/main");
            return;
        }
    }, [membro, router]);

    const [isEditing, setIsEditing] = useState(false);
    const [tel, setTel] = useState(formatTel(membro?.telefone ? membro.telefone : ""));

    // 🆕 preview da imagem
    const [preview, setPreview] = useState<string | null>(null);

    // 🆕 ref do input file
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formRef = useRef<HTMLFormElement>(null);

    // 🆕 preview da imagem
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Imagem muito grande (máx 2MB)");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    }

    function handleChangeTel(e: React.ChangeEvent<HTMLInputElement>) {
        setTel(formatTel(e.target.value));
    }

    function formatTel(value: string) {
        value = value.replace(/\D/g, "").slice(0, 11);

        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
        }

        return value;
    }

    const editMembro = async (formData: FormData) => {

        const editUserData = {
            id: membro ? membro.id : 0,
            nome_completo: formData.get('nome_completo') as string,
            apelido: formData.get('apelido') as string,
            email: formData.get('email') as string,
            senha: formData.get('senha') as string,
            confSenha: formData.get('conf-senha') as string,
            nasc_date: formData.get('nasc_date') as string,
            ingresso_date: new Date().toISOString().split('T')[0],
            adm: membro?.adm ? membro.adm : false,
            foto: fileInputRef.current?.files?.[0] || null,
            matricula: formData.get('matricula') as string,
            area: membro?.area ? membro.area : "",
            curso: formData.get('curso') as string,
            telefone: formData.get('telefone') as string,
            endereco: formData.get('endereco') as string,
            cpf: membro?.cpf ? membro.cpf : ""
        }

        editUserData.curso = editUserData.curso.toUpperCase();

        const result = CreateUserSchema.safeParse(editUserData);

        if(!result.success)
        {
            toast.error(result.error.issues.map(i => i.message).join('. '));
            return;
        }

        let url_nova_foto = null;

        if(editUserData.foto)
        {
            url_nova_foto = await upload_foto(editUserData.foto, editUserData.nome_completo);

            if(!url_nova_foto){
                toast.error('Erro ao fazer upload');
                return;
            }
        }

        const {confSenha, foto, ...rest} = editUserData;

        const newUser = {
            ...rest,
            foto_url: url_nova_foto || membro?.foto_url || null
        }

        const retorno = await edit_user(newUser);

        if(!retorno){
            toast.error("Erro ao editar");
        } else {
            toast.success("Editado com sucesso!");
            setIsEditing(false);
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{membro ? membro.nome_completo : "Carregando..."}</h1>

            {/* 🆕 FOTO ESTILO LINKEDIN */}
            <div className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                    <img
                        src={preview || membro?.foto_url || "/docencia.png"}
                        onClick={() => isEditing && fileInputRef.current?.click()}
                        className={styles.profileImage}
                    />

                    <div className={styles.imageOverlay} onClick={() => isEditing && fileInputRef.current?.click()}>
                        ✏️
                    </div>
                </div>

                <input
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    disabled={!isEditing}
                />
            </div>

            <form
                ref={formRef}
                className={styles.form}
                onSubmit={async (e) => {
                    if (!isEditing) {
                        e.preventDefault();
                        setIsEditing(true); // 👈 BLOQUEIA submit
                        return;
                    }
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await editMembro(formData);
                }}
            >
                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nome_completo">Nome Completo</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="nome_completo"
                        name="nome_completo"
                        placeholder="Nome do Membro"
                        defaultValue={membro?.nome_completo}
                        required
                        disabled={!isEditing}
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
                        defaultValue={membro?.apelido}
                        disabled={!isEditing}
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
                        // required
                        disabled={!isEditing}
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
                        defaultValue={membro?.endereco}
                        disabled={!isEditing}
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
                        defaultValue={membro?.matricula}
                        // required
                        disabled={!isEditing}
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
                        defaultValue={membro?.curso}
                        // required
                        disabled={!isEditing}
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">E-mail</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email do Membro"
                        defaultValue={membro?.email}
                        // required
                        disabled={!isEditing}
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nasc_date">Data de Nascimento</label>
                    <input
                        className={styles.input}
                        type="date"
                        id="nasc_date"
                        name="nasc_date"
                        defaultValue={membro?.nasc_date}
                        disabled={!isEditing}
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
                        // required
                        disabled={!isEditing}
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
                        // required
                        disabled={!isEditing}
                    />
                </section>

                <button className={`${styles.button} ${isEditing ? styles.verde : styles.azu}`}>
                    {isEditing ? "Salvar Alterações" : "Editar Perfil"}
                </button>
            </form>
        </div>
    );
}