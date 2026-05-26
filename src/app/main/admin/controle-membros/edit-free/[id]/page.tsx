"use server";

import { query_free_membro } from "@/app/_actions/free";
import ConteudoMeuFreeTime from "@/app/main/meu-free-time/conteudo";

export default async function EditFreeTimePage({params}: {params: Promise<{id: string}>})
{
    const {id} = await params;
    const res = await query_free_membro(Number(id));

    return (
        <main style={{ userSelect: 'none' }}> {/* Evita seleção de texto ao arrastar */}
            <ConteudoMeuFreeTime freetime={res}/>
        </main>
    );
}