import Link from "next/link";
import styles from "./historico.module.css";
import { RequiProps } from "@/app/_lib/DB_requisicoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { MembroProps } from "@/app/_lib/DB_user";

export default function HistoricoPendRow({membro, dados, open}: {
    membro: MembroProps | undefined,
    dados: RequiProps,
    open: (data: {
        open: boolean;
        req: RequiProps;
        accept: boolean;
    }) => void
})
{
    return (
        <div className={`${styles.card} ${styles[dados.area]}`}>
            <div className={styles.divCardText}>
                <p className={styles.bold}>{dados.descricao}</p>
                <p>Membro: {membro?.nome_completo}</p>
                <p>Data: {new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
            </div>

            <div className={styles.actionsCell}>
                <p>{dados.anexo_url && dados.anexo_url.length > 0 ? <Link href={dados.anexo_url} target="_blank"><FontAwesomeIcon icon={faPaperclip}/></Link> : "-"}</p>
                <button onClick={() => open({open: true, req: dados, accept: true})} className={styles.btnAprovar}><FontAwesomeIcon icon={faCheck} /> Aprovar</button>
                <button onClick={() => open({open: true, req: dados, accept: false})} className={styles.btnRejeitar}><FontAwesomeIcon icon={faXmark} /> Rejeitar</button>
            </div>
        </div>
    );
}