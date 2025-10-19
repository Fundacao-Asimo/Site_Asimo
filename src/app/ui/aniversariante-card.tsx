import Image from "next/image";
import { AniversarianteProps } from "../main/page";
import styles from "../styles/AniversarianteCard.module.css";

export default function AniversarianteCard(props: AniversarianteProps) {
  return (
    <div className={styles.card}>
      <div className={styles.photoWrapper}>
        <Image
          src={props.foto}
          alt={`Foto do membro ${props.nick}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>
          {props.dia} / {props.nick}
        </h3>
      </div>
    </div>
  );
}
