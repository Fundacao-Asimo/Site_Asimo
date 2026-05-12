"use client";

import styles from "./page.module.css";
import { DictAreaFalta } from "./page";
import { useState } from "react";

export default function ConteudoControlePresencas({dict}: {dict: DictAreaFalta})
{
    const [areaAtual, setAreaAtual] = useState<string>("Geral");

    const membros_temp = [
        {
            nome: 'Igor Fantucci',
            area: 'Diretoria',
            presenca: 92,
            frequencia: '11/12',
            status: 'Excelente',
        },
        {
            nome: 'Lucas Mendes',
            area: 'Projetos',
            presenca: 85,
            frequencia: '17/20',
            status: 'Bom',
        },
        {
            nome: 'Ana Clara',
            area: 'Docência',
            presenca: 78,
            frequencia: '14/18',
            status: 'Regular',
        },
        {
            nome: 'Mariana Costa',
            area: 'Marketing',
            presenca: 95,
            frequencia: '19/20',
            status: 'Excelente',
        },
        {
            nome: 'Pedro Henrique',
            area: 'Projetos',
            presenca: 65,
            frequencia: '13/20',
            status: 'Crítico',
        },
    ];

    const tabs = [
        'Geral',
        'Docência',
        'Projetos',
        'Marketing',
        'Gestão',
        'AudioVisual',
        'Diretoria'
    ];

    function getStatusColor(status: string) {
        switch (status) {
            case 'Excelente':
                return styles.statusExcellent;

            case 'Bom':
                return styles.statusGood;

            case 'Regular':
                return styles.statusRegular;

            case 'Crítico':
                return styles.statusCritical;

            default:
                return styles.statusDefault;
        }
    }

    function getAreaColor(area: string) {
        switch (area) {
            case 'Diretoria':
                return styles.areaDiretoria;

            case 'Projetos':
                return styles.areaProjetos;

            case 'Docência':
                return styles.areaDocencia;

            case 'Marketing':
                return styles.areaMarketing;

            default:
                return styles.areaDefault;
        }
    }

    function getProgressColor(value: number) {
        if (value >= 80) return styles.progressGreen;

        if (value >= 70) return styles.progressYellow;

        return styles.progressRed;
    }

    return(
        <div className={styles.content}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Controle de Frequência
                </h1>

                <div className={styles.actions}>
                    <button className={styles.exportButton}>
                        Exportar Relatório
                    </button>
                </div>
            </div>

            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setAreaAtual(tab)}
                        className={`${styles.tab} ${
                            areaAtual === tab
                                ? styles.activeTab
                                : ''
                        }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        {areaAtual === "Geral" && "Frequência Geral - Reuniões Gerais"}
                        {areaAtual !== "Geral" && `Frequência - ${areaAtual}`}
                    </h2>

                    <p className={styles.subtitle}>
                        Clique em um registro para ver mais
                    </p>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Membro</th>
                            <th>Área</th>
                            <th>Presença</th>
                            <th>Frequência</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {membros_temp.map((membro) => (
                            <tr key={membro.nome}>
                                <td className={styles.memberName}>
                                    {membro.nome}
                                </td>

                                <td>
                                    <span
                                        className={`${styles.areaBadge} ${getAreaColor(membro.area)}`}
                                    >
                                        {membro.area}
                                    </span>
                                </td>

                                <td>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={`${styles.progressFill} ${getProgressColor(membro.presenca)}`}
                                            style={{
                                                width: `${membro.presenca}%`,
                                            }}
                                        >
                                            {membro.presenca}%
                                        </div>
                                    </div>
                                </td>

                                <td className={styles.frequency}>
                                    {membro.frequencia}
                                </td>

                                <td>
                                    <span
                                        className={`${styles.statusBadge} ${getStatusColor(membro.status)}`}
                                    >
                                        {membro.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}