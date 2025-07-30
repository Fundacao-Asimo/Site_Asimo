import Image from "next/image";
import styles from "./page.module.css";
import Header from "./ui/Header";
import { isSessionValid } from "./lib/session";

export default async function Home() {
    const isLogged = await isSessionValid();

    return (
        <>
            <Header isLogged={isLogged != false} />
            <main className={styles.main}>
                <div className={styles.viewPrincipal}>
                    
                </div>

                <div className={styles.topicos} id="sobre">
                    <Image
                        src="/fundacao-membros.png"
                        alt="Imagem dos membros da segurando a bandeira da Fundação Asimo"
                        width={500}
                        height={350}
                    />
                    <div>
                        <h2 className={styles.h2}>Quem Somos?</h2>
                        <p>
                            A Fundação Asimo foi criada com o intuito de oferecer educação de qualidade a crianças e adolescentes em situação de vulnerabilidade. Com o apoio de voluntários e especialistas, promovemos oficinas, eventos e cursos nas áreas de ciência, tecnologia e cidadania.
                        </p>
                    </div>
                </div>

                <div className={styles.topicos} id="comoparticipar">
                    <div>
                        <h2 className={styles.h2}>Como Participar</h2>
                        <p>
                            Você pode participar como voluntário, doador ou parceiro. Estamos sempre abertos a novas ideias e colaborações para expandir nosso impacto e alcançar mais jovens.
                        </p>
                    </div>
                </div>

                <div className={styles.topicos} id="eventos">
                    <div>
                        <h2 className={styles.h2}>Eventos</h2>
                        <p>
                            Organizamos eventos mensais com atividades práticas, palestras e apresentações dos alunos. Fique atento à nossa agenda nas redes sociais!
                        </p>
                    </div>
                </div>

                <div className={styles.topicos} id="escolas">
                    <div>
                        <h2 className={styles.h2}>Nossas Escolas</h2>
                        <p>
                            Atualmente atuamos em mais de 10 escolas públicas, levando conhecimento e esperança para centenas de jovens em diversas regiões do país.
                        </p>
                    </div>
                    <Image
                        src="/IMG-20250415-WA0011.png"
                        alt="Imagem de sala de aula de uma das aulas ministradas pela Fundação Asimo"
                        width={500}
                        height={300}
                    />
                </div>
            </main>
        </>
    );
}
