"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faFileExport, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ModalCaixa from "./modal";
import { useState } from "react";

export default function CaixaPage()
{
    const [open, setOpen] = useState<boolean>(false);
    const [entrada, setEntrada] = useState<boolean>(false);

    return(
        <>
            {open && <ModalCaixa entrada={entrada} onClose={() => setOpen(false)}/>}
            <main>
                <div className={styles.container}>

                    {/* SALDO */}
                    <section className={styles.saldoCard}>
                        <div>
                            <p className={styles.label}>SALDO ATUAL</p>
                            <h1 className={styles.saldo}>R$ 1.250,00</h1>
                            <span className={styles.update}>Atualizado em 24/01/2026</span>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={() => {
                                setEntrada(true);
                                setOpen(true);
                            }} className={`${styles.button} ${styles.entrada}`}>
                                <FontAwesomeIcon icon={faPlusCircle}/> Entrada
                            </button>

                            <button onClick={() => {
                                setEntrada(false);
                                setOpen(true);
                            }} className={`${styles.button} ${styles.saida}`}>
                                <FontAwesomeIcon icon={faMinusCircle}/> Saída
                            </button>

                            <button className={`${styles.button} ${styles.relatorio}`}>
                                <FontAwesomeIcon icon={faFileExport}/> Relatório
                            </button>
                        </div>
                    </section>

                    {/* CARDS */}
                    <section className={styles.cards}>
                        <div className={styles.card}>
                            <p className={styles.cardTitle}>ENTRADAS DO MÊS</p>
                            <h2 className={styles.entradaValor}>R$ 850,00</h2>
                            <span>+ 3 transações</span>
                        </div>

                        <div className={styles.card}>
                            <p className={styles.cardTitle}>SAÍDAS DO MÊS</p>
                            <h2 className={styles.saidaValor}>R$ 600,00</h2>
                            <span>- 2 transações</span>
                        </div>

                        <div className={styles.card}>
                            <p className={styles.cardTitle}>SALDO PREVISTO</p>
                            <h2 className={styles.previstoValor}>R$ 1.450,00</h2>
                            <span>Final do mês</span>
                        </div>
                    </section>

                    {/* HISTÓRICO */}
                    <section className={styles.historico}>
                        <div className={styles.historicoHeader}>
                            <h3>Histórico Financeiro</h3>

                            <div>
                                <label>Filtrar:</label>
                                <select>
                                    <option>Entradas</option>
                                    <option>Saídas</option>
                                    <option>Todos</option>
                                </select>
                            </div>
                        </div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>DATA</th>
                                    <th>DESCRIÇÃO</th>
                                    <th>TIPO</th>
                                    <th>CATEGORIA</th>
                                    <th>VALOR</th>
                                    <th>ANEXO</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>22/01/2026</td>
                                    <td className={styles.bold}>Venda de Pizzas</td>
                                    <td>
                                        <span className={styles.tagEntrada}>Entrada</span>
                                    </td>
                                    <td>Evento</td>
                                    <td className={styles.entradaValor}>+ R$ 500,00</td>
                                    <td>📎</td>
                                    <td>
                                        <span className={styles.statusConfirmado}>Confirmado</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>20/01/2026</td>
                                    <td className={styles.bold}>Filamento PLA</td>
                                    <td>
                                        <span className={styles.tagSaida}>Saída</span>
                                    </td>
                                    <td>Material</td>
                                    <td className={styles.saidaValor}>- R$ 350,00</td>
                                    <td>📎</td>
                                    <td>
                                        <span className={styles.statusConfirmado}>Confirmado</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>18/01/2026</td>
                                    <td className={styles.bold}>Reembolso Lucas Mendes</td>
                                    <td>
                                        <span className={styles.tagSaida}>Saída</span>
                                    </td>
                                    <td>Reembolso</td>
                                    <td className={styles.saidaValor}>- R$ 150,00</td>
                                    <td>📎</td>
                                    <td>
                                        <span className={styles.statusPendente}>Pendente</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                </div>
            </main>
        </>
    );
}