import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function HeaderLogin() {
    
    return(
        <header className={styles.header}>
            <nav className={styles.navegationBar}>
                <div style={{ position: "relative", width: "150px", height: "60px" }}>
                    <Link href="/"><Image id="imgLogo" src="/Robo.png" alt="Imagem da logo da Fundação Asimo" fill style={{ objectFit: "contain", cursor: "pointer" }}/></Link>
                </div>
                <ul id="navUl">
                    <li><Link href="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
}