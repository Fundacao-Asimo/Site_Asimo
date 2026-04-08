'use client';

import { useState } from "react";
import styles from "./modal.module.css";
import toast from "react-hot-toast";
import { insert_escola } from "@/app/_actions/escola";
import { EscolaProps } from "@/app/_lib/DB_escolas";

export default function ModalNewEscola({ onClose, onSuccess }: {onClose: () => void, onSuccess: (e: EscolaProps) => void})
{
    const [tel, setTel] = useState("");

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

    async function cadastrar(formData: FormData)
    {
        const turmaValue = formData.get('turma') as string | null;
        const endereco_urlValue = formData.get('endereco_url') as string | null;
        const telefone_responsavelValue = formData.get('telefone_responsavel') as string | null;

        const newE = {
            nome: formData.get('nome') as string,
            turma: turmaValue && turmaValue.trim() !== '' ? turmaValue : null,
            endereco: formData.get('endereco') as string,
            endereco_url: endereco_urlValue && endereco_urlValue.trim() !== '' ? endereco_urlValue : null,
            horario: formData.get('horario') as string,
            membros: [],
            nome_responsavel: formData.get('nome_responsavel') as string,
            telefone_responsavel: telefone_responsavelValue && telefone_responsavelValue.trim() !== '' ? telefone_responsavelValue : null
        }
        
        const retorno = await insert_escola(newE);

        if(!retorno){
            toast.error("Não foi possível cadastrar a escola!");
            return;
        }else{
            toast.success("Escola cadastrada com sucesso!");
            onSuccess(retorno);
            onClose();
        }
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>
                    <h2>Cadastrar Escola</h2>
                    <button onClick={onClose} className={styles.close}>×</button>
                </div>
                <form
                    className={styles.lista}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await cadastrar(formData);
                    }}
                    encType="multipart/form-data"
                >

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="nome">Nome</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="nome"
                            name="nome"
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

                    <button className={styles.button}>Cadastrar</button>

                </form>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.btn}>
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
}