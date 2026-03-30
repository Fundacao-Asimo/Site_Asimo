"use server";

import { isSessionValid } from "@/app/_lib/session";
import { query_free_membro } from "@/app/_actions/free";
import ConteudoMeuFreeTime from "./conteudo";

export default async function MeuFreeTimePage()
{
    const isLogged = await isSessionValid();
    const userId = isLogged as { userId: number };
    const res = await query_free_membro(userId.userId);

    return (
        <main style={{ userSelect: 'none' }}> {/* Evita seleção de texto ao arrastar */}
            <ConteudoMeuFreeTime freetime={res}/>
        </main>
    );
}