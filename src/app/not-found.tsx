import Image from "next/image";
import Link from "next/link";
import styles from "./_styles/not-found.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>404</h1>

                <h2 className={styles.subtitle}>
                    Estamos trabalhando nessa página no momento!!!
                </h2>

                <div className={styles.image}>
                    <Image src="/irgor.png" alt="igor" width={350} height={350} />
                </div>

                <Link href="/main" className={styles.link}>
                    Voltar para página
                </Link>
            </div>
        </div>
    );
}