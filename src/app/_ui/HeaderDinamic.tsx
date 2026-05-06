"use client";

import { usePathname } from "next/navigation";
import styles from "../_styles/HeaderDinamic.module.css";

export default function HeaderDinamic({horas}: {horas: number})
{
    const pathname = usePathname();

    const titles: Record<string, string> = {
        "/main": "Visão Geral",
        "/main/banco-de-horas": "Banco de Horas",
        "/main/meu-free-time": "Meu Free Time",
        "/main/minha-escola": "Minha Escola",
        "/main/minhas-presencas": "Minhas Presenças",
        "/main/requisicoes": "Requisições",
        "/main/membros": "Diretório de Membros",
        "/main/perfil": "Meu Perfil",
        "/main/dashboard-principal": "Dashboard Principal",
        "/main/controle-horas": "Horas Controle",
        "/main/free-time-geral": "Free-Time-Geral",
        "/main/escolas-parceiras": "Escolas Parceiras",
        "/main/agenda-reunioes": "Agenda de Reuniões",
        "/main/controle-frequencia": "Controle de Frequência",
        "/main/eventos": "Eventos & Workshops",
        "/main/relatorios-horas": "Relatórios de Horas",
        "/main/controle-membros": "Gestão de Membros",
        "/main/controle-membros/create": "Adicionar Membros",
        "/main/controle-membros/edit": "Editar Dados do Membro",
        "/main/controle-membros/inativo": "Membros Inativos",
        "/main/controle-requisicoes": "Requisições",
        "/main/controle-atividades": "Atribuir Atividades",
        "/main/caixa": "Caixa & Requisições",
        "/main/advertencias": "Advertências",
    };

    let title = "Dashboard";

    if(pathname.startsWith("/main/controle-membros/edit")) {
        title = "Editar Dados do Membro";
    }
    else if(pathname.startsWith("/main/controle-membros/inativo/")) {
        title = "Desativar Membro";
    }
    else if(pathname.startsWith("/main/escolas-parceiras/edit")) {
        title = "Editar Dados da Escola";
    }
    else if(pathname.startsWith("/main/escolas-parceiras/membros")) {
        title = "Gerenciar Equipe da Escola";
    }
    else if(pathname.startsWith("/main/controle-frequencia")) {
        title = "Controle de Frequência";
    }
    else {
        title = titles[pathname] || "Dashboard";
    }

    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <div>
                <p className={styles.texto}>HORAS ACUMULADAS</p>
                <p className={styles.horas}>{horas}<span>h</span></p>
            </div>
        </header>
    );
}
