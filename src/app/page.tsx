"use client"

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import styles from "./page.module.css";

export default function Home() {
    const roll = useCallback((destino: string) => {
        if (destino === 'login') {
            window.open('/login', '_self');
            return;
        }

        const destinoRef = document.querySelector(`#${destino}`);
        if (destinoRef) {
            window.scrollTo({
                top: (destinoRef as HTMLElement).offsetTop - 112,
                behavior: "smooth"
            });
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navegationBar}>
                    <div style={{ position: "relative", width: "150px", height: "60px" }}>
                        <Image id="imgLogo" src="/CopiaDeLogoLaranja.png" alt="Imagem da logo da Fundação Asimo" fill style={{ objectFit: "contain", cursor: "pointer" }} onClick={scrollToTop} />
                    </div>
                    <ul id="navUl">
                        <li><button onClick={() => roll("sobre")}>Quem Somos?</button></li>
                        <li><button onClick={() => roll("comoparticipar")}>Como Participar</button></li>
                        <li><button onClick={() => roll("eventos")}>Eventos</button></li>
                        <li><button onClick={() => roll("escolas")}>Nossas Escolas</button></li>
                        <li><Link href="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>

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

            <footer className={styles.footer}>
                <div className={styles.contatos}>
                    <p>Contatos</p>
                    <ul>
                        <li><Image className={styles.contatoImg} src="/icon-telefone.png" alt="Icone de telefone" width={24} height={24} /> (35) 99800-0000</li>
                        <li><Link href="https://www.instagram.com/fundacaoasimo/" target="_blank"><Image className={styles.contatoImg} src="/icon-instagram.png" alt="Instagram" width={24} height={24} />@fundacaoasimo</Link></li>
                        <li><Link href="mailto:fundacaoasimo@unifei.edu.br" target="_blank"><Image className={styles.contatoImg} src="/icon-email.png" alt="Email" width={24} height={24} />fundacaoasimo@unifei.edu.br</Link></li>
                        <li><Link href="https://br.linkedin.com/company/fundacao-asimo" target="_blank"><Image className={styles.contatoImg} src="/icon-linkedin.png" alt="LinkedIn" width={24} height={24} />linkedin</Link></li>
                    </ul>
                </div>
                <section className={styles.parceiros}>
                    <p>Parceiros</p>
                    <ul>
                        <li><Link href="https://unifei.edu.br/" target="_blank"><Image id="imgunifei" src="/icon-unifei.png" alt="Logo da UNIFEI" width={24} height={24} />UNIFEI</Link></li>
                    </ul>
                </section>
            </footer>
        </>
    );
}
