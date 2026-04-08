"use server";

import { list_escolas } from "@/app/_actions/escola";
import { list_user } from "@/app/_actions/user";
import ConteudoControleEscolas from "./conteudo";

export default async function ControleEscolasPage()
{
    const listaEscolas = await list_escolas();
    const listaMembros = await list_user();

    return(
        <main>
            <ConteudoControleEscolas escolas={listaEscolas} listMembros={listaMembros}/>
        </main>
    );
}