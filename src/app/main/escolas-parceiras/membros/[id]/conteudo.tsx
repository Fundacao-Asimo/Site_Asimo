"use client";

import { EscolaProps } from "@/app/_lib/DB_escolas";
import { MembroProps } from "@/app/_lib/DB_user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./membros_page.module.css";
import toast from "react-hot-toast";
import { edit_escola } from "@/app/_actions/escola";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const areas = ["Docência", "Projetos", "Marketing", "Gestão", "AudioVisual"];

export default function ConteudoDesignarMembrosEscola({escola, membros}: {escola: EscolaProps, membros: MembroProps[]})
{
    const router = useRouter();
    useEffect(() => {
        if (!escola || membros.length <= 0) {
            toast.error("Erro ao carregar dados!");
            router.push("/main");
            return;
        }
    }, [escola, membros, router]);

    const [selectedMembers, setSelectedMembers] = useState<number[]>(escola.membros || []);

    function toggleMember(id: number) {
        setSelectedMembers(prev =>
            prev.includes(id)
                ? prev.filter(m => m !== id)
                : [...prev, id]
        );
    }

    async function salvar() {
        escola.membros = selectedMembers;
        const retorno = await edit_escola(escola);

        if(!retorno)
            toast.error("Erro ao alocar membros!");
        else
            toast.success("Membros alocados!");
    }

    const membrosPorArea = areas.reduce((acc, area) => {
        acc[area] = membros.filter((m) => m.area === area);
        return acc;
    }, {} as Record<string, MembroProps[]>);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.h2}>Alocar Membros</h2>
                <button className={styles.salvar} onClick={salvar}>Salvar alterações</button>
            </div>

            <div className={styles.controls}>
                {areas.map((area) => (
                    <div className={styles.area} key={area}>
                        <div className={styles.title} style={{ fontSize: "14px", marginBottom: "0.5rem" }}>
                            {area}
                        </div>

                        {membrosPorArea[area].map((m: MembroProps) => (
                            <label key={m.id} className={styles.memberItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedMembers.includes(m.id)}
                                    onChange={() => toggleMember(m.id)}
                                />
                                <span>{m.apelido}</span>
                            </label>
                        ))}
                    </div>
                ))}
            </div>
            <div style={{width: "100%", gap: "1rem", display: "flex", justifyContent: "flex-end", marginTop: "1.5rem"}}>
                <Link href={"/main/escolas-parceiras"} className={styles.btnVoltar}>
                    <FontAwesomeIcon icon={faArrowLeft}/> Voltar para lista
                </Link>
            </div>
        </div>
    );
}