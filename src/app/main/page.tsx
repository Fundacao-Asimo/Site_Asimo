import Link from "next/link";
import { isSessionValid } from "../_lib/session";
import styles from "../_styles/padrao.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClipboardCheck, faClock, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { query_user_id } from "../_actions/user";

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
    const usuarioLogado = await query_user_id(usuarioId.userId);

    return (
        <main>
            <h1 className={styles.h1}>
                Bem Vindo {usuarioLogado?.apelido ?? "usuário"}!
            </h1>
            <div className={styles.div_horizontal}>
                <div className={styles.quadro}>
                    <h3>Minha Presença</h3>
                    <p>"numero"</p>
                    <p>Últimos 30 dias</p>
                    <p>11 de 12 presenças</p>
                    <Link href="/main/minhas-presencas">Ver Detalhes</Link>
                </div>
                <div className={styles.quadro}>
                    <h3>Advertências</h3>
                    <p>"quadro"</p>
                    <p>Sem advertências ativas</p>
                    <Link href="/main/regimento">Ver Regras</Link>
                </div>
                <div className={styles.quadro}>
                    <h3>Agenda do Mês</h3>
                    <p>"item"</p>
                    <p>"item"</p>
                </div>
            </div>
            <h2 className={styles.h2}>Acesso Rápido</h2>
            <div className={styles.div_horizontal}>
                <Link href="/main/banco-de-horas" className={styles.quadro}>
                    <FontAwesomeIcon icon={faClock} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#2563EB", backgroundColor: "#DCEAFE", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Registrar Horas</h3>
                    <p style={{fontSize: "0.8rem"}}>Banco de horas</p>
                </Link>
                <Link href="/main/meu-free-time" className={styles.quadro}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#16A34A", backgroundColor: "#DCFCE7", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Free Time</h3>
                    <p style={{fontSize: "0.8rem"}}>Minha agenda</p>
                </Link>
                <Link href="/main/minhas-presencas" className={styles.quadro}>
                    <FontAwesomeIcon icon={faClipboardCheck} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#FF7A00", backgroundColor: "#FFE8D6", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Minha Frequência</h3>
                    <p style={{fontSize: "0.8rem"}}>Presenças</p>
                </Link>
                <Link href="/main/requisicoes" className={styles.quadro}>
                    <FontAwesomeIcon icon={faExchangeAlt} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#9333EA", backgroundColor: "#E9D5FF", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Solicitações</h3>
                    <p style={{fontSize: "0.8rem"}}>Requisições</p>
                </Link>
            </div>
            <div className={styles.div_horizontal}>
                <div className={styles.quadro_titulo} style={{flex: "2"}}>
                    <h3>Minha Escola - E.E. Major João Pereira</h3>
                </div>
                <div className={styles.quadro}>
                    <h3>Tarefas Atribuídas</h3>
                    <p>"item"</p>
                    <p>"item"</p>
                </div>
            </div>
        </main>
    );
}
