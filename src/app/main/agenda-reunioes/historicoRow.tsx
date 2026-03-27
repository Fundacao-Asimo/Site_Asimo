import { EventoProps } from "@/app/_lib/DB_reunioes-eventos";
import styles from "./page.module.css";
import Link from "next/link";

export default function HistoricoRow({dados}: {dados: EventoProps})
{
    return (
        <div className={`${styles.card} ${styles[dados.area]}`}>
            <div className={styles.divCardText}>
                <p className={styles.bold}>{dados.descricao}</p>
                <p className={styles.data}>Data: {new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
            </div>

            <div>
                <Link href={`/main/controle-frequencia/${dados.id}`} className={`${styles.badge} `}>Lançar Presença</Link>
            </div>
        </div>
    );
}