import Image from "next/image";
import styles from "../styles/CardEscolas.module.css";

export default function CardEscolas({ imageSrc, title }: {imageSrc: string, title: string}) {
  return (
    <div className={styles.card}>
      <Image
        src={imageSrc}
        alt={title}
        fill
        className={styles.image}
      />
      <div className={styles.overlay}>
        <p className={styles.text}>{title}</p>
      </div>
    </div>
  );
}
