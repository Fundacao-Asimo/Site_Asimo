"use server";

import { list_req } from "@/app/_actions/requisicoes";
import ConteudoControleRequisicoes from "./conteudo";
import { list_user } from "@/app/_actions/user";

export default async function RequisicoesPage()
{
    const listRequisicoes = await list_req();
    const listMembros = await list_user();

    return(
        <main>
            <ConteudoControleRequisicoes listReq={listRequisicoes} listMembros={listMembros}/>
        </main>
    );
}