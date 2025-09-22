'use client';

import { useState } from "react";
import styles from "../styles/FlipCard.module.css"; // CSS separado
import Image from "next/image";

export default function FlipCard({txtFrente, txtAtras, txtImg}:{txtFrente: string, txtAtras:string, txtImg:string}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <Image src={txtImg} alt={"Imagem da logo de " + txtFrente} width={110} height={110}/>
          {txtFrente}
        </div>
        <div className={styles.cardBack}>
          <p>{txtAtras}</p>
        </div>
      </div>
    </div>
  );
}
