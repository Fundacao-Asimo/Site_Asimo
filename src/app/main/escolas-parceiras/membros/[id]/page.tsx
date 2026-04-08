"use server";

import { query_escola_id } from "@/app/_actions/escola";
import { list_user } from "@/app/_actions/user";
import ConteudoDesignarMembrosEscola from "./conteudo";

export default async function DesignarMembrosEscolaPage({params}: {params: Promise<{id: string}>})
{
    const {id} = await params;
    const escolaTemp = await query_escola_id(Number(id));
    const membros = await list_user();

    return(
        <main>
            <ConteudoDesignarMembrosEscola escola={escolaTemp} membros={membros}/>
        </main>
    );
}