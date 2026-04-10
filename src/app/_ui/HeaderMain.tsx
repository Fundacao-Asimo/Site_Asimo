'use client';

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
    faHandshake,
    faAlarmClock,
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
                    <li className={`${styles.item} ${pathname === "/main" ? styles.active : ""}`} ><a href="/main"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faHome} />Início</a></li>
                    <li className={`${styles.item} ${pathname === "/main/banco-de-horas" ? styles.active : ""}`} ><a href="/main/banco-de-horas"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClock} />Banco de Horas</a></li>
                    <li className={`${styles.item} ${pathname === "/main/meu-free-time" ? styles.active : ""}`} ><a href="/main/meu-free-time"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faCalendarAlt} />Meu Free Time</a></li>
                    <li className={`${styles.item} ${pathname === "/main/minha-escola" ? styles.active : ""}`} ><a href="/main/minha-escola"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faSchool} />Minha Escola</a></li>
                    {/* <li className={`${styles.item} ${pathname === "/main/minhas-presencas" ? styles.active : ""}`} ><a href="/main/minhas-presencas"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClipboardCheck} />Minhas Presenças</a></li> */}
                    <li className={`${styles.item} ${pathname === "/main/requisicoes" ? styles.active : ""}`} ><a href="/main/requisicoes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faExchangeAlt} />Requisições</a></li>
                    <li className={`${styles.item} ${pathname === "/main/membros" ? styles.active : ""}`} ><a href="/main/membros"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faAddressBook} />Membros</a></li>
                    <li className={`${styles.item} ${pathname === "/main/perfil" ? styles.active : ""}`} ><a href="/main/perfil"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faUser} />Perfil</a></li>
                    {isAdm && <li className={styles.separacao}>DIRETORIA</li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/dashboard-principal") ? styles.active : ""}`} ><a href="/main/dashboard-principal">Dashboard Principal</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-horas") ? styles.active : ""}`} ><a href="/main/controle-horas"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faAlarmClock} />Horas Controle</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/free-time-geral") ? styles.active : ""}`} ><a href="/main/free-time-geral"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faCalendarWeek} />Free Time Geral</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/escolas-parceiras") ? styles.active : ""}`} ><a href="/main/escolas-parceiras"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faSchool} />Escolas Parceiras</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/agenda-reunioes") ? styles.active : ""}`} ><a href="/main/agenda-reunioes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faCalendarPlus} />Agenda de Reuniões</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-frequencia") ? styles.active : ""}`} ><a href="/main/controle-frequencia"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faClipboardList} />Controle de Frequência</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/eventos") ? styles.active : ""}`} ><a href="/main/eventos">Eventos & Workshops</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/relatorios-horas") ? styles.active : ""}`} ><a href="/main/relatorios-horas">Relatórios de Horas</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-membros") ? styles.active : ""}`} ><a href="/main/controle-membros"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faUserGear} />Gestão de Membros</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-requisicoes") ? styles.active : ""}`} ><a href="/main/controle-requisicoes"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faExchangeAlt} />Requisições</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/controle-atividades") ? styles.active : ""}`} ><a href="/main/controle-atividades">Atribuir Atividades</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/caixa") ? styles.active : ""}`} ><a href="/main/caixa"><FontAwesomeIcon style={{marginRight: "0.5rem"}} icon={faWallet} />Caixa</a></li>}
                    {isAdm && <li className={`${styles.item} ${pathname.includes("/main/advertencias") ? styles.active : ""}`} ><a href="/main/advertencias">Advertências</a></li>}
                    <LogoutButton bool={false}/>
                </ul>
                <LogoutButton bool={true}/>
            </nav>
        </header>
    );
}