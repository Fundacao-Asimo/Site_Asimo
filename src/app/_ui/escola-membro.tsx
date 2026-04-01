import { EscolaProps } from "../_lib/DB_escolas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../main/minha-escola/page.module.css";
import { faBookOpen, faMapLocationDot, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import MembrosMembros from "./membros-membros";
import Link from "next/link";
import { query_user_id } from "../_actions/user";

export default async function EscolaMembro({dados}: {dados: EscolaProps})
{
    const lista = await Promise.all(
        dados.membros.map(async (id) => {
            let temp = await query_user_id(id);
            return temp;
        })
    );

    const listMembrosComponents = lista.map((m) => {
        if(m !== null) return <MembrosMembros key={m.id} dados={m}/>
    });

    dados.telefone_responsavel = dados.telefone_responsavel.replace(/\D/g, '');

    return(
        <div className={styles.grid}>
            {/* CARD PRINCIPAL */}
            <div className={styles.mainCard}>
                <div className={styles.banner}>
                    <div>
                        <h2>{dados.nome}</h2>
                        <div className={styles.location}>
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            <span>Itajubá - MG</span>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.infoRow}>
                        <div>
                            <span className={styles.label}>TURMA RESPONSÁVEL</span>
                            <h3>{dados.turma}</h3>
                        </div>

                        <div>
                            <span className={styles.label}>HORÁRIO</span>
                            <h3 style={{whiteSpace: "pre-line"}}>{dados.horario}</h3>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.primaryBtn}>
                            <FontAwesomeIcon icon={faBookOpen} />
                            Preencher Diário
                        </button>

                        <Link target="_blank" href={dados.endereco_url} className={styles.secondaryBtn}>
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            Ver Rota
                        </Link>
                    </div>

                    <div className={styles.divider} />

                    <div>
                        <h4 className={styles.sectionTitle}>EQUIPE DA ESCOLA</h4>
                        <p className={styles.sectionSubtitle}>
                            Membros que atuam nesta escola:
                        </p>

                        <div className={styles.teamGrid}>
                            {listMembrosComponents}
                        </div>
                    </div>
                </div>
            </div>

            {/* CARD LATERAL */}
            {/* <div className={styles.sideCard}>
                <h4 className={styles.sideTitle}>CONTATO ESCOLA</h4>

                <div className={styles.director}>
                    <div className={styles.avatarGray}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>

                    <div>
                        <strong>{dados.nome_responsavel}</strong>
                        <span>Responsável</span>
                    </div>
                </div>

                <Link target="_blank" href={`https://wa.me/55${dados.telefone_responsavel}`} className={styles.whatsappBtn}>
                    <FontAwesomeIcon icon={faWhatsapp} />
                    Whatsapp da Escola
                </Link>
            </div> */}
        </div>
    );
}