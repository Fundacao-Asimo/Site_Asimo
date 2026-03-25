import styles from "./page.module.css";
import { RequiProps } from "@/app/_lib/DB_requisicoes";

export default function HistoricoRow({dados}: {dados: RequiProps})
{
    return (
        <div className={`${styles.card} ${styles[dados.area]}`}>
            <div className={styles.divCardText}>
                <p className={styles.bold}>{dados.descricao}</p>
                <p className={styles.data}>Enviado em: {new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
            </div>

            <div>
                <p className={`${styles.badge} ${dados.status === null ? styles.pendente : dados.status ? styles.aprovado : styles.rejeitado}`}>{dados.status === null ? "Pendente" : dados.status ? "Aprovado" : "Rejeitado"}</p>
            </div>
        </div>
    );
}