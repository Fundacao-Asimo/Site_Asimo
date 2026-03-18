"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import modal from "./modal.module.css";
import { faFileExport, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalCaixa from "./modal";
import { useEffect, useState } from "react";
import { query_caixa } from "@/app/_actions/caixa";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { edit_trans, list_trans } from "@/app/_actions/transacao";
import { TransacaoProps } from "@/app/_lib/DB_transacoes";
import HistoricoRow from "./historicoRow";
import RequisicoesRow from "./requisicoesRow";

export default function CaixaPage()
{
    const [openM, setOpenM] = useState<boolean>(false);
    const [entrada, setEntrada] = useState<boolean>(false);
    const [totalCaixa, setTotalCaixa] = useState<number>(0);
    const [listTodasTransacoes, setlistTodasTransacoes] = useState<TransacaoProps[]>([]);
    const [listTransacoesEntrada, setlistTransacoesEntrada] = useState<TransacaoProps[]>([]);
    const [listTransacoesSaida, setlistTransacoesSaida] = useState<TransacaoProps[]>([]);
    const [listTransacoesPendent, setlistTransacoesPendent] = useState<TransacaoProps[]>([]);
    const [filtroTrans, setFiltroTrans] = useState<TransacaoProps[]>([]);
    const [tipoFiltro, setTipoFiltro] = useState("todos");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");
    const [dataInicioReq, setDataInicioReq] = useState<string>("");
    const [dataFimReq, setDataFimReq] = useState<string>("");
    const [filtroReq, setFiltroReq] = useState<TransacaoProps[]>([]);
    const [modalConfirm, setModalConfirm] = useState<{
        open: boolean;
        transacao: TransacaoProps | null;
        accept: boolean;
    }>({
        open: false,
        transacao: null,
        accept: false
    });

    useEffect(() => {
        load();
    }, []);

    async function load()
    {
        const caixa = await query_caixa();
        const transacoesAll = await list_trans(true);
        const transacoes = transacoesAll.filter(t => t.status !== false); //temporario
        if(!caixa)
        {
            toast.error("Erro a carregar dados!");
            redirect("/main");
        }

        setTotalCaixa(caixa.valor);
        setlistTodasTransacoes(transacoes);
        setFiltroTrans(transacoes);
        if(transacoes.length > 0)
        {
            const hoje = new Date();
            const anoMesAtual = hoje.toISOString().slice(0, 7);

            const listaMesAtual = transacoes.filter(item =>
                item.data.startsWith(anoMesAtual)
            );

            setlistTransacoesEntrada(listaMesAtual.filter(i => i.entrada === true && i.status !== null));
            setlistTransacoesSaida(listaMesAtual.filter(i => i.entrada === false && i.status !== null));
            setlistTransacoesPendent(listaMesAtual.filter(i => i.status === null));
        }
    }

    useEffect(() => {
        let lista = [...listTodasTransacoes];

        if(tipoFiltro === "entradas")
            lista = lista.filter(t => t.entrada === true);

        else if(tipoFiltro === "saidas")
            lista = lista.filter(t => t.entrada === false);

        if(dataInicio)
            lista = lista.filter(t => t.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(t => t.data <= dataFim);

        setFiltroTrans(lista);

    }, [listTodasTransacoes, tipoFiltro, dataInicio, dataFim]);

    useEffect(() => {
        let lista = [...listTransacoesPendent];

        if(dataInicioReq)
            lista = lista.filter(t => t.data >= dataInicioReq);

        if(dataFimReq)
            lista = lista.filter(t => t.data <= dataFimReq);

        setFiltroReq(lista);

    }, [listTransacoesPendent, dataInicioReq, dataFimReq]);

    return(
        <>
            {openM && <ModalCaixa 
                        entrada={entrada} 
                        onClose={() => setOpenM(false)} 
                        onSuccess={(v: number) => setTotalCaixa(prev => prev + v)} 
                        addLista={(t: TransacaoProps) => {
                            setlistTodasTransacoes(prev => [t, ...prev]);
                        }}
                    />
            }

            {modalConfirm.open && modalConfirm.transacao && (
                <ModalConfirm 
                    accept={modalConfirm.accept}
                    transacao={modalConfirm.transacao}
                    onClose={() => setModalConfirm(prev => ({...prev, open: false}))}
                    onSuccess={load}
                />
            )}

            <main>
                <div className={styles.container}>

                    {/* SALDO */}
                    <section className={styles.saldoCard}>
                        <div>
                            <p className={styles.label}>SALDO ATUAL</p>
                            <h1 className={styles.saldo}>R$ {totalCaixa.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h1>
                            <span className={styles.update}>Atualizado em {listTodasTransacoes.length < 1 ? "17/03/2026" : new Date(listTodasTransacoes[0].data + "T00:00:00").toLocaleDateString("pt-BR")}</span>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={() => {
                                setEntrada(true);
                                setOpenM(true);
                            }} className={`${styles.button} ${styles.entrada}`}>
                                <FontAwesomeIcon icon={faPlusCircle}/> Entrada
                            </button>

                            <button onClick={() => {
                                setEntrada(false);
                                setOpenM(true);
                            }} className={`${styles.button} ${styles.saida}`}>
                                <FontAwesomeIcon icon={faMinusCircle}/> Saída
                            </button>

                            <button onClick={() => window.open("/api/relatorio_financeiro", "_blank")} className={`${styles.button} ${styles.relatorio}`}>
                                <FontAwesomeIcon icon={faFileExport}/> Relatório
                            </button>
                        </div>
                    </section>

                    {/* CARDS */}
                    <section className={styles.cards}>
                        <div className={styles.card}>
                            <p className={styles.cardTitle}>ENTRADAS DO MÊS</p>
                            <h2 className={styles.entradaValor}>R$ {listTransacoesEntrada.reduce((total, item) => total + item.valor, 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
                            <span>+ {listTransacoesEntrada.length} transações</span>
                        </div>

                        <div className={styles.card}>
                            <p className={styles.cardTitle}>SAÍDAS DO MÊS</p>
                            <h2 className={styles.saidaValor}>R$ {listTransacoesSaida.reduce((total, item) => total + item.valor, 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
                            <span>- {listTransacoesSaida.length} transações</span>
                        </div>

                        <div className={styles.card}>
                            <p className={styles.cardTitle}>TRANSAÇÕES PENDENTES DO MÊS</p>
                            <h2 className={styles.previstoValor}>R$ {listTransacoesPendent.reduce((total, item) => total + item.valor, 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
                            <span>- {listTransacoesPendent.length} transações</span>
                        </div>
                    </section>

                    {/* HISTÓRICO */}
                    <section className={styles.historico}>
                        <div className={styles.historicoHeader}>
                            <h3>Histórico Financeiro</h3>

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
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>DATA</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>TIPO</th>
                                        <th>CATEGORIA</th>
                                        <th>VALOR</th>
                                        <th>ANEXO</th>
                                        {/* <th>STATUS</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {filtroTrans.length > 0 && filtroTrans.map((t) => {
                                        return <HistoricoRow key={t.id} dados={t}/>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* REQUISIÇÕES */}
                    <section className={styles.requisicoes}>
                        <div className={styles.historicoHeader}>
                            <h3>Requisições Pendentes</h3>

                            <div className={styles.filtroContainer}>

                                <div className={styles.filtroItem}>
                                    <label>Início</label>
                                    <input type="date" value={dataInicioReq} onChange={(e) => setDataInicioReq(e.target.value)} />
                                </div>

                                <div className={styles.filtroItem}>
                                    <label>Fim</label>
                                    <input type="date" value={dataFimReq} onChange={(e) => setDataFimReq(e.target.value)} />
                                </div>

                                <div className={styles.filtroItem}>
                                    <button className={styles.clearButton} disabled={!dataInicio && !dataFim && tipoFiltro === "todos"} onClick={() => {
                                        setDataInicioReq("");
                                        setDataFimReq("");
                                    }}>Limpar</button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.tableRequisicoes}>
                                <thead>
                                    <tr>
                                        <th>DATA</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>MEMBRO</th>
                                        <th>CATEGORIA</th>
                                        <th>VALOR</th>
                                        <th>ANEXO</th>
                                        <th>AÇÂO</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filtroReq.length > 0 && filtroReq.map((t) => {
                                        return <RequisicoesRow key={t.id} dados={t} open={setModalConfirm}/>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}

function ModalConfirm({ accept, transacao, onClose, onSuccess }: {accept: boolean, transacao: TransacaoProps, onClose: () => void, onSuccess: () => void})
{

    async function editar() {
        transacao.status = accept ? true : false;
        const retorno = await edit_trans(transacao);

        if(!retorno)
        {
            toast.error(`Erro ao ${accept ? "aprovar requisição" : "rejeitar requisição"}!`);
            onClose();
        }
        else
        {
            toast.success(`Êxito ao ${accept ? "aprovar requisição" : "rejeitar requisição"}!`);
            onSuccess();
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