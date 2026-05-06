'use server';

import { list_user } from "@/app/_actions/user";
import MembroCard from "@/app/_ui/membro-card";
import styles from "../page.module.css"

export default async function ListMembrosInativosPage()
{
    const membros = await list_user(false);

    if(membros.length === 0) return(<main><h1 style={{margin: "2rem"}}>Não há membros inativos!</h1></main>);

    const membrosMap = membros.map((membro) => {
        return <MembroCard key={membro.id} {...membro}/>
    });

    return(
        <main>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Membros</h1>
                </div>

                <div className={styles.grid}>
                    {membrosMap}
                </div>
            </div>
        </main>
    );
}