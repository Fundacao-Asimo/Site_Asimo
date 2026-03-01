'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "../styles/HeaderMain.module.css";
import { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import LogoutButton from "./logout-btn";
import { MembroProps } from "../lib/DB_user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faCalendarAlt,
  faSchool,
  faClipboardCheck,
  faExchangeAlt,
  faAddressBook,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function HeaderMain({isAdm, userObject}: {isAdm: boolean, userObject: MembroProps | null})
{
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    return(
        <header className={styles.header}>
            <nav className={styles.navegationBar}>
                <Image quality={100} width={200} height={200} className={styles.img} src={userObject?.foto_url} alt="Foto do membro logado" style={{ objectFit: "cover", cursor: "pointer", borderRadius: "50%", width: "8rem", aspectRatio: "1/1" }} onClick={() => redirect("/main/perfil")}/>
                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>
                <ul id="navUl" className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`} onClick={() => setMenuOpen(false)}>
                    <li className={`${styles.item} ${pathname === "/main" ? styles.active : ""}`} ><Link href="/main"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faHome} />Início</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/banco-de-horas" ? styles.active : ""}`} ><Link href="/main/banco-de-horas"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClock} />Banco de Horas</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/meu-free-time" ? styles.active : ""}`} ><Link href="/main/meu-free-time"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faCalendarAlt} />Meu Free Time</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/minha-escola" ? styles.active : ""}`} ><Link href="/main/minha-escola"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faSchool} />Minha Escola</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/minhas-presencas" ? styles.active : ""}`} ><Link href="/main/minhas-presencas"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClipboardCheck} />Minhas Presenças</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/requisicoes" ? styles.active : ""}`} ><Link href="/main/requisicoes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faExchangeAlt} />Requisições</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/membros" ? styles.active : ""}`} ><Link href="/main/membros"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faAddressBook} />Membros</Link></li>
                    {isAdm && <li className={styles.separacao}>DIRETORIA</li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/dashboard-principal" ? styles.active : ""}`} ><Link href="/main/dashboard-principal">Dashboard Principal</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/free-time-geral" ? styles.active : ""}`} ><Link href="/main/free-time-geral">Free Time Geral</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/escolas-parceiras" ? styles.active : ""}`} ><Link href="/main/escolas-parceiras">Escolas Parceiras</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/agenda-reunioes" ? styles.active : ""}`} ><Link href="/main/agenda-reunioes">Agenda de Reuniões</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/controle-frequência" ? styles.active : ""}`} ><Link href="/main/controle-frequência">Controle de Frequência</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/eventos" ? styles.active : ""}`} ><Link href="/main/eventos">Eventos & Workshops</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/relatorios-horas" ? styles.active : ""}`} ><Link href="/main/relatorios-horas">Relatórios de Horas</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/controle-membros" ? styles.active : ""}`} ><Link href="/main/controle-membros">Gestão de Membros</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/controle-atividades" ? styles.active : ""}`} ><Link href="/main/controle-atividades">Atribuir Atividades</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/caixa" ? styles.active : ""}`} ><Link href="/main/caixa">Caixa & Requisições</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname === "/main/advertencias" ? styles.active : ""}`} ><Link href="/main/advertencias">Advertências</Link></li>}
                </ul>
                <LogoutButton/> 
            </nav>
        </header>
    );
}