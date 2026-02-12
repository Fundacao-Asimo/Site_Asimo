import ConexaoBD, { MembroProps } from "../lib/ConexaoBD";
import { isSessionValid } from "../lib/session";
import AniversarianteCard from "../ui/aniversariante-card";
import styles from "../styles/MainPage.module.css";
import DB from "../lib/ConexaoBD";

const arquivo = "usuarios-db.json";

export interface AniversarianteProps {
  id: number;
  nick: string;
  foto: string;
  dia: number;
}

export default async function MainPage()
{
  const session = await isSessionValid();
  const usuarioId = session as { userId: number };
  const usuarioLogado = await DB.query_user_id(usuarioId.userId);

  // const mesAtual = new Date().getMonth() + 1;
  // const membros = await ConexaoBD.retornaBD(arquivo);

  // const aniversariantes: AniversarianteProps[] = membros
  //   .filter((m: MembroProps) => {
  //     if (m.nasc_date === null) return false;
  //     const data = new Date(m.nasc_date);
  //     return data.getMonth() + 1 === mesAtual;
  //   })
  //   .map((m: MembroProps) => {
  //     const data = new Date(m.nasc_date);
  //     return {
  //       id: m.id,
  //       nick: m.nick,
  //       foto: m.foto,
  //       dia: data.getDate(),
  //     };
  //   });

  return (
    <main>
      <h1 className={styles.titulo}>
        Bem Vindo {usuarioLogado?.apelido ?? "usuário"}!
      </h1>
      <section className={styles.quadro}>
        <h2>Aniversariantes do Mês</h2>
        {/* <div className={styles.aniversariantesConteiner}>
          {aniversariantes.map((props) => (
            <AniversarianteCard key={props.id} {...props} />
          ))}
        </div> */}
      </section>
    </main>
  );
}
