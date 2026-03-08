'use client';

import { isSessionValid } from "@/app/_lib/session";
import { redirect } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import styles from "./page.module.css";
import { edit_free, query_free_membro } from "@/app/_actions/free";

const horarios2 = [
  "07:00-07:30","07:30-08:00","08:00-08:30","08:30-09:00",
  "09:00-09:30","09:30-10:00","10:00-10:30","10:30-11:00",
  "11:00-11:30","11:30-12:00","12:00-12:30","12:30-13:00",
  "13:00-13:30","13:30-14:00","14:00-14:30","14:30-15:00",
  "15:00-15:30","15:30-16:00","16:00-16:30","16:30-17:00",
  "17:00-17:30","17:30-18:00","18:00-18:30","18:30-19:00",
  "19:00-19:30","19:30-20:00","20:00-20:30","20:30-21:00",
  "21:00-21:30","21:30-22:00","22:00-22:30","22:30-23:00"
];

const horarios = [
  "07:00 - 07:55","07:55 - 08:50","08:50 - 09:45","10:10 - 11:05",
  "11:05 - 12:00"," - ","13:30 - 14:25","14:25 - 15:20",
  "15:45 - 16:40","16:40 - 17:35","17:35 - 18:30","-",
  "19:00 - 19:50","19:50 - 20:40","21:00 - 21:50","21:50 - 22:40",
  "22:40 - 23:30"
];

const dias = ["seg", "ter", "qua", "qui", "sex", "sab"];

export default function MeuFreeTimePage()
{
    const padrao = {
        seg: "00000000000000000000000000000000",
        ter: "00000000000000000000000000000000",
        qua: "00000000000000000000000000000000",
        qui: "00000000000000000000000000000000",
        sex: "00000000000000000000000000000000",
        sab: "00000000000000000000000000000000"
    };
    const [data, setData] = useState<any>(padrao);
    
    // Estados para o controle de arrasto (Drag)
    const [isDragging, setIsDragging] = useState(false);
    const [dragType, setDragType] = useState<string | null>(null);

    useEffect(() => {
        load();
    }, []);

    // Listener global para parar o arrasto quando soltar o mouse
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            setIsDragging(false);
            setDragType(null);
        };
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    async function load()
    {
        try {
            const isLogged = await isSessionValid();
            const userId = isLogged as { userId: number };
            const res = await query_free_membro(userId.userId);

            if (!res) {
                toast.error("Não foi possível acessar seus dados!");
                redirect("/main");
            }

            setData(res);
        } catch (err) {
            toast.error("Erro ao carregar dados");
        }
    }

    // Função centralizada para atualizar o estado de uma célula
    const applyToggle = useCallback((day: string, index: number, value: string) => {
        setData((prev: any) => {
            if (!prev) return prev;
            const chars = prev[day].split("");
            if (chars[index] === value) return prev; // Evita re-render se o valor já for o desejado

            chars[index] = value;
            return { ...prev, [day]: chars.join("") };
        });
    }, []);

    function handleMouseDown(day: string, index: number) {
        setIsDragging(true);
        const currentValue = data[day][index];
        // Se clicar em livre (0), vira ocupado (1) e vice-versa
        const newValue = currentValue === "1" ? "0" : "1";
        setDragType(newValue);
        applyToggle(day, index, newValue);
    }

    function handleMouseEnter(day: string, index: number) {
        if (isDragging && dragType !== null) {
            applyToggle(day, index, dragType);
        }
    }

    function tudoLivre() {
        const updated = { ...data };
        dias.forEach((d) => {
            updated[d] = "0".repeat(horarios.length);
        });
        setData(updated);
    }

    function tudoOcupado() {
        const updated = { ...data };
        dias.forEach((d) => {
            updated[d] = "1".repeat(horarios.length);
        });
        setData(updated);
    }

    async function salvar() {
        const retorno = await edit_free(data);
        if (retorno) {
            toast.success("Salvo com sucesso!");
            return;
        }
        toast.error("Não foi possível atualizar sua free time!");
    }

    //if (loading) return <main><p style={{ color: "black", fontSize: "3rem" }}>Carregando...</p></main>;

    return (
        <main style={{ userSelect: 'none' }}> {/* Evita seleção de texto ao arrastar */}
            
            <div className={styles.infoBox}>
                <div className={styles.infoIcon}>i</div>
                <div className={styles.infoContent}>
                    <div className={styles.infoTitle}>Como usar o Free Time</div>
                    <div className={styles.infoText}>
                        Clique e <strong>arraste</strong> nas células para marcar horários como <strong>ocupados</strong> ou <strong>livres</strong>.
                    </div>
                    <div className={styles.infoText}>
                        Esta informação será usada pela diretoria para agendar reuniões e eventos.
                    </div>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Horário</th>
                                {dias.map(d => (
                                    <th key={d}>{d.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {horarios.map((hora, i) => (
                                <tr key={hora}>
                                    <td className={styles.hora}>{hora}</td>
                                    {dias.map(d => {
                                        const ocupado = data[d][i] === "1";

                                        return (
                                            <td
                                                key={d}
                                                onMouseDown={() => handleMouseDown(d, i)}
                                                onMouseEnter={() => handleMouseEnter(d, i)}
                                                className={ocupado ? styles.ocupado : styles.livre}
                                                style={{ cursor: "pointer" }}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.saveWrapper}>
                    <button onClick={salvar} className={styles.saveBtn}>
                        Salvar alterações
                    </button>
                </div>
            </div>

            <div className={styles.bottomGrid}>
                <div className={styles.infoCard}>
                    <div className={styles.title}>Legenda</div>
                    <div className={styles.legendItem}>
                        <div className={`${styles.colorBox} ${styles.livreBox}`} />
                        <div>
                            <strong>Livre</strong>
                            <div className={styles.subtitle}>Disponível para atividades</div>
                        </div>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={`${styles.colorBox} ${styles.ocupadoBox}`} />
                        <div>
                            <strong>Ocupado</strong>
                            <div className={styles.subtitle}>Não disponível</div>
                        </div>
                    </div>
                </div>

                <div className={styles.infoCard}>
                    <div className={styles.title}>Controles Rápidos</div>
                    <div className={styles.controls}>
                        <button className={`${styles.button} ${styles.btnLivre}`} onClick={tudoLivre}>
                            ✔ Tudo Livre
                        </button>
                        <button className={`${styles.button} ${styles.btnOcupado}`} onClick={tudoOcupado}>
                            ✖ Tudo Ocupado
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}