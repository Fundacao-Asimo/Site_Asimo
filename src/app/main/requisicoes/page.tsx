"use server";

import { list_req } from "@/app/_actions/requisicoes";
import ConteudoRequisicoes from "./conteudo";
import { isSessionValid } from "@/app/_lib/session";

export default async function RequisicoesPage()
{
    const session = await isSessionValid();
    const {userId} = session as {userId: number}
    const listRequisicoes = await list_req(userId);

    return(
        <main>
            <ConteudoRequisicoes listReq={listRequisicoes}/>
        </main>
    );
}