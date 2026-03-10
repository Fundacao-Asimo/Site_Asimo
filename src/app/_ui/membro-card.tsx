import Image from "next/image";
import Link from "next/link";
import { MembroProps } from "../_lib/DB_user";
import { delete_user } from "../_actions/user";
import styles from "../_styles/MembroCard.module.css"

export default function MembroCard(props: MembroProps)
{
    async function deleteMembro(form: FormData) {
        'use server';
        await delete_user(form.get('membro-id'));
    }

    return(
        <div className={styles.card}>
            <h2 className={styles.name}>{props.nome_completo}</h2>

            {props.foto_url && <Image
                src={props.foto_url || "/docencia.png"}
                alt="Foto do membro"
                width={140}
                height={140}
                className={styles.image}
            />}
            {!props.foto_url && <Image
                src={"/docencia.png"}
                alt="Foto do membro"
                width={140}
                height={140}
                className={styles.image}
            />}

            <section className={styles.actions}>
                <Link
                    href={`/main/membros/edit/${props.id}`}
                    className={styles.link}
                >
                    Editar
                </Link>

                <Link
                    href={`/main/membros/advertencia/${props.id}`}
                    className={styles.link}
                >
                    Advertência
                </Link>

                <form action={deleteMembro}>
                    <button className={styles.deleteButton}>
                        Remover
                    </button>

                    <input
                        defaultValue={props.id}
                        name="membro-id"
                        hidden
                    />
                </form>
            </section>
        </div>
    );
}