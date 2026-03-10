'use server';

import { list_user } from "@/app/_actions/user";
import MembroCard from "@/app/_ui/membro-card";
import Link from "next/link";

export default async function ListMembrosPage()
{
    const membros = await list_user();

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