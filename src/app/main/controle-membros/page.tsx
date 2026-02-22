'use server';

import DB_user from "@/app/lib/DB_user";
import MembroCard from "@/app/ui/membro-card";
import Link from "next/link";

export default async function ListMembrosPage()
{
    const membros = await DB_user.list_user();

    const membrosMap = membros.map((membro) => {
        return <MembroCard key={membro.id} {...membro}/>
    });

    return(
        <main className="list-container">
            <Link href={'/main/controle-membros/create'} className="link-add-membro">Adicionar</Link>
            <div className="list-membros-container">
                {membrosMap}
            </div>
        </main>
    );
}