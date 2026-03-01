import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faBookOpen, faMapLocationDot, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function MinhaEscola() {
  return (
    <main>
      <div className={styles.grid}>
        {/* CARD PRINCIPAL */}
        <div className={styles.mainCard}>
          <div className={styles.banner}>
            <div>
              <h2>E.E. Major João Pereira</h2>
              <div className={styles.location}>
                <FontAwesomeIcon icon={faMapLocationDot}/>
                <span>Itajubá - MG</span>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.infoRow}>
              <div>
                <span className={styles.label}>TURMA RESPONSÁVEL</span>
                <h3>9º Ano - Robótica I</h3>
              </div>

              <div>
                <span className={styles.label}>HORÁRIO</span>
                <h3>Terças, 14h - 16h</h3>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.primaryBtn}>
                <FontAwesomeIcon icon={faBookOpen}/>
                Preencher Diário
              </button>

              <button className={styles.secondaryBtn}>
                <FontAwesomeIcon icon={faMapLocationDot}/>
                Ver Rota
              </button>
            </div>

            <div className={styles.divider} />

            <div>
              <h4 className={styles.sectionTitle}>EQUIPE DA ESCOLA</h4>
              <p className={styles.sectionSubtitle}>
                Membros que atuam nesta escola:
              </p>

              <div className={styles.teamGrid}>
                <div className={styles.memberCard}>
                  <div className={styles.avatarGreen}>IF</div>
                  <div className={styles.memberText}>
                    <strong>Igor Fantucci</strong>
                    <span>Docência</span>
                    <FontAwesomeIcon className={styles.memberActions} icon={faWhatsapp}/>
                  </div>
                </div>

                <div className={styles.memberCard}>
                  <Image quality={100} width={45} height={45} src={"https://iajivazuvnrdlqlqazfc.supabase.co/storage/v1/object/public/Fotos_Membros/1770950152121-Captura%20de%20tela%202025-10-18%20195344.png"} alt="teste" className={styles.avatarGreen}/>
                  <div className={styles.memberText}>
                    <strong>Ana Clara</strong>
                    <span>Docência</span>
                    <FontAwesomeIcon className={styles.memberActions} icon={faWhatsapp}/>
                  </div>
                </div>

                <div className={styles.memberCard}>
                  <div className={styles.avatarBlue}>LM</div>
                  <div className={styles.memberText}>
                    <strong>Lucas Mendes</strong>
                    <span>Docência</span>
                    <FontAwesomeIcon className={styles.memberActions} icon={faWhatsapp}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD LATERAL */}
        <div className={styles.sideCard}>
          <h4 className={styles.sideTitle}>CONTATO ESCOLA</h4>

          <div className={styles.director}>
            <div className={styles.avatarGray}>
              <FontAwesomeIcon icon={faUser}/>
            </div>

            <div>
              <strong>Sr. Roberto</strong>
              <span>Diretor</span>
            </div>
          </div>

          <button className={styles.whatsappBtn}>
            <FontAwesomeIcon icon={faWhatsapp}/>
            Whatsapp da Escola
          </button>

          <button className={styles.routeBtn}>
            <FontAwesomeIcon icon={faMapLocationDot}/>
            Como Chegar
          </button>
        </div>
      </div>
    </main>
  );
}