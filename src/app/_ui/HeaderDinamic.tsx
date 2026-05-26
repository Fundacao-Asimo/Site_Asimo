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
        "/main/admin/dashboard-principal": "Dashboard Principal",
        "/main/admin/controle-horas": "Horas Controle",
        "/main/admin/free-time-geral": "Free-Time-Geral",
        "/main/admin/escolas-parceiras": "Escolas Parceiras",
        "/main/admin/agenda-reunioes": "Agenda de Reuniões",
        "/main/admin/eventos": "Eventos & Workshops",
        "/main/admin/relatorios-horas": "Relatórios de Horas",
        "/main/admin/controle-frequencia": "Controle de Frequência",
        "/main/admin/controle-membros": "Gestão de Membros",
        "/main/admin/controle-membros/create": "Adicionar Membros",
        "/main/admin/controle-membros/edit": "Editar Dados do Membro",
        "/main/admin/controle-membros/inativo": "Membros Inativos",
        "/main/admin/controle-requisicoes": "Requisições",
        "/main/admin/controle-atividades": "Atribuir Atividades",
        "/main/admin/caixa": "Caixa & Requisições",
        "/main/admin/advertencias": "Advertências",
    };

    let title = "Dashboard";

    if(pathname.startsWith("/main/admin/controle-membros/edit")) {
        title = "Editar Dados do Membro";
    }
    else if(pathname.startsWith("/main/admin/controle-membros/inativo/")) {
        title = "Desativar Membro";
    }
    else if(pathname.startsWith("/main/admin/escolas-parceiras/edit")) {
        title = "Editar Dados da Escola";
    }
    else if(pathname.startsWith("/main/admin/escolas-parceiras/membros")) {
        title = "Gerenciar Equipe da Escola";
    }
    else if(pathname.startsWith("/main/admin/controle-frequencia")) {
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
