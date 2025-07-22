import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.contatos}>
                <p>Contatos</p>
                <ul>
                    <li><Image className={styles.contatoImg} src="/icon-telefone.png" alt="Icone de telefone" width={24} height={24} /> (35) 99800-0000</li>
                    <li><Link href="https://www.instagram.com/fundacaoasimo/" target="_blank"><Image className={styles.contatoImg} src="/icon-instagram.png" alt="Instagram" width={24} height={24} />@fundacaoasimo</Link></li>
                    <li><Link href="mailto:fundacaoasimo@unifei.edu.br" target="_blank"><Image className={styles.contatoImg} src="/icon-email.png" alt="Email" width={24} height={24} />fundacaoasimo@unifei.edu.br</Link></li>
                    <li><Link href="https://br.linkedin.com/company/fundacao-asimo" target="_blank"><Image className={styles.contatoImg} src="/icon-linkedin.png" alt="LinkedIn" width={24} height={24} />linkedin</Link></li>
                </ul>
            </div>
            <section className={styles.parceiros}>
                <p>Parceiros</p>
                <ul>
                    <li><Link href="https://unifei.edu.br/" target="_blank"><Image id="imgunifei" src="/icon-unifei.png" alt="Logo da UNIFEI" width={24} height={24} />UNIFEI</Link></li>
                </ul>
            </section>
        </footer>
    );
}