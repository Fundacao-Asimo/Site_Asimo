"use server";

import { list_eventos } from "@/app/_actions/reunioes-eventos";
import ConteudoAgendaReuniao from "./conteudo";

export default async function ReunioesPage()
{
    const listReunioes = await list_eventos(null, "Reunião");

    return(
        <main>
            <ConteudoAgendaReuniao listReunioes={listReunioes}/>
        </main>
    );
}