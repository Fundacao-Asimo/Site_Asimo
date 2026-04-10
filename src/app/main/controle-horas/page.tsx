import { list_horas_geral } from "@/app/_actions/hora";
import ConteudoControleHoras from "./conteudo";
import { list_user } from "@/app/_actions/user";

export default async function ControleHorasPage()
{
    const horas = await list_horas_geral();
    const membros = await list_user();

    return(
        <main>
            <ConteudoControleHoras listHoras={horas} listMembros={membros}/>
        </main>
    );
}