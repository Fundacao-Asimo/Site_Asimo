'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./logout-btn";

export default function Header({ isLogged, isAdm }: {isLogged: boolean, isAdm: boolean}) {
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
                {!isLogged && <Image id="imgLogo" className={styles.img} src="/Robo.png" alt="Imagem da logo da Fundação Asimo" width={50} height={70} style={{ objectFit: "contain", cursor: "pointer" }} onClick={scrollToTop}/>}
                {isLogged && <Image id="imgLogo" className={styles.img} src="/Robo.png" alt="Imagem da logo da Fundação Asimo" width={50} height={70} style={{ objectFit: "contain", cursor: "pointer" }} onClick={() => router.push("/main")}/>}
                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>
                <ul id="navUl" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} onClick={() => setMenuOpen(false)}>
                    {!isLogged && <li><a onClick={() => roll("sobre")}>Quem Somos?</a></li>}
                    {!isLogged && <li><a onClick={() => roll("missao")}>Nossa Missão</a></li>}
                    {!isLogged && <li><a onClick={() => roll("eventos")}>Eventos</a></li>}
                    {!isLogged && <li><a onClick={() => roll("escolas")}>Escolas</a></li>}
                    {!isLogged && <li><a onClick={() => roll("areas")}>Nossas Áreas</a></li>}
                    {!isLogged && <li><Link href="/login">Login</Link></li>}
                    {isLogged && <li><Link href="/main">Home</Link></li>}
                    {isLogged && <li><Link href="/main/dados-pessoais">Dados Pessoais</Link></li>}
                    {isLogged && <li><Link href="/main/horarios-pessoais">Horários Pessoais</Link></li>}
                    {isLogged && <li><Link href="/main/free-time">Free Time</Link></li>}
                    {isLogged && <li><Link href="https://drive.google.com/drive/folders/1wEhCZUAgwSYat5SqRdnrFv-2BcZXhgCB?usp=drive_link">Drive</Link></li>}
                    {isLogged && <li><Link href="/main/agenda">Agenda</Link></li>}
                    {isLogged && <li><Link href="/main/tools">Tools</Link></li>}
                    {isLogged && isAdm && <li><Link href="/main/membros">Membros</Link></li>}
                    {isLogged && <li><LogoutButton/></li>}
                </ul>
            </nav>
        </header>
    );
}