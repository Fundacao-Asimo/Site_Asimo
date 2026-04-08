"use client";

import styles from "./page.module.css";
import { EscolaProps } from "@/app/_lib/DB_escolas";
import { MembroProps } from "@/app/_lib/DB_user";
import ModalNewEscola from "./modal";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapLocationDot, faPencil, faPhone, faPlusCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import BoxEscola from "./escola";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ConteudoControleEscolas({escolas, listMembros}: {escolas: EscolaProps[], listMembros: MembroProps[]})
{
    const router = useRouter();
    useEffect(() => {
        if (listMembros.length <= 0) {
            toast.error("Erro ao carregar dados!");
            router.push("/main");
            return;
        }
    }, [listMembros, router]);

    const [listEscolas, setListEscolas] = useState<EscolaProps[]>(escolas);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [detail, setDetail] = useState<EscolaProps | null>(null);

    const roll = useCallback(() => {
        const destinoRef = document.querySelector("#detalhes");
        if (destinoRef) {
            window.scrollTo({
                top: (destinoRef as HTMLElement).offsetTop - 112,
                behavior: "smooth"
            });
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        if(detail === null)
            scrollToTop();
        else
            roll();
    }, [roll, detail]);

    return(
        <>
            {modalOpen && <ModalNewEscola onClose={() => setModalOpen(false)} onSuccess={(e: EscolaProps) => setListEscolas(prev => [e, ...prev])}/>}
            <div className={styles.container}>
                <button className={styles.buttonCadastrar} onClick={() => {setModalOpen(true)}}><FontAwesomeIcon icon={faPlusCircle}/> Cadastrar Nova Escola</button>
                <div className={styles.grid}>
                    {listEscolas.map((e) => <BoxEscola key={e.id} dados={e} onClick={() => setDetail(e)}/>)}
                </div>

                {detail && 
                    <div id="detalhes" className={styles.containerDetalhe}>
                        <div className={styles.headerTopo}>
                            <span className={styles.voltar} onClick={() => setDetail(null)}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Voltar para lista
                            </span>

                            <h1 className={styles.tituloDetalhe}>
                                {detail.nome}
                            </h1>

                            <p className={styles.enderecoDetalhe}>
                                {detail.endereco}, Itajubá
                            </p>
                        </div>

                        <div className={styles.gridInfo}>
                            <div className={styles.cardInfoAzul}>
                                <span className={styles.labelDetalhe}>HORÁRIO DAS AULAS</span>
                                <strong>{detail.horario}</strong>
                            </div>

                            {detail.turma && <div className={styles.cardInfoVerde}>
                                <span className={styles.labelDetalhe}>TURMA</span>
                                <strong>{detail.turma}</strong>
                            </div>}

                            <div className={styles.cardInfoRoxo}>
                                <span className={styles.labelDetalhe}>RESPONSÁVEL</span>
                                <strong>{detail.nome_responsavel}</strong>
                            </div>
                        </div>

                        <div className={styles.gridInferior}>
                            <div>
                                <h3 className={styles.subtitulo}>Informações da Escola</h3>

                                <div className={styles.infoLinha}>
                                    <FontAwesomeIcon icon={faPhone} /> <span>{detail.nome_responsavel} - {detail.telefone_responsavel}</span>
                                </div>
                                {detail.endereco_url && <Link target="_blank" href={detail.endereco_url} className={styles.rotaBtn}>
                                    <FontAwesomeIcon icon={faMapLocationDot} />
                                    Ver Rota
                                </Link>}
                            </div>

                            <div>
                                <h3 className={styles.subtitulo}>Membros Atuantes</h3>

                                <div className={styles.listaMembros}>
                                    {listMembros.map((m) => {
                                        if(detail.membros.includes(m.id))
                                            return(
                                                <div key={m.id} className={styles.itemMembro}>
                                                    <div className={styles.avatarMembro}>
                                                        {m.nome_completo
                                                            .split(' ')
                                                            .map(n => n[0])
                                                            .slice(0, 2)
                                                            .join('')}
                                                    </div>

                                                    <strong>{m.nome_completo}</strong>
                                                </div>
                                            )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={styles.footerAcoes}>
                            <Link href={`/main/escolas-parceiras/edit/${detail.id}`} className={styles.btnAzul}><FontAwesomeIcon icon={faPencil}/> Editar Dados</Link>
                            <Link href={`/main/escolas-parceiras/membros/${detail.id}`} className={styles.btnRoxo}><FontAwesomeIcon icon={faUsers}/> Gerenciar Equipe</Link>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}