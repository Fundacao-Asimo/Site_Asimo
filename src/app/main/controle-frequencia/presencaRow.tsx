"use client";

import styles from "./page.module.css";
import { DadosFalta } from "./page";
import { useState } from "react";

export default function PresencaRow({ list }: { list: DadosFalta[] })
{
    const [open, setOpen] = useState<boolean>(false);

    const faltas = list.filter((d: DadosFalta) => d.presente === false);

    if (faltas.length === 0)
        return null;

    const porcentagem_falta = Math.round(((list.length - faltas.length) / list.length) * 100);

    let status = "";

    if (porcentagem_falta === 100)
        status = "Excelente";

    else if (porcentagem_falta >= 80)
        status = "Bom";

    else if (porcentagem_falta >= 60)
        status = "Regular";

    else
        status = "Crítico";

    function getStatusColor()
    {
        switch (status) {
            case "Excelente":
                return styles.statusExcellent;

            case "Bom":
                return styles.statusGood;

            case "Regular":
                return styles.statusRegular;

            case "Crítico":
                return styles.statusCritical;

            default:
                return styles.statusDefault;
        }
    }

    function getAreaColor(area: string)
    {
        switch (area) {
            case "Diretoria":
                return styles.areaDiretoria;

            case "Projetos":
                return styles.areaProjetos;

            case "Docência":
                return styles.areaDocencia;

            case "Marketing":
                return styles.areaMarketing;

            default:
                return styles.areaDefault;
        }
    }

    function getProgressColor(value: number)
    {
        if (value >= 80) return styles.progressGreen;

        if (value >= 60) return styles.progressYellow;

        return styles.progressRed;
    }

    function trocar()
    {
        setOpen(!open);
    }

    return (
        <>
            <div className={styles.row} onClick={trocar}>
                <div className={styles.memberName}>
                    {faltas[0].membro}
                </div>

                <div>
                    <span
                        className={`${styles.areaBadge} ${getAreaColor(faltas[0].area)}`}
                    >
                        {faltas[0].area}
                    </span>
                </div>

                <div>
                    <div className={styles.progressBar}>
                        <div
                            className={`${styles.progressFill} ${getProgressColor(porcentagem_falta)}`}
                            style={{
                                width: `${porcentagem_falta}%`,
                            }}
                        >
                        </div>
                        <p className={styles.porcentagem}>{porcentagem_falta}%</p>
                    </div>
                </div>

                <div className={styles.frequency}>
                    {`${list.length - faltas.length}/${list.length}`}
                </div>

                <div>
                    <span className={`${styles.statusBadge} ${getStatusColor()}`}>
                        {status}
                    </span>
                </div>
            </div>

            <div
                className={`${styles.dropdown} ${
                    open ? styles.dropdownOpen : styles.dropdownClosed
                }`}
            >
                {faltas.map((f: DadosFalta) => (
                    <div key={f.id} className={styles.row_unique}>
                        <div className={styles.memberName}>
                            {f.membro}
                        </div>

                        <div className={styles.frequency}>
                            {new Date(f.data + "T00:00:00").toLocaleDateString("pt-BR")}
                        </div>

                        <div className={styles.frequency}>
                            {f.area === "Geral" ? "Reunião Geral" : "Reunião de " + f.area}
                        </div>

                        <div className={styles.frequency}>
                            {f.justificativa ? f.justificativa : "(Sem Justificativa)"}
                        </div>

                        <div>
                            <span className={`${styles.statusBadge} ${styles.statusCritical}`}>
                                Falta
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}