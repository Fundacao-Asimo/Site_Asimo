"use client";

import styles from "./page.module.css";
import modal from "./modal.module.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RequiInfo, RequiProps } from "@/app/_lib/DB_requisicoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { edit_req, insert_req, upload_anexo_req } from "@/app/_actions/requisicoes";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import HistoricoRow from "./historicoRow";
import HistoricoPendRow from "./historicoPendRow";
import { MembroProps } from "@/app/_lib/DB_user";

export default function ConteudoControleRequisicoes({listReq, listMembros}: {listReq: RequiProps[], listMembros: MembroProps[]})
{
    const [filtro, setFiltro] = useState<RequiProps[]>(listReq.filter(r => r.status !== null));
    const [filtroPend, setFiltroPend] = useState<RequiProps[]>(listReq.filter(r => r.status === null));
    const [tipoFiltro, setTipoFiltro] = useState("Todos");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");
    const [dataInicioPend, setDataInicioPend] = useState<string>("");
    const [dataFimPend, setDataFimPend] = useState<string>("");
    const [renderizar, setRenderizar] = useState<boolean>(false);
    const [modalConfirm, setModalConfirm] = useState<{
            open: boolean;
            req: RequiProps | null;
            accept: boolean;
        }>({
            open: false,
            req: null,
            accept: false
        });

    useEffect(() => {
        let lista = listReq.filter(r => r.status !== null);

        if(tipoFiltro === "Aprovado")
            lista = lista.filter(r => r.status === true);

        else if(tipoFiltro === "Rejeitado")
            lista = lista.filter(r => r.status === false);

        if(dataInicio)
            lista = lista.filter(r => r.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(r => r.data <= dataFim);

        setFiltro(lista);

    }, [listReq, tipoFiltro, dataInicio, dataFim, renderizar]);

    useEffect(() => {
        let lista = listReq.filter(r => r.status === null);

        if(dataInicioPend)
            lista = lista.filter(r => r.data >= dataInicioPend);

        if(dataFimPend)
            lista = lista.filter(r => r.data <= dataFimPend);

        setFiltroPend(lista);

    }, [listReq, dataInicioPend, dataFimPend, renderizar]);

    return(
        <div className={styles.container}>
            {modalConfirm.open && modalConfirm.req && (
                <ModalConfirm 
                    accept={modalConfirm.accept}
                    req={modalConfirm.req}
                    onClose={() => setModalConfirm(prev => ({...prev, open: false}))}
                    update={() => setRenderizar(prev => !prev)}
                />
            )}
            {/* HISTÓRICO pendente*/}
            <section className={styles.historico}>
                <div className={styles.historicoHeader}>
                    <h3>Requisições Pendentes</h3>

                    <div className={styles.filtroContainer}>

                        <div className={styles.filtroItem}>
                            <label>Início</label>
                            <input type="date" value={dataInicio} onChange={(e) => setDataInicioPend(e.target.value)} />
                        </div>

                        <div className={styles.filtroItem}>
                            <label>Fim</label>
                            <input type="date" value={dataFim} onChange={(e) => setDataFimPend(e.target.value)} />
                        </div>

                        <div className={styles.filtroItem}>
                            <button className={styles.clearButton} disabled={!dataInicio && !dataFim} onClick={() => {
                                setDataInicioPend("");
                                setDataFimPend("");
                            }}>Limpar</button>
                        </div>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    {filtroPend.length > 0 && filtroPend.map((r) => {
                        return <HistoricoPendRow key={r.id} dados={r} membro={listMembros.find(m => m.id === r.membro)} open={setModalConfirm}/>
                    })}
                </div>
            </section>
            {/* HISTÓRICO */}
            <section className={styles.historico}>
                <div className={styles.historicoHeader}>
                    <h3>Requisições Passadas</h3>

                    <div className={styles.filtroContainer}>
                        <div className={styles.filtroItem}>
                            <label>Tipo</label>
                            <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
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
                        return <HistoricoRow key={r.id} dados={r} membro={listMembros.find(m => m.id === r.membro)}/>
                    })}
                </div>
            </section>
        </div>
    );
}

function ModalConfirm({ accept, req, onClose, update }: {accept: boolean, req: RequiProps, onClose: () => void, update: () => void})
{

    async function editar() {
        req.status = accept ? true : false;
        const retorno = await edit_req(req);

        if(!retorno)
        {
            toast.error(`Erro ao ${accept ? "aprovar requisição" : "rejeitar requisição"}!`);
            onClose();
        }
        else
        {
            toast.success(`Êxito ao ${accept ? "aprovar requisição" : "rejeitar requisição"}!`);
            update();
            onClose();
        }
    }

    return(
        <div className={modal.overlay}>
        
            <div className={modal.modal}>

                <div className={modal.header}>
                    {accept ? <h2>Aprovar requisição?</h2> : <h2>Rejeitar requisição?</h2>}
                    <button onClick={onClose} className={modal.close}>×</button>
                </div>

                <div className={modal.footer}>
                    <button onClick={editar} className={modal.btnConf}>
                        Confirmar
                    </button>
                    <button onClick={onClose} className={modal.btnCanc}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    );
}