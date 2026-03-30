import { TransacaoProps } from "@/app/_lib/DB_transacoes";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function HistoricoRow({dados}: {dados: TransacaoProps})
{
    const isEntrada = dados.entrada;

    return (
        <tr>
            <td>{new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</td>

            <td className={styles.bold}>{dados.descricao}</td>

            <td>
                <span
                    className={
                        isEntrada ? styles.tagEntrada : styles.tagSaida
                    }
                >
                    {isEntrada ? "Entrada" : "Saída"}
                </span>
            </td>

            <td>{dados.categoria}</td>

            <td
                className={
                    isEntrada ? styles.entradaValor : styles.saidaValor
                }
            >
                {isEntrada ? "+" : "-"} R$ {dados.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </td>

            <td>{dados.anexo_url && dados.anexo_url.length > 0 ? <Link href={dados.anexo_url} target="_blank"><FontAwesomeIcon icon={faPaperclip}/></Link> : "-"}</td>

            {/* <td>
                <span
                    className={
                        dados.status === true
                            ? styles.statusConfirmado
                            : dados.status === false
                            ? styles.statusRejeitado
                            : styles.statusPendente
                    }
                >
                    {dados.status === true ? "Confirmado" : dados.status === false ? "Rejeitado" : "Pendente"}
                </span>
            </td> */}
        </tr>
    );
}