"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { query_caixa } from "@/app/_actions/caixa";
import toast from "react-hot-toast";
import HistoricoRow from "./historicoRow";
import { RequiProps } from "@/app/_lib/DB_requisicoes";

export default function ConteudoRequisicoes({listReq}: {listReq: RequiProps[]})
{
    const [filtro, setFiltro] = useState<RequiProps[]>(listReq);
    const [tipoFiltro, setTipoFiltro] = useState("Todos");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");

    useEffect(() => {
        let lista = [...listReq];

        if(tipoFiltro === "Pendente")
            lista = lista.filter(r => r.status === null);

        else if(tipoFiltro === "Aprovado")
            lista = lista.filter(r => r.status === true);

        else if(tipoFiltro === "Rejeitado")
            lista = lista.filter(r => r.status === false);

        if(dataInicio)
            lista = lista.filter(r => r.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(r => r.data <= dataFim);

        setFiltro(lista);

    }, [listReq, tipoFiltro, dataInicio, dataFim]);

    return(
        <div className={styles.container}>
            {/* HISTÓRICO */}
            <section className={styles.historico}>
                <div className={styles.historicoHeader}>
                    <h3>Minhas Requisições</h3>

                    <div className={styles.filtroContainer}>
                        <div className={styles.filtroItem}>
                            <label>Tipo</label>
                            <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="entradas">Entradas</option>
                                <option value="saidas">Saídas</option>
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
    );
}