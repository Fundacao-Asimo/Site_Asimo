'use client';

import styles from "./modal.module.css";

export default function ModalReunioes({ onClose }: {onClose: () => void}) {

    async function criar(form: FormData) {
        const new = {
            
        }
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>
                    <h2>Marcar Reunião</h2>
                    <button onClick={onClose} className={styles.close}>×</button>
                </div>
                <form action={criar} className={styles.lista}>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="data">Data:</label>
                        <input className={styles.input} type="date" name="data" id="data" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="area">Área:</label>
                        <select name="area" id="area" defaultValue="" className={styles.select} required>
                            <option value="" disabled>Selecione uma área</option>
                            <option value="Geral">Geral</option>
                            <option value="Docência">Docência</option>
                            <option value="Projetos">Projetos</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Gestão">Gestão</option>
                            <option value="AudioVisual">AudioVisual</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="descricao">Descrição (Opcional):</label>
                        <input className={styles.input} type="text" name="descricao" id="descricao" placeholder="Descrição..." />
                    </div>

                    <button className={styles.button}>Marcar Reunião</button>

                </form>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.btn}>
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
}