"use client";

import { EventoProps } from "@/app/_lib/DB_reunioes-eventos";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { delete_evento } from "@/app/_actions/reunioes-eventos";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ModalReunioes from "./modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function ConteudoAgendaReuniao({listReunioes}: {listReunioes: EventoProps[]})
{
    const [filtro, setFiltro] = useState<EventoProps[]>(listReunioes);
    const [tipoFiltro, setTipoFiltro] = useState("Todas");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");
    const [openM, setOpenM] = useState<boolean>(false);

    useEffect(() => {
        let lista = [...listReunioes];

        lista = lista.filter(r => r.aberta === true);

        if(tipoFiltro === "Geral")
            lista = lista.filter(r => r.area === "Geral");

        else if(tipoFiltro === "Docência")
            lista = lista.filter(r => r.area === "Docência");

        else if(tipoFiltro === "Projetos")
            lista = lista.filter(r => r.area === "Projetos");

        else if(tipoFiltro === "Marketing")
            lista = lista.filter(r => r.area === "Marketing");

        else if(tipoFiltro === "Gestão")
            lista = lista.filter(r => r.area === "Gestão");

        else if(tipoFiltro === "AudioVisual")
            lista = lista.filter(r => r.area === "AudioVisual");

        if(dataInicio)
            lista = lista.filter(r => r.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(r => r.data <= dataFim);

        setFiltro(lista);

    }, [listReunioes, tipoFiltro, dataInicio, dataFim]);

    return(
        <>
            {openM && <ModalReunioes onClose={() => setOpenM(false)}/>}
            <div className={styles.container}>
                <button className={styles.buttonAgendar} onClick={() => {setOpenM(true)}}><FontAwesomeIcon icon={faPlusCircle}/> Marcar Reunião</button>
                {/* HISTÓRICO */}
                <section className={styles.historico}>
                    <div className={styles.historicoHeader}>
                        <h3>Reuniões Agendadas</h3>

                        <div className={styles.filtroContainer}>
                            <div className={styles.filtroItem}>
                                <label>Tipo</label>
                                <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                                    <option value="Todas">Todas</option>
                                    <option value="Geral">Geral</option>
                                    <option value="Docência">Docência</option>
                                    <option value="Projetos">Projetos</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Gestão">Gestão</option>
                                    <option value="AudioVisual">AudioVisual</option>
                                </select>
                            </div>

                            <div className={styles.filtroItem}>
                                <label>Início</label>
                                <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                            </div>

                            <div className={styles.filtroItem}>
                                <label>Fim</label>
                                <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                            </div>

                            <div className={styles.filtroItem}>
                                <button className={styles.clearButton} disabled={!dataInicio && !dataFim && tipoFiltro === "todos"} onClick={() => {
                                    setTipoFiltro("todos");
                                    setDataInicio("");
                                    setDataFim("");
                                }}>Limpar</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        {filtro.length > 0 && filtro.map((r) => {
                            return <HistoricoRow key={r.id} dados={r}/>
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}

function HistoricoRow({dados}: {dados: EventoProps})
{
    const router = useRouter();
    async function cancelarReuniao() {
        await delete_evento(dados.id);
        toast.success("Reunião cancelada!");
        router.push("/main/agenda-reunioes");
    }
    console.log(dados.id + ":" + new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR") + " - " + new Date().toLocaleDateString("pt-BR"));

    return (
        <div className={`${styles.card} ${styles[dados.area]}`}>
            <div className={styles.divCardText}>
                <p className={styles.bold}>{`Reunião ${dados.area} ${dados.descricao ? "- " + dados.descricao : ""}`}</p>
                <p className={styles.data}>Data: {new Date(dados.data + "T00:00:00").toLocaleDateString("pt-BR")}</p>
            </div>

            <form action={cancelarReuniao}>
                {new Date(dados.data + "T00:00:00") < new Date() ? <Link href={`/main/controle-frequencia/${dados.id}`} className={`${styles.badge} ${styles.lancar}`}>Lançar Presença</Link> : <button className={`${styles.badge} ${styles.cancelar}`}>Cancelar Reunião</button>}
            </form>
        </div>
    );
}