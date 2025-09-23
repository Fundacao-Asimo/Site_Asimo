// components/EventosRotativos.tsx
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

const conteudos = [
  {
    img: "/fundacao-membros.png",
    alt: "Imagem dos membros da segurando a bandeira da Fundação Asimo",
    titulo: "Nossa Missão",
    texto: `Reduzir desigualdades por meio da educação tecnológica.
Aplicamos metodologias ativas para estimular lógica, resolução de problemas e interesse por ciência e engenharia, aproximando universidade e comunidade e inspirando jovens a transformar sua realidade.`
  },
  {
    img: "/fundacao-membros-3.png",
    alt: "Outro evento",
    titulo: "Outro Evento",
    texto: "Descrição do segundo evento..."
  }
];

export default function EventosRotativos() {
  const [indice, setIndice] = useState(0);

  // Troca de conteúdo a cada 5 segundos
  useEffect(() => {
    const id = setInterval(() => {
      setIndice((prev) => (prev + 1) % conteudos.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const atual = conteudos[indice];

  return (
    <div className={styles.conteudoEventos}>
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
  );
}