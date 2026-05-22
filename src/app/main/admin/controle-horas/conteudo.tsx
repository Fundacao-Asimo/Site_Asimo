"use client";

import styles from "./page.module.css";
import modal from "./modal.module.css";
import { useEffect, useState } from "react";
import { MembroProps } from "@/app/_lib/DB_user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HoraProps } from "@/app/_lib/DB_horas";
import HoraDetalhe from "./hora-detalhe";
import { delete_hora, edit_hora } from "@/app/_actions/hora";

const areas = ["Docência", "Projetos", "Marketing", "Gestão", "AudioVisual"];

export default function ConteudoControleHoras({listHoras, listMembros}: {listHoras: HoraProps[], listMembros: MembroProps[]})
{
    const router = useRouter();
    useEffect(() => {
        if (listMembros.length === 0) {
            toast.error("Não foi possível acessar dados!");
            router.push("/main");
            return;
        }
    }, [listMembros, router]);

    const [area, setArea] = useState<string>("Todas");
    const [status, setStatus] = useState<string>("Todos");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");
    const [filtro, setFiltro] = useState<HoraProps[]>(listHoras);
    const [selectedMembers, setSelectedMembers] = useState<number[]>(listMembros.map(m => m.id));
    const [modalConfirm, setModalConfirm] = useState<{
            open: boolean;
            hora: HoraProps | null;
            accept: boolean;
        }>({
            open: false,
            hora: null,
            accept: false
        });
    const [modalExcluir, setModalExcluir] = useState<{
            open: boolean;
            hora: HoraProps | null;
        }>({
            open: false,
            hora: null
        });

    useEffect(() => {
        let lista = listHoras.filter(h => selectedMembers.includes(h.membro));

        if(status === "Aprovado")
            lista = lista.filter(h => h.aprovado === true);

        else if(status === "Rejeitado")
            lista = lista.filter(h => h.aprovado === false);

        else if(status === "Pendente")
            lista = lista.filter(h => h.aprovado === null);

        if(dataInicio)
            lista = lista.filter(h => h.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(h => h.data <= dataFim);

        setFiltro(lista);

    }, [listHoras, selectedMembers, status, dataInicio, dataFim]);

    function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        filtrarArea(e.target.value);
    }

    function filtrarArea(value: string) {
        let filtroArea;

        if(value === area)
            return;

        else if(value === "Todas")
            filtroArea = listMembros;

        else if(value === "Diretoria")
            filtroArea = listMembros.filter((m: MembroProps) => m.adm === true);

        else
            filtroArea = listMembros.filter((m: MembroProps) => m.area === value);

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

    function handleDelete(id: number) {
        listHoras.filter((hora) => hora.id !== id);
        setFiltro((prev) => prev.filter((hora) => hora.id !== id));
    }

    const membrosPorArea = areas.reduce((acc, area) => {
        acc[area] = listMembros.filter((m) => m.area === area);
        return acc;
    }, {} as Record<string, MembroProps[]>);

    return(
        <>
            {modalConfirm.open && modalConfirm.hora && <ModalConfirm accept={modalConfirm.accept} hora={modalConfirm.hora} onClose={() => setModalConfirm(prev => ({...prev, open: false}))}/>}
            {modalExcluir.open && modalExcluir.hora && <ModalExcluir hora={modalExcluir.hora} onSucess={(H: HoraProps) => handleDelete(H.id)} onClose={() => setModalExcluir(prev => ({...prev, open: false}))}/>}
            <div className={styles.container}>
                <div className={styles.historico}>
                    <div className={styles.historicoHeader}>
                        <h3>Histórico</h3>

                        <div className={styles.filtroContainer}>
                            <div className={styles.filtroItem}>
                                <label>Tipo</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Todos">Todos</option>
                                    <option value="Pendente">Pendente</option>
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
                                <label>Áreas</label>
                                <select onChange={handleAreaChange} value={area} className={styles.input} name="area" id="area" style={{cursor: "pointer"}}>
                                    <option value="Todas">Todas as Áreas</option>
                                    <option value="Docência">Docência</option>
                                    <option value="Projetos">Projetos</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Gestão">Gestão</option>
                                    <option value="AudioVisual">AudioVisual</option>
                                    <option value="Diretoria">Diretoria</option>
                                    <option value="Nenhuma">Nenhuma</option>
                                </select>
                            </div>
                            <div className={styles.filtroItem}>
                                <button className={styles.clearButton} disabled={!dataInicio && !dataFim && status === "Todos" && area === "Todas"} onClick={() => {
                                    setStatus("Todos");
                                    filtrarArea("Todas");
                                    setDataInicio("");
                                    setDataFim("");
                                }}>Limpar</button>
                            </div>
                        </div>
                    </div>
                

                    <div className={styles.card}>
                        <div className={styles.tableWrapper}>    
                            {filtro.map((h: HoraProps) => <HoraDetalhe key={h.id} dados={h} membro={listMembros.find(m => m.id === h.membro)} onDelete={() => setModalExcluir({open: true, hora: h})} popUp={(x) => setModalConfirm(x)}/>)}
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div style={{width: "100%", flexWrap: "wrap"}}>
                            <div className={styles.title}>Seleção de Membros</div>
                            <div className={styles.controls}>
                                {areas.map((area) => (
                                    <div className={styles.area} key={area}>
                                        <div className={styles.title} style={{ fontSize: "14px", marginBottom: "0.5rem" }}>
                                            {area}
                                        </div>

                                        {membrosPorArea[area].map((m: MembroProps) => (
                                            <label key={m.id} className={styles.memberItem}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMembers.includes(m.id)}
                                                    onChange={() => toggleMember(m.id)}
                                                />
                                                <span>{m.apelido}</span>
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div style={{width: "100%", gap: "1rem", display: "flex", justifyContent: "flex-end", marginTop: "1.5rem"}}>
                                <button className={`${styles.button} ${styles.btnOcupado}`} onClick={() => {
                                    setSelectedMembers([]);
                                    setStatus("Todos");
                                    setArea("Nenhuma");
                                }}>Limpar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ModalConfirm({ accept, hora, onClose }: {accept: boolean, hora: HoraProps, onClose: () => void})
{

    async function editar() {
        hora.aprovado = accept ? true : false;
        const retorno = await edit_hora(hora);

        if(!retorno)
        {
            toast.error(`Erro ao ${accept ? "aprovar requisição" : "rejeitar requisição"}!`);
            onClose();
        }
        else
        {
            toast.success(`Êxito ao ${accept ? "aprovar requisição" : "rejeitar requisição"}!`);
            onClose();
        }
    }

    return(
        <div className={modal.overlay}>
        
            <div className={modal.modal}>

                <div className={modal.header}>
                    {accept ? <h2>Aprovar Horas?</h2> : <h2>Rejeitar Horas?</h2>}
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

function ModalExcluir({ hora, onClose, onSucess }: {hora: HoraProps, onClose: () => void, onSucess: (h: HoraProps) => void})
{

    async function excluir() {
        const retorno = await delete_hora(hora.id);

        if(!retorno)
        {
            toast.error(`Erro ao excluir registro!`);
            onClose();
        }
        else
        {
            toast.success(`Êxito ao excluir registro!`);
            onSucess(hora);
            onClose();
        }
    }

    return(
        <div className={modal.overlay}>
        
            <div className={modal.modal}>

                <div className={modal.header}>
                    <h2>Excluir Registro?</h2>
                    <button onClick={onClose} className={modal.close}>×</button>
                </div>

                <div className={modal.footer}>
                    <button onClick={excluir} className={modal.btnConf}>
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