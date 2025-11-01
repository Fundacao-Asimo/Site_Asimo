import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <section className={styles.contatos}>
                <p>Contatos</p>
                <ul>
                    <li><Link href="mailto:fundacaoasimo@unifei.edu.br" target="_blank"><Image className={styles.contatoImg} src="/icon-email.png" alt="Email" width={30} height={30} />fundacaoasimo@unifei.edu.br</Link></li>
                    <li><Link href="https://www.instagram.com/fundacaoasimo/" target="_blank"><Image className={styles.contatoImg} src="/icon-instagram.png" alt="Instagram" width={30} height={30} />@fundacaoasimo</Link></li>
                    <li><Link href="https://www.youtube.com/@Funda%C3%A7%C3%A3oAsimo" target="_blank"><Image className={styles.contatoImg} src="/icon-youtube.png" alt="Youtube" width={30} height={30} />Youtube</Link></li>
                    <li><Link href="https://br.linkedin.com/company/fundacao-asimo" target="_blank"><Image className={styles.contatoImg} src="/icon-linkedin.png" alt="LinkedIn" width={30} height={30} />Linkedin</Link></li>
                </ul>
            </section>
            <section className={styles.parceiros}>
                <p>Parceiros</p>
                <ul>
                    <li><Link href="https://unifei.edu.br/" target="_blank"><Image className={styles.contatoImgParceiros} src="/icon-unifei.png" alt="Logo da UNIFEI" width={30} height={30} />UNIFEI</Link></li>
                    <li><Link href="https://tobeeidiomas.com/" target="_blank"><Image className={styles.contatoImgParceiros} src="/tobee-icon.png" alt="Logo da To Bee Idiomas" width={30} height={30} />To Bee Idiomas</Link></li>
                    <li><Link href="https://leoclube.ozv.com.br/" target="_blank"><Image className={styles.contatoImgParceiros} src="/leo-icon.png" alt="Logo do Leo Clube" width={30} height={30} />Leo Clube Serra Verde</Link></li>
                </ul>
            </section>
            <section className={styles.parceiros}>
                <p>Feito por</p>
                <ul>
                    <li><Link href="https://www.linkedin.com/in/luiz-augusto-silva-cco/" target="_blank"><Image className={styles.contatoImg} src="/icon-linkedin.png" alt="LinkedIn" width={30} height={30} />Luiz Augusto Silva</Link></li>
                    <li><Link href="https://www.linkedin.com/in/jo%C3%A3o-pedro-bas%C3%ADlio-dinareli-b010a2361/" target="_blank"><Image className={styles.contatoImg} src="/icon-linkedin.png" alt="LinkedIn" width={30} height={30} />João Pedro Basílio Dinareli</Link></li>
                    <li><Link href="https://www.linkedin.com/in/leonardo-jose-siqueira-marinho/" target="_blank"><Image className={styles.contatoImg} src="/icon-linkedin.png" alt="LinkedIn" width={30} height={30} />Lonardo José Siqueira Marinho</Link></li>
                </ul>
            </section>
        </footer>
    );
}