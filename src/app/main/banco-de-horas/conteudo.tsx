"use client";

import styles from "./page.module.css";
import HoraDetalhe from "@/app/_ui/hora-detalhe";
import { HoraInfo, HoraProps } from "@/app/_lib/DB_horas";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { insert_hora } from "@/app/_actions/hora";

export default function ConteudoBancoHoras({listHorasInit, userId}: {listHorasInit: HoraProps[], userId: number})
{
    const [listHoras, setListHoras] = useState<HoraProps[]>(listHorasInit);
    const [filtro, setFiltro] = useState<HoraProps[]>(listHorasInit);
    const [tipoFiltro, setTipoFiltro] = useState("Todas");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");
    const [horaInput, setHoraInput] = useState<string>("");

    function handleDelete(id: number) {
        setListHoras((prev) => prev.filter((hora) => hora.id !== id));
    }

    function handleChangeHora(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        value = value.replace(/\D/g, "");

        setHoraInput(value);
    }

    async function registrar(formData: FormData)
    {
        const dados: HoraInfo = {
            horas: Number(formData.get('horas')),
            data: formData.get('data') as string,
            tipo: formData.get('atividade') as string,
            descricao: formData.get('descricao') as string,
            aprovado: null,
            membro: userId
        }

        const retorno = await insert_hora(dados);

        if(!retorno)
            toast.error("Não foi possível cadastrar suas horas!");
        else {
            toast.success("Horas cadastradas com sucesso!");
            retorno.data = new Date(retorno.data + "T00:00:00").toLocaleDateString("pt-BR");
            setListHoras(prev => [retorno, ...prev]);
        }
    }

    useEffect(() => {
        let lista = [...listHoras];

        if(tipoFiltro === "aprovado")
            lista = lista.filter(h => h.aprovado === true);

        else if(tipoFiltro === "rejeitado")
            lista = lista.filter(h => h.aprovado === false);

        else if(tipoFiltro === "pendente")
            lista = lista.filter(h => h.aprovado === null);

        if(dataInicio)
            lista = lista.filter(r => r.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(r => r.data <= dataFim);

        setFiltro(lista);

    }, [listHoras, tipoFiltro, dataInicio, dataFim]);

    return (
        <div className={styles.container}>
            <form className={styles.form} action={registrar}>
                <h3 className={styles.titulo}>Registro de horas</h3>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="data">Data</label>
                        <input type="date" id="data" name="data" required/>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="horas">Horas</label>
                        <input type="text" id="horas" name="horas" value={horaInput} onChange={handleChangeHora} required placeholder="Ex: 2"/>
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Atividade</label>
                    <select name="atividade" id="atividade" required defaultValue="">
                        <option value="" disabled>Selecione uma atividade</option>
                        <option value="Docência">Docência</option>
                        <option value="Projetos">Projetos</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Gestão">Gestão</option>
                        <option value="AudioVisual">AudioVisual</option>
                        <option value="Reunião">Reunião</option>
                        <option value="Evento">Evento</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" id="descricao" name="descricao" required placeholder="Descreva as atividades realizadas..."/>
                </div>

                <button className={styles.button}>Registrar</button>
            </form>

            <div className={styles.historico}>
                <div className={styles.historicoHeader}>
                    <h3>Histórico</h3>

                    <div className={styles.filtroContainer}>

                        <div className={styles.filtroItem}>
                            <label>Tipo</label>
                            <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                                <option value="todos">Todos</option>
                                <option value="aprovado">Aprovados</option>
                                <option value="rejeitado">Rejeitados</option>
                                <option value="pendente">Pendente</option>
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
                            <button className={styles.clearButton} disabled={!dataInicio && !dataFim} onClick={() => {
                                setDataInicio("");
                                setDataFim("");
                            }}>Limpar</button>
                        </div>
                    </div>
                </div>
                <div className={styles.listaHoras}>
                    <AnimatePresence>
                        {filtro.map((hora) => (
                            <motion.div
                                key={hora.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <HoraDetalhe 
                                    dados={hora} 
                                    onDelete={handleDelete} 
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
