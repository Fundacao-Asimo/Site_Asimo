"use client"

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.viewPrincipal}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                </div>

                <div className={styles.topicos} id="sobre">
                    <Image src="/fundacao-membros.jpg" alt="Imagem dos membros da segurando a bandeeira da Fundação Asimo" width={500} height={300} />
                    <div>
                        <h2 className={styles.h2}>Quem Somos?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                </div>

                <div className={styles.topicos} id="comoparticipar">
                    <div>
                        <h2 className={styles.h2}>Como Participar</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                </div>

                <div className={styles.topicos} id="eventos">
                    <div>
                        <h2 className={styles.h2}>Eventos</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                </div>

                <div className={styles.topicos} id="escolas">
                    <div>
                        <h2 className={styles.h2}>Nossas Escolas</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                    <Image src="/IMG-20250415-WA0011.jpg" alt="Imagem de sala de aula de uma das aulas ministradas pela Fundação Asimo" width={500} height={300} />
                </div>
            </main>
        </>
    );
}
