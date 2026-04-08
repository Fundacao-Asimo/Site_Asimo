"use client";

import toast from 'react-hot-toast';
import Link from "next/link";
import styles from "./edit_page.module.css"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EscolaProps } from '@/app/_lib/DB_escolas';
import { edit_escola } from '@/app/_actions/escola';

export default function FormEditEscola({escola}: {escola: EscolaProps | null})
{
    const router = useRouter();
    useEffect(() => {
        if (!escola) {
            toast.error("Erro ao carregar dados!");
            router.push("/main");
            return;
        }
    }, [escola, router]);

    const [tel, setTel] = useState(formatTel(escola?.telefone_responsavel ? escola?.telefone_responsavel : ""));

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

    const editEscola = async (formData: FormData) => {

        const turmaValue = formData.get('turma') as string | null;
        const endereco_urlValue = formData.get('endereco_url') as string | null;
        const telefone_responsavelValue = formData.get('telefone_responsavel') as string | null;

        const editE = {
            id: escola ? escola.id : 0,
            nome: formData.get('nome') as string,
            turma: turmaValue && turmaValue.trim() !== '' ? turmaValue : null,
            endereco: formData.get('endereco') as string,
            endereco_url: endereco_urlValue && endereco_urlValue.trim() !== '' ? endereco_urlValue : null,
            horario: formData.get('horario') as string,
            membros: escola ? escola.membros : [],
            nome_responsavel: formData.get('nome_responsavel') as string,
            telefone_responsavel: telefone_responsavelValue && telefone_responsavelValue.trim() !== '' ? telefone_responsavelValue : null
        }

        const retorno = await edit_escola(editE);
        
        if(!retorno){
            toast.error("Não foi possível editar os dados da escola!");
            return;
        }else{
            toast.success("Dados editados com sucesso!");
            return;
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{escola ? escola.nome : "Carregando..."}</h1>

            <form
                className={styles.form}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await editEscola(formData);
                }}
            >
                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nome">Nome</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="nome"
                        name="nome"
                        defaultValue={escola?.nome}
                        placeholder="Nome da escola"
                        required
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="turma">Turma (Opcional)</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="turma"
                        name="turma"
                        defaultValue={escola?.turma ? escola?.turma : ""}
                        placeholder="Turma ministrada"
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="endereco">Endereço</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="endereco"
                        name="endereco"
                        defaultValue={escola?.endereco}
                        placeholder="Endereço da escola"
                        required
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="endereco_url">Link Endereço (Opcional)</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="endereco_url"
                        name="endereco_url"
                        defaultValue={escola?.endereco_url ? escola?.endereco_url : ""}
                        placeholder="Link do maps do endereço"
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="horario">Dia - Horário</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="horario"
                        name="horario"
                        defaultValue={escola?.horario}
                        placeholder="Ex: Sexta, 13h - 14h"
                        required
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nome_responsavel">Responsável</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="nome_responsavel"
                        name="nome_responsavel"
                        defaultValue={escola?.nome_responsavel}
                        placeholder="Nome do responsável"
                        required
                    />
                </section>

                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="telefone_responsavel">Telefone do Responsável (Opcional)</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={tel}
                        id="telefone_responsavel"
                        name="telefone_responsavel"
                        onChange={handleChangeTel}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                    />
                </section>

                <button className={styles.button}>Salvar Alterações</button>
            </form>

            <Link href="/main/escolas-parceiras" className={styles.backLink}>
                Voltar para lista
            </Link>
        </div>
    );
}