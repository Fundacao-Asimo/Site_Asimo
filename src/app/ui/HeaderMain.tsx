'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/HeaderMain.module.css";
import { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import LogoutButton from "./logout-btn";

export default function HeaderMain({isAdm}: {isAdm: boolean})
{
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return(
        <header className={styles.header}>
            <nav className={styles.navegationBar}>
                <Image id="imgLogo" className={styles.img} src="/Robo.png" alt="Imagem da logo da Fundação Asimo" width={50} height={70} style={{ objectFit: "contain", cursor: "pointer" }} onClick={() => redirect("/main")}/>
                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>
                <ul id="navUl" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} onClick={() => setMenuOpen(false)}>
                    <li className={`${styles.item} ${pathname === "/main" ? styles.active : ""}`} ><Link href="/main">Home</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/dados-pessoais" ? styles.active : ""}`} ><Link href="/main/dados-pessoais">Dados Pessoais</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/horarios-pessoais" ? styles.active : ""}`} ><Link href="/main/horarios-pessoais">Horários Pessoais</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/free-time" ? styles.active : ""}`} ><Link href="/main/free-time">Free Time</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/agenda" ? styles.active : ""}`} ><Link href="/main/agenda">Agenda</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/tools" ? styles.active : ""}`} ><Link href="/main/tools">Tools</Link></li>
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/membros" ? styles.active : ""}`} ><Link href="/main/membros">Membros</Link></li>}
                </ul>
                <LogoutButton/> 
            </nav>
        </header>
    );
}