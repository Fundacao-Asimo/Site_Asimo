import styles from "../_styles/loading.module.css";

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                
                <div className={styles.spinner}></div>

                <p className={styles.text}>
                    Carregando...
                </p>

            </div>
        </div>
    );
}