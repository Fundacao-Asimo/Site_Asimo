'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./ui/Header";
import FlipCard from "./ui/FlipCard";
import EventosRotativos from "./ui/EventosRotativos";
import CardEscolas from "./ui/CardEscolas";

export default function Home() {

    return (
        <>
            <Header isLogged={false} isAdm={false} />
            <main className={styles.main}>
                <div className={styles.viewPrincipal}></div>
                    
                <div className={styles.topicos} id="sobre">
                    <div className={styles.imagemPtext}>
                        <Image
                            className={styles.imagemTopico}
                            src="/fundacao-membros-3.png"
                            alt="Imagem dos membros da segurando a bandeira da Fundação Asimo"
                            width={500}
                            height={281}
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
                                Nossa missão é transformar a educação por meio da tecnologia, levando oportunidades de aprendizado criativo e acessível às escolas públicas. Buscamos reduzir desigualdades educacionais, despertando nos estudantes o interesse por ciência, engenharia e inovação.
Acreditamos que, ao unir conhecimento e empatia, podemos formar jovens protagonistas capazes de construir um futuro mais justo e tecnológico.
                            </p>
                        </div>
                        <Image
                            className={styles.imagemTopico}
                            src="/missao.png"
                            alt="Imagem dos membros da segurando a bandeira da Fundação Asimo"
                            width={500}
                            height={281}
                        />
                    </div>
                </div>

                <div className={styles.topicoEventos} id="eventos">
                    <h2>Eventos</h2>
                    <EventosRotativos/>
                </div>

                <div className={styles.topicos} id="escolas">
                    <div className={styles.conteudo}>
                        <h2 className={styles.h2}>Nossas Escolas</h2>
                        <ul>
                            <li><CardEscolas imageSrc="/granja.png" title="Centro de Apoio Nossa Senhora do Sagrado Coração"/></li>
                            <li><CardEscolas imageSrc="/WNeto.png" title="Escola Wenceslau Neto"/></li>
                            <li><CardEscolas imageSrc="/barao.png" title="Escola Estadual Barão do Rio Branco"/></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.topicos} id="areas">
                    <div className={styles.conteudo}>
                        <h2 className={styles.h2}>Conheça nossas áreas</h2>
                        <ul>
                            <li><FlipCard txtFrente="Docência" txtAtras="Ministra aulas de robótica e programação em escolas parceiras" txtImg="/docencia.png"/></li>
                            <li><FlipCard txtFrente="Projetos" txtAtras="Desenvolve protótipos e soluções eletrônicas para as aulas e eventos" txtImg="/projetos.png"/></li>
                            <li><FlipCard txtFrente="Marketing" txtAtras="Divulga o projeto e fortalece sua imagem em redes e eventos" txtImg="/marketing.png"/></li>
                            <li><FlipCard txtFrente="Gestão" txtAtras="Cuida do bem-estar dos membros e dos processos internos" txtImg="/gestao.png"/></li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
