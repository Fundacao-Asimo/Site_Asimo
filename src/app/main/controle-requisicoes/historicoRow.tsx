import Link from "next/link";
import styles from "./historico.module.css";
import { RequiProps } from "@/app/_lib/DB_requisicoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { MembroProps } from "@/app/_lib/DB_user";

export default function HistoricoRow({dados, membro}: {dados: RequiProps, membro: MembroProps | undefined})
{
    return (
        <div className={`${styles.card} ${styles[dados.area]}`}>
            <div className={styles.divCardText}>
                <p className={styles.bold}>{dados.descricao}</p>
                <p>Membro: {membro?.nome_completo}</p>
                <p>Data: {new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
            </div>

            <div>
                <p>{dados.anexo_url && dados.anexo_url.length > 0 ? <Link href={dados.anexo_url} target="_blank"><FontAwesomeIcon icon={faPaperclip}/></Link> : "-"}</p>
            </div>

            <div>
                <p className={`${styles.badge} ${dados.status === null ? styles.pendente : dados.status ? styles.aprovado : styles.rejeitado}`}>{dados.status === null ? "Pendente" : dados.status ? "Aprovado" : "Rejeitado"}</p>
            </div>
        </div>
    );
}