import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./hora-detalhe.module.css"
import { HoraProps } from "@/app/_lib/DB_horas";
import { MembroProps } from "@/app/_lib/DB_user";
import { delete_hora } from "@/app/_actions/hora";
import toast from "react-hot-toast";

export default function HoraDetalhe({dados, membro, onDelete, popUp}: {dados: HoraProps, membro: MembroProps | undefined, onDelete: (id: number) => void, popUp: (data: {open: boolean; hora: HoraProps; accept: boolean;}) => void})
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
        onDelete(dados.id);
        toast.success("Registro deletado!");
    }

    return(
        <>
            <div className={`${styles.box} ${styles.desktop}`}>
                <p className={styles.data}>{new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
                {membro && <p className={styles.nome}>{membro.nome_completo}</p>}
                <p className={styles.descricao}>{dados.descricao}</p>
                <p className={`${styles.badge} ${styles[dados.tipo]}`}>{dados.tipo}</p>
                <p className={styles.horas}>{dados.horas}h</p>
                <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>{status}</span>

                {status === "Pendente" ?
                <div className={styles.actionsCell}>
                    <button className={styles.btnAprovar} onClick={() => popUp({open: true, hora: dados, accept: true})}>
                        <FontAwesomeIcon icon={faCheck} /> Aprovar
                    </button>
                    <button className={styles.btnRejeitar} onClick={() => popUp({open: true, hora: dados, accept: false})}>
                        <FontAwesomeIcon icon={faXmark} /> Rejeitar
                    </button>
                </div>
                :
                <div className={styles.actionsCell}>
                    <button className={styles.excluir} onClick={excluir}>
                        <FontAwesomeIcon icon={faTrash}/> Excluir
                    </button>
                </div>}
            </div>
            <div className={`${styles.box} ${styles.mobile}`}>
                <div className={styles.top}>
                    <p className={styles.data}>{new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
                    <p className={styles.horas}>{dados.horas}h</p>
                </div>

                {membro && <p className={styles.nome}>{membro.nome_completo}</p>}
                <p className={styles.descricao}>{dados.descricao}</p>

                <div className={styles.bottom}>
                    <p className={`${styles.badge} ${styles[dados.tipo]}`}>
                        {dados.tipo}
                    </p>
                    <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                        {status}
                    </span>
                </div>

                {status === "Pendente" ?
                <div className={styles.actionsCell}>
                    <button className={styles.btnAprovar}>
                        <FontAwesomeIcon icon={faCheck} /> Aprovar
                    </button>
                    <button className={styles.btnRejeitar}>
                        <FontAwesomeIcon icon={faXmark} /> Rejeitar
                    </button>
                </div>
                :
                <button className={styles.excluir}>
                    <FontAwesomeIcon icon={faTrash}/> Excluir
                </button>}
            </div>
        </>
    );
}