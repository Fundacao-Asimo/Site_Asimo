'use client';

import { FreeTimeProps } from "@/app/_lib/DB_free";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./page.module.css";
import { MembroProps } from "@/app/_lib/DB_user";
import ModalMembros from "./modal";
import { list_free } from "@/app/_actions/free";
import { list_user } from "@/app/_actions/user";

const horarios = [
  "07:00 - 07:55","07:55 - 08:50","08:50 - 09:45","10:10 - 11:05",
  "11:05 - 12:00"," - ","13:30 - 14:25","14:25 - 15:20",
  "15:45 - 16:40","16:40 - 17:35","17:35 - 18:30","-",
  "19:00 - 19:50","19:50 - 20:40","21:00 - 21:50","21:50 - 22:40",
  "22:40 - 23:30"
];

const padrao = {
    seg: Array.from({ length: 17 }, () => []),
    ter: Array.from({ length: 17 }, () => []),
    qua: Array.from({ length: 17 }, () => []),
    qui: Array.from({ length: 17 }, () => []),
    sex: Array.from({ length: 17 }, () => []),
    sab: Array.from({ length: 17 }, () => [])
};

const dias = ["seg", "ter", "qua", "qui", "sex", "sab"];

export default function MeuFreeTimePage()
{
    const [open, setOpenModel] = useState(false);
    const [tituloModel, setTituloModel] = useState("");
    const [membrosModel, setMembrosModel] = useState([]);
    const [todasFree, setTodasFree] = useState<any>(null);
    const [todosUser, setTodosUser] = useState<any>(null);
    const [data, setData] = useState<any>(padrao);
    const [area, setArea] = useState<string>("Todas");
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    useEffect(() => {
        load();
    }, []);


    async function load()
    {
        try {
            const resFree = await list_free();
            const resUser = await list_user();

            if (resFree.length === 0 || resUser.length === 0) {
                toast.error("Não foi possível acessar seus dados!");
                redirect("/main");
            }

            setTodasFree(resFree);
            setTodosUser(resUser);
            preencherData(resFree, resUser);
            setSelectedMembers(resUser.map((m: MembroProps) => m.id));

        } catch (err) {
            toast.error("Erro ao carregar dados");
        }
    }

    function preencherData(listaFree: FreeTimeProps[], listaMembros: MembroProps[])
    {
        const membrosIds = new Set(listaMembros.map(m => m.id));

        const temp = {
            seg: Array.from({ length: 17 }, () => [] as number[]),
            ter: Array.from({ length: 17 }, () => [] as number[]),
            qua: Array.from({ length: 17 }, () => [] as number[]),
            qui: Array.from({ length: 17 }, () => [] as number[]),
            sex: Array.from({ length: 17 }, () => [] as number[]),
            sab: Array.from({ length: 17 }, () => [] as number[])
        };

        for (const free of listaFree) {

            if (!membrosIds.has(free.membro))
                continue;

            for (const d of dias) {

                const horariosDia = free[d];

                for (let i = 0; i < horariosDia.length; i++) {

                    if (horariosDia[i] !== "1")
                        continue;

                    temp[d][i].push(free.membro);
                }
            }
        }

        setData(temp);
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

    function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        let filtroArea;

        if(value === area)
            return;

        else if(value === "Todas")
            filtroArea = todosUser;

        else if(value === "Diretoria")
            filtroArea = todosUser.filter((m: MembroProps) => m.adm === true);

        else
            filtroArea = todosUser.filter((m: MembroProps) => m.area === value);

        preencherData(todasFree, filtroArea);
        setSelectedMembers(filtroArea.map((m: MembroProps) => m.id));
        setArea(value);
    }

    function toggleMember(id: number) {
        setSelectedMembers(prev =>
            prev.includes(id)
                ? prev.filter(m => m !== id)
                : [...prev, id]
        );
    }

    function aplicarFiltroMembros() {

        if (selectedMembers.length === 0) {
            preencherData(todasFree, todosUser);
            return;
        }

        const membrosSelecionados = todosUser.filter((m: MembroProps) =>
            selectedMembers.includes(m.id)
        );

        preencherData(todasFree, membrosSelecionados);
    }

    return (
        <>
            {open && <ModalMembros titulo={tituloModel} membros={membrosModel} onClose={() => setOpenModel(false)}/>}
            <main style={{ userSelect: 'none' }}>
                
                <div className={styles.bottomGrid}>
                    <div className={styles.infoCard}>
                        <div>
                            <div className={styles.title}>Legenda</div>
                            <div className={styles.legendItem}>
                                <div className={`${styles.colorBox} ${styles.livreBox}`} />
                                <div>
                                    <strong>0% Ocupado</strong>
                                    <div className={styles.subtitle}>Mais pessoas disponíveis</div>
                                </div>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={`${styles.colorBox} ${styles.ocupadoBox}`} />
                                <div>
                                    <strong>100% Ocupado</strong>
                                    <div className={styles.subtitle}>Menos pessoas disponíveis</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.title}>Aplicar Filtro</div>
                            <div className={styles.legendItem}>
                                <select onChange={handleAreaChange} className={styles.input} name="area" id="area" defaultValue="Todas" style={{cursor: "pointer"}}>
                                    <option value="Todas">Todas as Áreas</option>
                                    <option value="Docência">Docência</option>
                                    <option value="Projetos">Projetos</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Gestão">Gestão</option>
                                    <option value="AudioVisual">AudioVisual</option>
                                    <option value="Diretoria">Diretoria</option>
                                </select>
                            </div>
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
                                            return (
                                                <td
                                                    key={d}
                                                    onClick={() => {
                                                        setMembrosModel(todosUser.filter((m: MembroProps) => data[d][i].includes(m.id)));
                                                        setTituloModel(`${d} ${hora}`);
                                                        setOpenModel(true);
                                                    }}
                                                    className={styles.livre}
                                                    style={{ cursor: "pointer", fontSize: "11px", textAlign: "center", backgroundColor: getColor(data[d][i].length, todasFree?.length || 1) }}
                                                >
                                                    {data[d][i].length}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.bottomGrid}>
                    <div className={styles.infoCard}>
                        <div style={{width: "100%"}}>
                            <div className={styles.title}>Seleção de Membros</div>
                            <div className={styles.controls}>
                                {todosUser?.map((m: MembroProps) => (
                                    <label key={m.id} className={styles.memberItem}>
                                        <input
                                            type="checkbox"
                                            checked={selectedMembers.includes(m.id)}
                                            onChange={() => toggleMember(m.id)}
                                        />
                                        <span>{m.nome_completo}</span>
                                    </label>
                                ))}
                            </div>
                            <div style={{width: "100%", gap: "1rem", display: "flex", justifyContent: "flex-end", marginTop: "1.5rem"}}>
                                <button className={`${styles.button} ${styles.btnLivre}`} onClick={aplicarFiltroMembros}>
                                    Aplicar Filtro
                                </button>
                                <button className={`${styles.button} ${styles.btnOcupado}`} onClick={() => {
                                    setSelectedMembers([]);
                                    preencherData(todasFree, todosUser);
                                }}>Limpar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}