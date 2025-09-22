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
                    <li><Link href="https://www.youtube.com/@Funda%C3%A7%C3%A3oAsimo" target="_blank"><Image className={styles.contatoImg} src="/icon-youtube.png" alt="Youtube" width={30} height={30} />Youtube</Link></li>
                    <li><Link href="https://www.instagram.com/fundacaoasimo/" target="_blank"><Image className={styles.contatoImg} src="/icon-instagram.png" alt="Instagram" width={30} height={30} />@fundacaoasimo</Link></li>
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
        </footer>
    );
}