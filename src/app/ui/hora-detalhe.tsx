import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DB_horas, { HoraProps } from "../lib/DB_horas";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/hora-detalhe.module.css";
import { useEffect } from "react";

export default function HoraDetalhe({dados}: {dados: HoraProps})
{
    let status = "";
    if(dados.aprovado === true)
        status = "Aprovado";
    else if(dados.aprovado === false)
        status = "Rejeitado";
    else
        status = "Pendente";

    async function excluir() {
        await DB_horas.delete_hora(dados.id);
    }

    return(
        <div className={styles.box}>
            <p className={styles.data}>{dados.data}</p>

            <p className={styles.descricao}>{dados.descricao}</p>

            <p className={`${styles.badge} ${styles[dados.tipo]}`}>{dados.tipo}</p>

            <p className={styles.horas}>{dados.horas}h</p>

            <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>{status}</span>

            <button className={styles.excluir} onClick={excluir}>
                <FontAwesomeIcon icon={faTrash}/> Excluir
            </button>
        </div>
    );
}