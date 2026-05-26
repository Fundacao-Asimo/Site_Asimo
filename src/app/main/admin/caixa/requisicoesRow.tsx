import { TransacaoProps } from "@/app/_lib/DB_transacoes";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { query_user_id } from "@/app/_actions/user";
import { useEffect, useState } from "react";
import { MembroProps } from "@/app/_lib/DB_user";

export default function RequisicoesRow({dados, open}: {
    dados: TransacaoProps,
    open: (data: {
        open: boolean;
        transacao: TransacaoProps;
        accept: boolean;
    }) => void
})
{
    const isEntrada = dados.entrada;
    const [membro, setMembro] = useState<MembroProps | null>(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        if(dados.membro)
        {
            const temp = await query_user_id(dados.membro);
            setMembro(temp);
        }
    }

    return (
        <tr>
            <td>{new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</td>

            <td className={styles.bold}>{dados.descricao}</td>

            <td>{membro ? membro.apelido : "Alguém"}</td>

            <td>{dados.categoria}</td>

            <td
                className={
                    isEntrada ? styles.entradaValor : styles.saidaValor
                }
            >
                {isEntrada ? "+" : "-"} R$ {dados.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </td>

            <td>{dados.anexo_url && dados.anexo_url.length > 0 ? <Link href={dados.anexo_url} target="_blank"><FontAwesomeIcon icon={faPaperclip}/></Link> : "-"}</td>

            <td>
                <span className={styles.actionsCell}>
                    <button onClick={() => open({open: true, transacao: dados, accept: true})} className={styles.btnAprovar}><FontAwesomeIcon icon={faCheck} /> Aprovar</button>
                    <button onClick={() => open({open: true, transacao: dados, accept: false})} className={styles.btnRejeitar}><FontAwesomeIcon icon={faXmark} /> Rejeitar</button>
                </span>
            </td>
        </tr>
    );
}