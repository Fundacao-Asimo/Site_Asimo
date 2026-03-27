"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ModalMembros from "./modal";

type DiaSemana = "seg" | "ter" | "qua" | "qui" | "sex" | "sab";

type FreeTime = {
    nome: string;
    seg: string;
    ter: string;
    qua: string;
    qui: string;
    sex: string;
    sab: string;
};

const dias: DiaSemana[] = ["seg", "ter", "qua", "qui", "sex", "sab"];

const horarios = [
  "07:00 - 07:55","07:55 - 08:50","08:50 - 09:45","10:10 - 11:05",
  "11:05 - 12:00"," - ","13:30 - 14:25","14:25 - 15:20",
  "15:45 - 16:40","16:40 - 17:35","17:35 - 18:30","-",
  "19:00 - 19:50","19:50 - 20:40","21:00 - 21:50","21:50 - 22:40",
  "22:40 - 23:30"
];

function criarFreeVazio(): FreeTime {
    return {
        nome: "",
        seg: "0".repeat(horarios.length),
        ter: "0".repeat(horarios.length),
        qua: "0".repeat(horarios.length),
        qui: "0".repeat(horarios.length),
        sex: "0".repeat(horarios.length),
        sab: "0".repeat(horarios.length),
    };
}

export default function Page() {

    const [current, setCurrent] = useState<FreeTime>(criarFreeVazio());
    const [users, setUsers] = useState<FreeTime[]>([]);

    const [isDragging, setIsDragging] = useState(false);
    const [dragValue, setDragValue] = useState<"0" | "1" | null>(null);

    // modal
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [membrosModal, setMembrosModal] = useState<FreeTime[]>([]);

    function toggle(day: DiaSemana, i: number, value: "0" | "1") {
        setCurrent(prev => {
            const arr = prev[day].split("");
            arr[i] = value;
            return { ...prev, [day]: arr.join("") };
        });
    }

    function handleMouseDown(day: DiaSemana, i: number) {
        const newVal = current[day][i] === "1" ? "0" : "1";
        setIsDragging(true);
        setDragValue(newVal);
        toggle(day, i, newVal);
    }

    function handleMouseEnter(day: DiaSemana, i: number) {
        if (isDragging && dragValue) {
            toggle(day, i, dragValue);
        }
    }

    function handleMouseUp() {
        setIsDragging(false);
        setDragValue(null);
    }

    function salvarUsuario() {
        if (!current.nome.trim()) return;

        setUsers(prev => [...prev, current]);
        setCurrent(criarFreeVazio());
    }

    function getQtd(d: DiaSemana, i: number) {
        return users.filter(u => u[d][i] === "1").length;
    }

    function getMembrosOcupados(d: DiaSemana, i: number) {
        return users.filter(u => u[d][i] === "1");
    }

    function hexToRgb(hex: string) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    function getColor(qtd: number, max: number) {
        const start = hexToRgb("#c7f0d2"); // verde
        const end = hexToRgb("#f5b5b5");   // vermelho

        const ratio = max === 0 ? 0 : qtd / max;

        const r = Math.round(start.r + (end.r - start.r) * ratio);
        const g = Math.round(start.g + (end.g - start.g) * ratio);
        const b = Math.round(start.b + (end.b - start.b) * ratio);

        return `rgb(${r}, ${g}, ${b})`;
    }

    return (
    <main style={{ userSelect: 'none' }}>
        <div onMouseUp={handleMouseUp} className={styles.container}>

            {/* MODAL */}
            {open && (
                <ModalMembros
                    titulo={titulo}
                    membros={membrosModal.map((m, index) => ({
                        id: index,
                        nome_completo: m.nome,
                        area: "Temporário"
                    }))}
                    onClose={() => setOpen(false)}
                />
            )}

            {/* ================= TOPO ================= */}
            <div className={styles.card}>

                <div className={styles.header}>
                    <h2 className={styles.title}>Criar Usuário</h2>
                </div>

                <div className={styles.form}>
                    <input
                        className={styles.input}
                        placeholder="Nome"
                        value={current.nome}
                        onChange={(e) => setCurrent({ ...current, nome: e.target.value })}
                    />
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>

                        <thead>
                            <tr>
                                <th>Horário</th>
                                {dias.map(d => <th key={d}>{d.toUpperCase()}</th>)}
                            </tr>
                        </thead>

                        <tbody>
                            {horarios.map((hora, i) => (
                                <tr key={hora}>
                                    <td className={styles.hora}>{hora}</td>

                                    {dias.map(d => {
                                        const ocupado = current[d][i] === "1";

                                        return (
                                            <td
                                                key={d}
                                                onMouseDown={() => handleMouseDown(d, i)}
                                                onMouseEnter={() => handleMouseEnter(d, i)}
                                                className={`${styles.cell} ${ocupado ? styles.ocupado : styles.livre}`}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className={styles.footer}>
                    <button onClick={salvarUsuario} className={styles.btnPrimary}>
                        Salvar usuário
                    </button>
                </div>

            </div>

            {/* ================= LISTA ================= */}
            <div className={styles.card}>

                <h3 className={styles.subtitle}>Usuários criados</h3>

                <div className={styles.list}>
                    {users.map((u, i) => (
                        <div key={i} className={styles.listItem}>
                            {u.nome}
                        </div>
                    ))}
                </div>

            </div>

            {/* ================= TABELA GERAL ================= */}
            <div className={styles.card}>

                <h2 className={styles.title}>Visão Geral</h2>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>

                        <thead>
                            <tr>
                                <th>Horário</th>
                                {dias.map(d => <th key={d}>{d.toUpperCase()}</th>)}
                            </tr>
                        </thead>

                        <tbody>
                            {horarios.map((hora, i) => (
                                <tr key={hora}>
                                    <td className={styles.hora}>{hora}</td>

                                    {dias.map(d => {
                                        const qtd = getQtd(d, i);

                                        return (
                                            <td
                                                key={d}
                                                className={styles.cell}
                                                data-qtd={qtd}
                                                onClick={() => {
                                                    const ocupados = getMembrosOcupados(d, i);

                                                    setMembrosModal(ocupados);
                                                    setTitulo(`${d.toUpperCase()} ${hora}`);
                                                    setOpen(true);
                                                }}
                                                style={{ cursor: "pointer", fontSize: "11px", textAlign: "center", backgroundColor: getColor(qtd, users?.length || 1) }}
                                            >
                                                {qtd}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    </main>
    );
}