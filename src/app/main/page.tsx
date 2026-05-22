import Link from "next/link";
import { isSessionValid } from "../_lib/session";
import styles from "../_styles/padrao.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faExchangeAlt, faSchool } from "@fortawesome/free-solid-svg-icons";
import { query_user_id } from "../_actions/user";
import { list_escolas_membro } from "../_actions/escola";
import { list_presencas } from "../_actions/presencas";
import { PresencaProps } from "../_lib/DB_presencas";

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
    const presencas = await list_presencas(usuarioId.userId);

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 60);
    const dataLimiteString = dataLimite.toISOString().split("T")[0];

    const presencasUltimos60Dias = presencas.filter(
        (presenca) => presenca.data >= dataLimiteString
    );

    const presente = presencasUltimos60Dias.filter((p: PresencaProps) => p.presente === true);
    const porcentagem = Math.round(presente.length / presencasUltimos60Dias.length * 100) || 0;

    function getProgressColor(value: number)
    {
        if (value >= 75) return styles.progressGreen;

        if (value >= 50) return styles.progressYellow;

        return styles.progressRed;
    }

    return (
        <main>
            <h1 className={styles.h1}>
                Bem Vindo {usuarioLogado?.apelido ?? "usuário"}!
            </h1>
            <div className={styles.div_horizontal}>
                <div className={styles.quadro}>
                    <h3>Minha Presença</h3>
                    <svg viewBox="0 0 36 36" className={styles.circularChart}>
                        <path
                            className={styles.circleBg}
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />

                        <path
                            className={`${styles.circle} ${getProgressColor(porcentagem)}`}
                            strokeDasharray={`${porcentagem}, 100`}
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />

                        <text
                            x="18"
                            y="20.35"
                            className={styles.percentage}
                        >
                            {porcentagem}%
                        </text>
                    </svg>
                    <h4 className={getProgressColor(porcentagem)}>{presente.length} de {presencasUltimos60Dias.length} presenças</h4>
                    <p className={styles.legenda}>Últimos 60 dias</p>
                </div>
                <div className={styles.quadro}>

                </div>
            </div>
            <h2 className={styles.h2}>Acesso Rápido</h2>
            <div className={styles.div_horizontal}>
                <Link href="/main/banco-de-horas" className={styles.quadro}>
                    <FontAwesomeIcon icon={faClock} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#2563EB", backgroundColor: "#DCEAFE", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Registrar Horas</h3>
                    <p className={styles.legenda}>Banco de horas</p>
                </Link>
                <Link href="/main/meu-free-time" className={styles.quadro}>
                    <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#16A34A", backgroundColor: "#DCFCE7", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Free Time</h3>
                    <p className={styles.legenda}>Minha agenda</p>
                </Link>
                <Link href="/main/minha-escola" className={styles.quadro}>
                    <FontAwesomeIcon icon={faSchool} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#FF7A00", backgroundColor: "#FFE8D6", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Minha Escola</h3>
                    <p className={styles.legenda}>Escola</p>
                </Link>
                <Link href="/main/requisicoes" className={styles.quadro}>
                    <FontAwesomeIcon icon={faExchangeAlt} style={{fontSize:"1.4rem", padding: "0.9rem", color: "#9333EA", backgroundColor: "#E9D5FF", borderRadius: "0.5rem", marginBottom: "0.5rem"}}/>
                    <h3>Solicitações</h3>
                    <p className={styles.legenda}>Requisições</p>
                </Link>
            </div>
            {/* {escola.length > 0 && <div className={styles.div_horizontal}>
                <div className={styles.quadro_titulo} style={{ flex: "2" }}>
                    <h3>{escola[0].nome}</h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                        <FontAwesomeIcon icon={faMapLocationDot} />
                        <span style={{ fontSize: "0.85rem" }}>Itajubá - MG</span>
                    </div>

                    <p style={{ fontSize: "0.85rem" }}>
                        <strong>Turma:</strong> {escola[0].turma}
                    </p>

                    <Link
                        href={`/main/minha-escola`}
                        style={{
                            marginTop: "0.7rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            fontSize: "0.85rem",
                            color: "#2563EB",
                            fontWeight: 500
                        }}
                    >
                        Ver detalhes <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>} */}
        </main>
    );
}
