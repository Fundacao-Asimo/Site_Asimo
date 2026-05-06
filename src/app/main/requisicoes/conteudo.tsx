"use client";

import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import HistoricoRow from "./historicoRow";
import { RequiInfo, RequiProps } from "@/app/_lib/DB_requisicoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { insert_req, upload_anexo_req } from "@/app/_actions/requisicoes";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ConteudoRequisicoes({idMembro, listReq}: {idMembro: number, listReq: RequiProps[]})
{
    const [listaMutavel, setListaMutavel] = useState<RequiProps[]>(listReq);
    const [filtro, setFiltro] = useState<RequiProps[]>(listReq);
    const [tipoFiltro, setTipoFiltro] = useState("Todos");
    const [dataInicio, setDataInicio] = useState<string>("");
    const [dataFim, setDataFim] = useState<string>("");
    const [selecao, setSelecao] = useState<boolean>(true);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        let lista = [...listaMutavel];

        if(tipoFiltro === "Pendente")
            lista = lista.filter(r => r.status === null);

        else if(tipoFiltro === "Aprovado")
            lista = lista.filter(r => r.status === true);

        else if(tipoFiltro === "Rejeitado")
            lista = lista.filter(r => r.status === false);

        if(dataInicio)
            lista = lista.filter(r => r.data >= dataInicio);

        if(dataFim)
            lista = lista.filter(r => r.data <= dataFim);

        setFiltro(lista);

    }, [listaMutavel, tipoFiltro, dataInicio, dataFim]);

    async function enviarReq(form: FormData) {
        const formResp = {
            area: form.get('area') as string,
            data_envio: new Date().toISOString().split('T')[0],
            data: form.get('data') as string | null,
            anexo: form.get('anexo') as File | null,
            descricao: form.get('descricao') as string
        }

        if(formResp.area === "Falta" || formResp.area === "Denúncia" || formResp.area === "Advertencia" || formResp.area === "Sugestao" || formResp.area === "Outro")
        {
            formResp.descricao = `${formResp.area} - ` + formResp.descricao;
            formResp.area = "RH";
        }

        let url_novo_anexo = null;
        if(formResp.anexo && formResp.anexo.size > 0)
        {
            url_novo_anexo = await upload_anexo_req(formResp.anexo, formResp.anexo.name);

            if(!url_novo_anexo){
                toast.error('Não foi possível fazer upload do arquivo');
                return;
            }
        }

        const newReq: RequiInfo = {
            membro: idMembro,
            data_envio: formResp.data_envio,
            data: formResp.data ? formResp.data : new Date().toISOString().split('T')[0],
            descricao: formResp.descricao,
            area: formResp.area,
            anexo_url: url_novo_anexo,
            status: null
        }

        const retorno = await insert_req(newReq);
        
        if(!retorno){
            toast.error("Erro ao enviar requisição!");
            return;
        }else{
            toast.success("Requisição enviado com sucesso!");
            setListaMutavel(prev => [retorno, ...prev]);
            formRef.current?.reset();
        }
    }

    return(
        <div className={styles.container}>
            <section className={styles.containerEnviar}>
      
                <div className={styles.tabs}>
                    <button
                        className={selecao ? styles.btnAtivo : styles.btnInativo}
                        onClick={() => {
                            if (selecao) return;
                            setSelecao(true);
                        }}
                    >
                        Para Outras Áreas
                    </button>

                    <button
                        className={!selecao ? styles.btnAtivo : styles.btnInativo}
                        onClick={() => {
                            if (!selecao) return;
                            setSelecao(false);
                        }}
                    >
                        Administrativo / Pessoal
                    </button>
                </div>

                <form
                    ref={formRef}
                    className={styles.form}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await enviarReq(formData);
                    }}
                    encType="multipart/form-data"
                >
                    
                    <h2 className={styles.title}>
                        {selecao
                            ? "Solicitar Apoio Técnico ou Criativo"
                            : "Solicitações Pessoais & RH"}
                    </h2>

                    <div className={styles.row}>
                    
                        <div className={styles.col}>
                            <label className={styles.label} htmlFor="area">
                                {selecao ? "Para qual área?" : "Tipo de Solicitação"}
                            </label>

                            <select className={styles.input} name="area" defaultValue="" required>
                                <option value="" disabled>Selecione</option>
                                {selecao ? (
                                    <>
                                        <option value="Docência">Docência</option>
                                        <option value="Projetos">Projetos</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Gestão">Gestão</option>
                                        <option value="AudioVisual">AudioVisual</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Financeiro">Reembolso Financeiro</option>
                                        <option value="Falta">Justificativa de Falta</option>
                                        <option value="Denúncia">Denúncia</option>
                                        <option value="Advertencia">Recurso de Advertência</option>
                                        <option value="Sugestao">Sugestão</option>
                                        <option value="Outro">Outro</option>
                                    </>
                                )}
                            </select>

                        </div>

                        <div className={styles.col}>
                            <label className={styles.label} htmlFor={`${selecao ? "data" : "anexo"}`}>
                                {selecao ? "Prazo Esperado" : "Ocorrência"}
                            </label>

                            {selecao ? (
                                <input type="date" name="data" className={styles.input} required />
                            ) : (
                                <input type="date" name="data" className={styles.input} required />
                            )}
                        </div>

                        {!selecao && <div className={styles.col}>
                            <label className={styles.label} htmlFor="anexo">
                                Anexar Arquivo (Opcional)
                            </label>
                            <input type="file" name="anexo" className={styles.input} />
                        </div>}

                    </div>

                    <div className={styles.col}>
                        <label className={styles.label} htmlFor="descricao">
                            {selecao ? "O que você precisa?" : "Mensagem Detalhada"}
                        </label>

                        <textarea
                            className={styles.textarea}
                            name="descricao"
                            placeholder={
                            selecao
                                ? "Ex: Preciso de uma arte para post no Instagram..."
                                : "Descreva a situação ou motivos..."
                            }
                            required
                        />
                    </div>

                    <div className={styles.divSubmitBtn}>
                        <button className={styles.submitBtn}>
                            Enviar Pedido <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </div>
                </form>
            </section>

            {/* HISTÓRICO */}
            <section className={styles.historico}>
                <div className={styles.historicoHeader}>
                    <h3>Minhas Requisições</h3>

                    <div className={styles.filtroContainer}>
                        <div className={styles.filtroItem}>
                            <label>Tipo</label>
                            <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                                <option value="Todos">Todos</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
                                <option value="Pendente">Pendente</option>
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
                        return <HistoricoRow key={r.id} dados={r}/>
                    })}
                </div>
            </section>
        </div>
    );
}