"use client";

import { MembroProps } from "@/app/_lib/DB_user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./list-membros.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ListaMambros({list}: {list: MembroProps[]})
{
    const router = useRouter();
    useEffect(() => {
        if(list.length === 0)
        {
            toast.error("Não foi possível acessar dados!");
            router.push("/main");
        }
    }, [list, router]);

    const [filtro, setFiltro] = useState<MembroProps[]>(list);

    function handleChangeBusca(e: React.ChangeEvent<HTMLInputElement>) {
        const palavra = (e.target.value) as string;

        if (!palavra) {
            setFiltro(list);
            return;
        }

        setFiltro(list.filter((m: MembroProps) => normalizeText(m.nome_completo).includes(normalizeText(palavra))));
    }

    function normalizeText(text: string) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    return(
        <div className={styles.container}>
            <input
                className={styles.searchInput}
                type="text"
                onChange={handleChangeBusca}
                placeholder="Buscar por nome ou área..."
            />

            <div className={styles.grid}>
                {filtro.length === 0 && <h1>Não há membros com esse nome!</h1>}

                {filtro.map((m) => (
                    <MembroComp key={m.id} membro={m} />
                ))}
            </div>
        </div>
    );
}

function MembroComp({ membro }: { membro: MembroProps })
{
    membro.telefone = membro.telefone.replace(/\D/g, "");

    const iniciais = membro.nome_completo
        .split(" ")
        .map(n => n[0])
        .slice(0, 2)
        .join("");

    function getAreaClass(area: string) {
        const map: any = {
            Projetos: "projetos",
            Marketing: "marketing",
            Docência: "docencia",
            Gestão: "gestao",
            AudioVisual: "audiovisual",
            Diretoria: "diretoria"
        };

        return styles[map[area]] || "";
    }

    return (
        <div className={styles.card}>
            <div className={styles.section}>
                <div className={`${styles.avatar} ${getAreaClass(membro.area)}`}>
                    {iniciais}
                </div>

                <div className={styles.nome}>{membro.nome_completo}</div>
            </div>

            <div className={styles.section}>
                <div className={`${styles.area} ${getAreaClass(membro.area)}`}>
                    {membro.area}
                </div>

                <div className={styles.actions}>
                    <Link className={styles.whatssap} target="_blank" href={`https://wa.me/55${membro.telefone}`}>
                        <FontAwesomeIcon icon={faWhatsapp}/>
                    </Link>
                    <Link className={styles.email} target="_blank" href={`mailto:${membro.email}`}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}