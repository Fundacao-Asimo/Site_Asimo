"use client";

import z from 'zod';
import { MembroProps } from "@/app/_lib/DB_user";
import toast from 'react-hot-toast';
import Link from "next/link";
import styles from "./desativar_page.module.css"
import { edit_user, upload_foto } from '@/app/_actions/user';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormDesativarMembro({membro}: {membro: MembroProps | null})
{
    const router = useRouter();
    useEffect(() => {
        if (!membro) {
            toast.error("Erro ao carregar dados do membro!");
            router.push("/main");
            return;
        }
    }, [membro, router]);

    const formRef = useRef<HTMLFormElement>(null);

    const editMembro = async (formData: FormData) => {

        if(!membro) return;
        membro.ativo = false;
        membro.desligamento_motivo = formData.get("motivo") as string;
        membro.desligamento_date = new Date().toISOString().split('T')[0];
        membro.senha = "";

        const retorno = await edit_user(membro);

        if(!retorno){
            toast.error("Erro!");
        } else {
            toast.success("Membro inativado!");
            router.push("/main/controle-membros");
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{membro ? membro.nome_completo : "Carregando..."}</h1>

            <div className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                    <img
                        src={membro?.foto_url || "/docencia.png"}
                        className={styles.profileImage}
                    />
                </div>
            </div>

            <form
                ref={formRef}
                className={styles.form}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await editMembro(formData);
                }}
            >
                <section className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="motivo">Motivo do afastamento</label>
                    <textarea
                        className={styles.textarea}
                        id="motivo"
                        name="motivo"
                        placeholder="Descreva o motivo do afastamento..."
                        required
                    />
                </section>

                <button className={styles.button}>Desativar Membro</button>
            </form>

            <Link href="/main/controle-membros" className={styles.backLink}>
                Voltar para lista
            </Link>
        </div>
    );
}