import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HoraProps } from "../_lib/DB_horas";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../_styles/hora-detalhe.module.css";
import { delete_hora } from "../_actions/hora";

export default function HoraDetalhe({
    dados,
    onDelete
}: {
    dados: HoraProps,
    onDelete: (id: number) => void
})
{
    let status = "";
    if(dados.aprovado === true)
        status = "Aprovado";
    else if(dados.aprovado === false)
        status = "Rejeitado";
    else
        status = "Pendente";

    async function excluir() {
        await delete_hora(dados.id);
        onDelete(dados.id); // 🔥 avisa o pai
    }

    return(
        <>
            <div className={`${styles.box} ${styles.desktop}`}>
                <p className={styles.data}>{new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
                <p className={styles.descricao}>{dados.descricao}</p>
                <p className={`${styles.badge} ${styles[dados.tipo]}`}>{dados.tipo}</p>
                <p className={styles.horas}>{dados.horas}h</p>
                <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>{status}</span>

                <button className={styles.excluir} onClick={excluir}>
                    <FontAwesomeIcon icon={faTrash}/> Excluir
                </button>
            </div>
            <div className={`${styles.box} ${styles.mobile}`}>
                <div className={styles.top}>
                    <p className={styles.data}>{new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <p className={styles.horas}>{dados.horas}h</p>
                </div>

                <p className={styles.descricao}>{dados.descricao}</p>

                <div className={styles.bottom}>
                    <p className={`${styles.badge} ${styles[dados.tipo]}`}>
                        {dados.tipo}
                    </p>
                    <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                        {status}
                    </span>
                </div>

                <button className={styles.excluir} onClick={excluir}>
                    <FontAwesomeIcon icon={faTrash}/> Excluir
                </button>
            </div>
        </>
    );
}