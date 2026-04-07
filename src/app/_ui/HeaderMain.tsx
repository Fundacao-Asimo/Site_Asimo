'use client';

import Link from "next/link";
import styles from "../_styles/HeaderMain.module.css";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./logout-btn";
import { MembroProps } from "../_lib/DB_user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faCalendarAlt,
  faSchool,
  faClipboardCheck,
  faExchangeAlt,
  faAddressBook,
  faUserGear,
  faCalendarWeek,
  faWallet,
  faCalendarPlus,
  faUser,
  faCheckCircle,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function HeaderMain({isAdm, userObject}: {isAdm: boolean, userObject: MembroProps | null})
{
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    return(
        <header className={styles.header}>
            <nav className={styles.navegationBar}>
                {/* {userObject?.foto_url && <Image quality={100} width={140} height={140} className={styles.img} src={userObject?.foto_url || "/docencia.png"} alt="Foto do membro logado" onClick={() => redirect("/main/perfil")}/>} */}
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <img
                            src={userObject?.foto_url || "/docencia.png"}
                            onClick={() => router.push("/main/perfil")}
                            className={styles.profileImage}
                        />

                        <div className={styles.imageOverlay} onClick={() => router.push("/main/perfil")}>
                            ✏️
                        </div>
                    </div>
                </div>
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
                    {/* <li className={`${styles.item} ${pathname === "/main/minhas-presencas" ? styles.active : ""}`} ><Link href="/main/minhas-presencas"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClipboardCheck} />Minhas Presenças</Link></li> */}
                    <li className={`${styles.item} ${pathname === "/main/requisicoes" ? styles.active : ""}`} ><Link href="/main/requisicoes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faExchangeAlt} />Requisições</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/membros" ? styles.active : ""}`} ><Link href="/main/membros"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faAddressBook} />Membros</Link></li>
                    <li className={`${styles.item} ${pathname === "/main/perfil" ? styles.active : ""}`} ><Link href="/main/perfil"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faUser} />Perfil</Link></li>
                    {isAdm && <li className={styles.separacao}>DIRETORIA</li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/dashboard-principal") ? styles.active : ""}`} ><Link href="/main/dashboard-principal">Dashboard Principal</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/free-time-geral") ? styles.active : ""}`} ><Link href="/main/free-time-geral"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faCalendarWeek} />Free Time Geral</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/escolas-parceiras") ? styles.active : ""}`} ><Link href="/main/escolas-parceiras">Escolas Parceiras</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/agenda-reunioes") ? styles.active : ""}`} ><Link href="/main/agenda-reunioes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faCalendarPlus} />Agenda de Reuniões</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-frequencia") ? styles.active : ""}`} ><Link href="/main/controle-frequencia"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClipboardList} />Controle de Frequência</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/eventos") ? styles.active : ""}`} ><Link href="/main/eventos">Eventos & Workshops</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/relatorios-horas") ? styles.active : ""}`} ><Link href="/main/relatorios-horas">Relatórios de Horas</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-membros") ? styles.active : ""}`} ><Link href="/main/controle-membros"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faUserGear} />Gestão de Membros</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-requisicoes") ? styles.active : ""}`} ><Link href="/main/controle-requisicoes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faExchangeAlt} />Requisições</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-atividades") ? styles.active : ""}`} ><Link href="/main/controle-atividades">Atribuir Atividades</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/caixa") ? styles.active : ""}`} ><Link href="/main/caixa"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faWallet} />Caixa</Link></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/advertencias") ? styles.active : ""}`} ><Link href="/main/advertencias">Advertências</Link></li>}
                    <LogoutButton bool={false}/>
                </ul>
                <LogoutButton bool={true}/>
            </nav>
        </header>
    );
}