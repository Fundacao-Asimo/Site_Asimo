'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "../page.module.css";
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400','700'],
});

const conteudos = [
  {
    img: "/paraiso.png",
    alt: "Imagem do circuito asimo realizado em Paraisópolis Mg",
    titulo: "Circuito Asimo - Paraisópolis MG",
    texto: "Em 2024, realizamos o Evento Circuito Asimo em Paraisópolis - MG, uma ação voltada para alunos do ensino fundamental, que trouxe demonstrações de robótica e atividades interativas para a comunidade. A iniciativa envolveu cerca de 800 estudantes, aproximando-os da tecnologia e despertando o interesse pela ciência e pela inovação."
  },
  {
    img: "/brazopi.png",
    alt: "Imagem do circuito asimo realizado em Brazópolis Mg",
    titulo: "Circuito Asimo - Brazópolis MG",
    texto: "Em 2024, levamos o Circuito Asimo a Brazópolis - MG, promovendo um evento para estudantes do ensino médio com demonstrações de robótica e atividades interativas. Cerca de 800 alunos participaram, explorando tecnologia e ciência de forma prática e inspiradora."
  },
  {
    img: "/mariadafe2.png",
    alt: "Imagem do circuito asimo realizado em Maria da Fé Mg",
    titulo: "Circuito Asimo - Maria da Fé MG",
    texto: "Em 2025, o Circuito Asimo chegou a Maria da Fé - MG, oferecendo aos estudantes do ensino fundamental uma imersão em ciência e tecnologia. Com oficinas práticas e demonstrações de robótica, cerca de 900 jovens tiveram a chance de interagir com a inovação de forma divertida e educativa."
  },
  {
    img: "/obr.png",
    alt: "Foto da premiação da nossa equipe de alunos na OBR (Olimpiada Brasileira de Robôtica)",
    titulo: "OBR",
    texto: "Formamos e orientamos um grupo de alunos do ensino médio da Escola Estadual Barão do Rio Branco para competir na Olimpíada Brasileira de Robótica (OBR). Em 2025, esse time conquistou 3º lugar na fase estadual, resultado que celebra o talento dos estudantes e o trabalho conjunto entre eles e nossa equipe de apoio."
  }
];

export default function EventosRotativos() {
  const [indice, setIndice] = useState(0);
  const [animando, setAnimando] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Função para iniciar/renovar o intervalo
  const iniciarIntervalo = () => {
    intervalRef.current = setInterval(() => {
      proximo();
    }, 15000);
  };

  // Funções de navegação
  const proximo = () => {
    setAnimando(true);
    setTimeout(() => {
      setIndice((prev) => (prev + 1) % conteudos.length);
      setAnimando(false);
    }, 500);
  };

  const anterior = () => {
    setAnimando(true);
    setTimeout(() => {
      setIndice((prev) => (prev - 1 + conteudos.length) % conteudos.length);
      setAnimando(false);
    }, 500);
  };

  // Monta intervalo inicial
  useEffect(() => {
    iniciarIntervalo();
    const handleKeyDown = (event:KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handleAnterior();
          break;
        case "ArrowRight":
          handleProximo();
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  // Clique que também reseta o tempo
  const handleProximo = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    proximo();
    iniciarIntervalo();
  };

  const handleAnterior = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    anterior();
    iniciarIntervalo();
  };

  const atual = conteudos[indice];

  return (
    <div className={styles.conteudoEventos}>
      <div className={`${styles.slideWrapper} ${animando ? styles.slideOut : ""}`}>
        <Image
          src={atual.img}
          alt={atual.alt}
          width={500}
          height={281}
          className={styles.imagensEventos}
        />
        <div className={styles.textosEventos}>
          <h3 className={styles.h2}>{atual.titulo}</h3>
          <p>{atual.texto}</p>
        </div>
        <div className={styles.setaTroca}>
          <span className={quicksand.className} onClick={handleAnterior}>&lt;</span>
          <span className={quicksand.className} onClick={handleProximo}>&gt;</span>
        </div>
      </div>
    </div>
  );
}