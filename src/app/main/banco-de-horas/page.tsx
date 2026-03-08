"use client";

import styles from "../../_styles/padrao.module.css";
import { isSessionValid } from "@/app/_lib/session";
import HoraDetalhe from "@/app/_ui/hora-detalhe";
import { HoraInfo } from "@/app/_lib/DB_horas";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { insert_hora, list_horas_membro } from "@/app/_actions/hora";

export default function BancoPage()
{
    const [listHoras, setListHoras] = useState<any[]>([]);
    const [usuarioId, setUsuarioId] = useState<any>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 4; // você escolhe quantos quer por página

    useEffect(() => {
        load();
    }, []);

    async function load()
    {
        const session = await isSessionValid();
        const usuarioIdTemp = session as { userId: number };
        const listHorasTemp = await list_horas_membro(usuarioIdTemp.userId);

        listHorasTemp.forEach((hora) => {
            hora.data = new Date(hora.data + "T00:00:00").toLocaleDateString("pt-BR");
        });

        setUsuarioId(usuarioIdTemp);
        setListHoras(listHorasTemp);
    }

    function handleDelete(id: number) {
        setListHoras((prev) => prev.filter((hora) => hora.id !== id));
    }

    async function registrar(formData: FormData)
    {
        const dados: HoraInfo = {
            horas: Number(formData.get('horas')),
            data: formData.get('data') as string,
            tipo: formData.get('atividade') as string,
            descricao: formData.get('descricao') as string,
            aprovado: null,
            membro: usuarioId.userId
        }

        const retorno = await insert_hora(dados);

        if(!retorno)
            toast.error("Não foi possível cadastrar suas horas!");
        else {
            toast.success("Horas cadastradas com sucesso!");
            load();
        }
    }

    const totalPaginas = Math.ceil(listHoras.length / itensPorPagina);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const horasVisiveis = listHoras.slice(inicio, fim);

    const botaoStyle = {
        padding: "6px 10px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        minWidth: "32px"
    };

    return (
        <main>
            <div className={styles.div_horizontal} style={{height: "69vh"}}>
                <form action={registrar} className={styles.quadro}>
                    <h3 style={{width: "100%", textAlign: "left", marginBottom: "1.2rem"}}>Registro de horas</h3>
                    <div className={styles.div_horizontal} style={{margin: "0", width: "100%"}}>
                        <div className={styles.form_group} style={{flex: "1"}}>
                            <label>Data</label>
                            <input className={styles.input} type="date" id="data" name="data" required style={{width: "100%"}}/>
                        </div>
                        <div className={styles.form_group} style={{flex: "1"}}>
                            <label>Horas</label>
                            <input className={styles.input} type="number" id="horas" name="horas" required placeholder="Ex: 2" style={{width: "100%"}}/>
                        </div>
                    </div>
                    <div className={styles.form_group}>
                        <label>Atividade</label>
                        <select className={styles.input} name="atividade" id="atividade" required defaultValue="" style={{cursor: "pointer"}}>
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
                    <div className={styles.form_group}>
                        <label>Descrição</label>
                        <input className={styles.input} type="text" id="descricao" name="descricao" required placeholder="Descreva as atividades realizadas..."/>
                    </div>
                    <button className={styles.form_button}>Registrar</button>
                </form>
                <div className={styles.quadro} style={{flex: "2.5", padding: "1rem 0rem", height: "100%", minHeight: "0", justifyContent: "space-between"}}>
                    <h3 style={{width: "100%", textAlign: "left", marginLeft: "1rem", marginBottom: "1rem"}}>Meu Histórico Completo</h3>
                    <div style={{width: "100%", overflow: "hidden", height: "100%"}}>
                        <AnimatePresence>
                            {horasVisiveis.map((hora) => (
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
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginTop: "1rem",
                        flexWrap: "wrap"
                    }}>
                        {/* Botão Anterior */}
                        <button
                            onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
                            disabled={paginaAtual === 1}
                            style={botaoStyle}
                        >
                            «
                        </button>

                        <button
                            key={paginaAtual}
                            onClick={() => setPaginaAtual(paginaAtual)}
                            style={{
                                ...botaoStyle,
                                backgroundColor: paginaAtual === paginaAtual ? "#2563eb" : "#e5e7eb",
                                color: paginaAtual === paginaAtual ? "white" : "black"
                            }}
                        >
                            {paginaAtual}
                        </button>

                        {/* Botão Próximo */}
                        <button
                            onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
                            disabled={paginaAtual === totalPaginas}
                            style={botaoStyle}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
