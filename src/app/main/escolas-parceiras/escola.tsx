import { EscolaProps } from '@/app/_lib/DB_escolas';
import styles from './escola.module.css';

export default function BoxEscola({dados, onClick}: {dados: EscolaProps, onClick: () => void})
{    
    const map = [
        "cor0",
        "cor1",
        "cor2",
        "cor3",
        "cor4",
        "cor5",
        "cor6",
        "cor7",
        "cor8",
        "cor9"
    ];

    return (
        <div className={styles.card} onClick={() => onClick()}>
            <div className={`${styles.header} ${styles[map[dados.id % 10]]}`}>
                <h2 className={styles.titulo}>{dados.nome}</h2>
                <p className={styles.subtitulo}>Itajubá - MG</p>
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.group}>
                        <span className={styles.label}>HORÁRIO</span>
                        <span className={styles.valor}>{dados.horario}</span>
                    </div>

                    {dados.turma && <div className={styles.group}>
                        <span className={styles.label}>TURMA</span>
                        <span className={styles.valor}>{dados.turma}</span>
                    </div>}
                </div>

                <div className={styles.footer}>
                    <div className={styles.avatars}>
                        {dados.membros.map((m) => <div key={m} className={`${styles.avatar} ${styles[map[m % 10]]}`}></div>)}
                    </div>

                    <span className={styles.membros}>
                        {dados.membros.length} membros atuando
                    </span>
                </div>
            </div>
        </div>
    );
}