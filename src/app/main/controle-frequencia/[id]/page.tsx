"use server";

import { query_evento_id } from "@/app/_actions/reunioes-eventos";
import { list_user } from "@/app/_actions/user";
import ConteudoControleFrequencia from "./conteudo";

export default async function ControleFrequenciaPage({params}: {params: Promise<{id: string}>})
{
    const {id} = await params;
    const dadosReuniao = await query_evento_id(Number(id));
    const listaMembrosTemp = await list_user();
    let listaMembros = listaMembrosTemp;

    if(dadosReuniao.area !== "Geral")
    {
        if(dadosReuniao.area === "Diretoria")
            listaMembros = listaMembrosTemp.filter(m => m.adm === true);
        else
            listaMembros = listaMembrosTemp.filter(m => m.area === dadosReuniao.area);
    }

    listaMembros = listaMembros.filter(m => m.id !== 1);

    return(
        <main>
            <ConteudoControleFrequencia dadosReuniao={dadosReuniao} listaMembros={listaMembros}/>
        </main>
    );
}