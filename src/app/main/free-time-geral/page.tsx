"use server";

import { list_free } from "@/app/_actions/free";
import { list_user } from "@/app/_actions/user";
import ConteudoFreeTimeGeral from "./conteudo";

export default async function MeuFreeTimePage()
{
    const resFree = await list_free();
    const resUser = await list_user();

    return (
        <main style={{ userSelect: 'none' }}>
            <ConteudoFreeTimeGeral listFree={resFree} listMembros={resUser}/>
        </main>
    );
}