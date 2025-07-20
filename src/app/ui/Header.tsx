'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { deleteSessionCookie, isSessionValid } from "../lib/session";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-btn";

export default function Header() {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const valid = await isSessionValid();
            setIsLogged(valid != false);
        };
        checkSession();
    }, []);

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
                <div style={{ position: "relative", width: "150px", height: "60px" }}>
                    {!isLogged && <Image id="imgLogo" src="/CopiaDeLogoLaranja.png" alt="Imagem da logo da Fundação Asimo" fill style={{ objectFit: "contain", cursor: "pointer" }} onClick={scrollToTop}/>}
                    {isLogged && <Image id="imgLogo" src="/CopiaDeLogoLaranja.png" alt="Imagem da logo da Fundação Asimo" fill style={{ objectFit: "contain", cursor: "pointer" }} onClick={() => redirect('/main')}/>}
                </div>
                <ul id="navUl">
                    {!isLogged && <li><a onClick={() => roll("sobre")}>Quem Somos?</a></li>}
                    {!isLogged && <li><a onClick={() => roll("comoparticipar")}>Como Participar</a></li>}
                    {!isLogged && <li><a onClick={() => roll("eventos")}>Eventos</a></li>}
                    {!isLogged && <li><a onClick={() => roll("escolas")}>Nossas Escolas</a></li>}
                    {!isLogged && <li><Link href="/login">Login</Link></li>}
                    {isLogged && <li><Link href="/main">Home</Link></li>}
                    {isLogged && <li><Link href="/main/dados-pessoais">Dados Pessoais</Link></li>}
                    {isLogged && <li><Link href="/main/horarios-pessoais">Horários Pessoais</Link></li>}
                    {isLogged && <li><Link href="/main/free-time">Free Time</Link></li>}
                    {isLogged && <li><Link href="https://drive.google.com/drive/folders/1wEhCZUAgwSYat5SqRdnrFv-2BcZXhgCB?usp=drive_link">Drive</Link></li>}
                    {isLogged && <li><Link href="/main/agenda">Agenda</Link></li>}
                    {isLogged && <li><Link href="/main/tools">Tools</Link></li>}
                    {isLogged && <li><LogoutButton/></li>}
                </ul>
            </nav>
        </header>
    );
}