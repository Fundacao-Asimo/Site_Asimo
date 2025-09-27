import ConexaoBD from "../lib/ConexaoBD";
import { isSessionValid } from "../lib/session";
import AniversarianteCard from "../ui/aniversariante-card";
import { MembroProps } from "../ui/membro-card";
import styles from "../styles/MainPage.module.css";

const arquivo = "usuarios-db.json";

export interface AniversarianteProps {
  id: number;
  nick: string;
  foto: string;
  dia: number;
}

export default async function MainPage() {
  const session = await isSessionValid();
  const usuarioId = session as { userId: number };
  const mesAtual = new Date().getMonth() + 1;
  const membros = await ConexaoBD.retornaBD(arquivo);

  const usuarioLogado = membros.find((d) => d.id === usuarioId.userId);

  const aniversariantes: AniversarianteProps[] = membros
    .filter((m: MembroProps) => {
      if (m.nasc === null) return false;
      const data = new Date(m.nasc);
      return data.getMonth() + 1 === mesAtual;
    })
    .map((m: MembroProps) => {
      const data = new Date(m.nasc);
      return {
        id: m.id,
        nick: m.nick,
        foto: m.foto,
        dia: data.getDate(),
      };
    });

  return (
    <main>
      <h1 className={styles.titulo}>
        Bem Vindo {usuarioLogado?.nick ?? "usuário"}!
      </h1>
      <section className={styles.quadro}>
        <h2>Aniversariantes do Mês</h2>
        <div className={styles.aniversariantesConteiner}>
          {aniversariantes.map((props) => (
            <AniversarianteCard key={props.id} {...props} />
          ))}
        </div>
      </section>
    </main>
  );
}
