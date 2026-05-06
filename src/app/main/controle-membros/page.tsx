'use server';

import { list_user } from "@/app/_actions/user";
import MembroCard from "@/app/_ui/membro-card";
import Link from "next/link";
import styles from "./page.module.css"

export default async function ListMembrosPage()
{
    const membros = await list_user();

    const membrosMap = membros.map((membro) => {
        return <MembroCard key={membro.id} {...membro}/>
    });

    return(
        <main>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Membros</h1>

                    <div className={styles.buttons}>
                        <Link
                            href={'/main/controle-membros/create'}
                            className={styles.addButton}
                        >
                            + Adicionar
                        </Link>
                        <Link
                            href={'/main/controle-membros/inativo'}
                            className={styles.inativeButton}
                        >
                            Inativos
                        </Link>
                    </div>
                </div>

                <div className={styles.grid}>
                    {membrosMap}
                </div>
            </div>
        </main>
    );
}