"use client";

import styles from "./page.module.css";
import { EventoProps } from "@/app/_lib/DB_reunioes-eventos";
import { MembroProps } from "@/app/_lib/DB_user";
import { PresencaInfo } from "@/app/_lib/DB_presencas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { insert_lista_presencas } from "@/app/_actions/presencas";
import { edit_evento } from "@/app/_actions/reunioes-eventos";

export default function ConteudoControleFrequencia({dadosReuniao, listaMembros}: {dadosReuniao: EventoProps, listaMembros: MembroProps[]})
{
    const router = useRouter();
    const [presencas, setPresencas] = useState<PresencaInfo[]>([]);

    useEffect(() => {
        if (!dadosReuniao || listaMembros.length === 0) {
            toast.error("Erro ao carregar dados!");
            router.push("/main");
        } else {
            inicializarPresencas();
        }
    }, [router, dadosReuniao, listaMembros]);

    function inicializarPresencas() {
        const listaInicial: PresencaInfo[] = listaMembros.map((membro) => ({
            data: dadosReuniao.data,
            membro: membro.id,
            evento: dadosReuniao.id,
            presente: null,
            justificativa: null,
        }));

        setPresencas(listaInicial);
    }

    function atualizarPresenca(membroId: number, valor: boolean) {
        setPresencas((prev) =>
            prev.map((p) =>
                p.membro === membroId
                    ? {
                          ...p,
                          presente: valor,
                          justificativa: valor ? null : p.justificativa,
                      }
                    : p
            )
        );
    }

    function atualizarJustificativa(membroId: number, texto: string) {
        setPresencas((prev) =>
            prev.map((p) =>
                p.membro === membroId ? { ...p, justificativa: texto.trim() === "" ? null : texto } : p
            )
        );
    }

    async function salvarPresencas()
    {
        const naoMarcados = presencas.filter((p) => p.presente === null);

        if (naoMarcados.length > 0) {
            toast.error("Marque todos os membros!");
            return;
        }

        try {
            const response = await insert_lista_presencas(presencas);

            if (!response) {
                throw new Error("ERRO_INSERIR_PRESENCA");
            }

            dadosReuniao.aberta = false;

            const editarReuniao = await edit_evento(dadosReuniao);

            if (!editarReuniao) {
                throw new Error("ERRO_FECHAR_REUNIAO");
            }

            toast.success("Presenças salvas!");
            router.push("/main/agenda-reunioes");

        } catch (error: any) {
            if (error.message === "ERRO_INSERIR_PRESENCA") {
                toast.error("Erro ao salvar presenças!");
            } else if (error.message === "ERRO_FECHAR_REUNIAO") {
                toast.error("Presenças salvas, mas erro ao fechar reunião!");
            } else {
                toast.error("Erro inesperado!");
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Controle de Frequência</h1>

            <div className={styles.info}>
                <p>
                    <strong>Data:</strong> {new Date(dadosReuniao.data + "T00:00:00").toLocaleDateString("pt-BR")}
                </p>
                <p>
                    <strong>Área:</strong> {dadosReuniao.area}
                </p>
                <p>
                    <strong>Tipo:</strong> {dadosReuniao.tipo}
                </p>
            </div>

            <div className={styles.lista}>
                {listaMembros.map((membro) => {
                    const presenca = presencas.find(
                        (p) => p.membro === membro.id
                    );

                    return (
                        <div key={membro.id} className={styles.card}>
                            <p className={styles.nome}>
                                {membro.nome_completo} ({membro.apelido})
                            </p>

                            <div className={styles.botoes}>
                                <button
                                    onClick={() =>
                                        atualizarPresenca(membro.id, true)
                                    }
                                    className={`${styles.botao} ${
                                        presenca?.presente === true
                                            ? styles.presente
                                            : ""
                                    }`}
                                >
                                    Presente
                                </button>

                                <button
                                    onClick={() =>
                                        atualizarPresenca(membro.id, false)
                                    }
                                    className={`${styles.botao} ${
                                        presenca?.presente === false
                                            ? styles.ausente
                                            : ""
                                    }`}
                                >
                                    Ausente
                                </button>
                            </div>

                            {presenca?.presente === false && (
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Justificativa"
                                    value={presenca.justificativa || ""}
                                    onChange={(e) =>
                                        atualizarJustificativa(
                                            membro.id,
                                            e.target.value
                                        )
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={salvarPresencas}
                className={styles.salvar}
            >
                Salvar Presenças
            </button>
        </div>
    );
}