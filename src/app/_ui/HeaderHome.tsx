'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "../_styles/HeaderHome.module.css";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderHome()
{
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);

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

    return(
        <header className={styles.header}>
            <nav className={styles.navegationBar}>
                <Image id="imgLogo" className={styles.img} src="/Robo.png" alt="Imagem da logo da Fundação Asimo" width={50} height={70} style={{ objectFit: "contain", cursor: "pointer" }} onClick={scrollToTop}/>
                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>
                <ul id="navUl" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} onClick={() => setMenuOpen(false)}>
                    <li><a onClick={() => roll("sobre")}>Quem Somos?</a></li>
                    <li><a onClick={() => roll("missao")}>Nossa Missão</a></li>
                    <li><a onClick={() => roll("eventos")}>Eventos</a></li>
                    <li><a onClick={() => roll("escolas")}>Escolas</a></li>
                    <li><a onClick={() => roll("areas")}>Nossas Áreas</a></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}