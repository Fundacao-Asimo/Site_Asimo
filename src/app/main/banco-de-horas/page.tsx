"use client";

import styles from "../../styles/padrao.module.css";
import cabecalho from "../../styles/hora-detalhe.module.css";
import { isSessionValid } from "@/app/lib/session";
import HoraDetalhe from "@/app/ui/hora-detalhe";
import DB_horas, { HoraInfo } from "@/app/lib/DB_horas";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function BancoPage()
{
    const [listHoras, setListHoras] = useState<any[]>([]);
    const [usuarioId, setUsuarioId] = useState<any>(null);

    useEffect(() => {
        load();
    }, []);

    async function load()
    {
        const session = await isSessionValid();
        const usuarioIdTemp = session as { userId: number };
        const listHorasTemp = await DB_horas.list_horas_membro(usuarioIdTemp.userId);

        listHorasTemp.forEach((hora) => {
            hora.data = new Date(hora.data + "T00:00:00").toLocaleDateString("pt-BR");
        });

        setUsuarioId(usuarioIdTemp);
        setListHoras(listHorasTemp);
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

        const retorno = await DB_horas.insert_hora(dados);

        if(!retorno)
            toast.error("Não foi possível cadastrar suas horas!");
        else
            toast.success("Horas cadastradas com sucesso!");
    }

    return (
        <main>
            <div className={styles.div_horizontal}>
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
                <div className={styles.quadro} style={{flex: "2.5", padding: "1rem 0rem", height: "65vh", minHeight: "0"}}>
                    <h3 style={{width: "100%", textAlign: "left", marginLeft: "1rem", marginBottom: "1rem"}}>Meu Histórico Completo</h3>
                    <div style={{width: "100%", overflowY: "auto"}}>
                        {listHoras.length === 0 ? (
                            <p>Nenhuma hora cadastrada</p>
                        ) : (
                            listHoras.map((hora) => (
                                <HoraDetalhe key={hora.id} dados={hora} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
