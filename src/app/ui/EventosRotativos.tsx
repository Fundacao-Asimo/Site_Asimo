import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

const conteudos = [
  {
    img: "/paraiso.png",
    alt: "Imagem dos membros da segurando a bandeira da Fundação Asimo",
    titulo: "Circuito Asimo - Paraisópolis MG",
    texto: "Em 2024, realizamos o Evento Circuito Asimo em Paraisópolis – MG, uma ação expositiva que levou demonstrações de robótica e atividades interativas para a comunidade. A iniciativa alcançou cerca de 800 alunos do projeto, aproximando ainda mais os estudantes da tecnologia e despertando o interesse pela ciência e pela inovação."
  },
  {
    img: "/obr.png",
    alt: "Foto da premiação da nossa equipe de alunos na OBR (Olimpiada Brasileira de Robôtica)",
    titulo: "OBR",
    texto: "Formamos e orientamos um grupo de alunos do esino médio da Escola Estadual Barão do Rio Branco para competir na Olimpíada Brasileira de Robótica (OBR). Em 2025, esse time conquistou 3º lugar na fase estadual, resultado que celebra o talento dos estudantes e o trabalho conjunto entre eles e nossa equipe de apoio."
  }
];

export default function EventosRotativos() {
  const [indice, setIndice] = useState(0);
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimando(true); // inicia animação de saída
      setTimeout(() => {
        setIndice((prev) => (prev + 1) % conteudos.length);
        setAnimando(false); // volta para estado normal
      }, 500); // tempo da animação
    }, 15000);
    return () => clearInterval(id);
  }, []);

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
      </div>
    </div>
  );
}