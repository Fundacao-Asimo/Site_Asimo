'use client';

import styles from "./modal.module.css";

interface fodase {
    id: number,
    nome_completo: string,
    area: string
}

export default function ModalMembros({ titulo, membros, onClose }: {titulo: string, membros: fodase[], onClose: () => void}) {

    function getInitials(nome: string) {
        const partes = nome.split(" ");
        return partes[0][0] + (partes[1]?.[0] || "");
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>
                    <h2>Detalhes: {titulo}</h2>
                    <button onClick={onClose} className={styles.close}>×</button>
                </div>
                <h4 className={styles.h4}>Membros Ocupados ({membros.length}):</h4>
                <div className={styles.lista}>

                    {membros.map((membro) => (
                        <div key={membro.id} className={styles.item}>

                            <div className={styles.avatar}>
                                {getInitials(membro.nome_completo)}
                            </div>

                            <div className={styles.info}>
                                <span className={styles.nome}>
                                    {membro.nome_completo}
                                </span>

                                <span className={styles.area}>
                                    {membro.area}
                                </span>
                            </div>

                        </div>
                    ))}

                </div>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.btn}>
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
}