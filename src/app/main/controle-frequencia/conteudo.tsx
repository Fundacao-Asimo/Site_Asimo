"use client";

import styles from "./page.module.css";
import { DictAreaFalta } from "./page";
import { useState } from "react";
import PresencaRow from "./presencaRow";

export default function ConteudoControlePresencas({dict}: {dict: DictAreaFalta})
{
    const [areaAtual, setAreaAtual] = useState<string>("Geral");

    const tabs = [
        'Geral',
        'Docência',
        'Projetos',
        'Marketing',
        'Gestão',
        'AudioVisual',
        'Diretoria',
        'Todas'
    ];

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

                <div className={styles.list}>
                    <div className={`${styles.row} ${styles.headerRow}`}>
                        <div>Membro</div>
                        <div>Área</div>
                        <div>Presença</div>
                        <div>Frequência</div>
                        <div>Status</div>
                    </div>

                    {Object.entries(dict[areaAtual]).map(([chave, valor]) => {
                        return(<PresencaRow key={chave} list={valor}/>)
                    })}
                </div>
            </div>
        </div>
    );
}