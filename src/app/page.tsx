'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./ui/Header";
import FlipCard from "./ui/FlipCard";
import CardEventos from "./ui/CardEventos";

export default function Home() {

    return (
        <>
            <Header isLogged={false} isAdm={false} />
            <main className={styles.main}>
                <div className={styles.viewPrincipal}>
                    
                </div>

                <div className={styles.topicos} id="sobre">
                    <div className={styles.imagemPtext}>
                        <Image
                            src="/fundacao-membros.png"
                            alt="Imagem dos membros da segurando a bandeira da Fundação Asimo"
                            width={500}
                            height={350}
                        />
                        <div className={styles.textosTopicos}>
                            <h2 className={styles.h2}>Quem Somos?</h2>
                            <p>
                                A Fundação Asimo é um projeto de extensão da UNIFEI que leva educação em STEAM — Ciência, Tecnologia, Engenharia, Artes e Matemática — a escolas públicas de Itajubá.
    Nossa equipe de estudantes e professores promove oficinas de robótica, programação e eletrônica, criando experiências que despertam curiosidade, criatividade e trabalho em equipe.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.topicos} id="missao">
                    <div className={styles.imagemPtext}>
                        <div className={styles.textosTopicos}>
                            <h2 className={styles.h2}>Nossa Missão</h2>
                            <p>
                                Reduzir desigualdades por meio da educação tecnológica.
    Aplicamos metodologias ativas para estimular lógica, resolução de problemas e interesse por ciência e engenharia, aproximando universidade e comunidade e inspirando jovens a transformar sua realidade.
                            </p>
                        </div>
                        <Image
                            src="/fundacao-membros.png"
                            alt="Imagem dos membros da segurando a bandeira da Fundação Asimo"
                            width={500}
                            height={350}
                        />
                    </div>
                </div>

                <div className={styles.topicos} id="eventos">
                    <div className={styles.conteudo}>
                        <h2 className={styles.h2}>Eventos</h2>
                        <ul>
                            <li><CardEventos imageSrc="/paraiso.png" title="Teste"/></li>
                            <li><CardEventos imageSrc="/paraiso.png" title="Teste"/></li>
                            <li><CardEventos imageSrc="/paraiso.png" title="Teste"/></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.topicos} id="areas">
                    <div className={styles.conteudo}>
                        <h2 className={styles.h2}>Conheça nossas áreas</h2>
                        <ul>
                            <li><FlipCard txtFrente="Docência" txtAtras="Ministra aulas de robótica e programação em escolas parceiras" txtImg="/docencia.png"/></li>
                            <li><FlipCard txtFrente="Projetos" txtAtras="Desenvolve protótipos e soluções eletrônicas para as aulas e eventos" txtImg="/docencia.png"/></li>
                            <li><FlipCard txtFrente="Marketing" txtAtras="Divulga o projeto e fortalece sua imagem em redes e eventos" txtImg="/docencia.png"/></li>
                            <li><FlipCard txtFrente="Gestão" txtAtras="Cuida do bem-estar dos membros e do processo seletivo" txtImg="/docencia.png"/></li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
