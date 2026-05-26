"use server";

import { list_free } from "@/app/_actions/free";
import { list_user } from "@/app/_actions/user";
import ConteudoFreeTimeGeral from "./conteudo";

export default async function MeuFreeTimePage()
{
    const resFree = await list_free();
    const resUser = await list_user();

    let listaReal = [];
    if(resUser.length > 0)
        listaReal = resUser.filter(m => m.id !== 1);

    return (
        <main style={{ userSelect: 'none' }}>
            <ConteudoFreeTimeGeral listFree={resFree} listMembros={listaReal}/>
        </main>
    );
}