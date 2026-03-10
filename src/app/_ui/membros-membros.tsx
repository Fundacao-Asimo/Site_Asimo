import Image from "next/image";
import styles from "../_styles/padrao.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { MembroProps } from "../_lib/DB_user";
import Link from "next/link";

export default function MembrosMembros({dados}: {dados: MembroProps})
{
    dados.telefone = dados.telefone.replace(/\D/g, '');

    return(
        <div className={styles.memberCard}>
            {dados.foto_url && <Image
                quality={100}
                width={45}
                height={45}
                src={dados.foto_url}
                alt="Foto do membro"
                className={styles.avatar}
            />}
            {!dados.foto_url && <Image
                quality={100}
                width={45}
                height={45}
                src={"/docencia.png"}
                alt="Foto do membro"
                className={styles.avatar}
            />}
            <div className={styles.memberText}>
                <strong>{dados.apelido}</strong>
                <span>{dados.area}</span>
                <Link target="_blank" href={`https://wa.me/55${dados.telefone}`} className={styles.memberActions}>
                    <FontAwesomeIcon icon={faWhatsapp}/>
                </Link>
            </div>
        </div>
    );
}