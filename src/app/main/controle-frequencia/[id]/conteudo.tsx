import { EventoProps } from "@/app/_lib/DB_reunioes-eventos";
import { MembroProps } from "@/app/_lib/DB_user";
import { redirect } from "next/navigation";

export default function ConteudoControleFrequencia({dadosReuniao, listaMembros}: {dadosReuniao: EventoProps, listaMembros: MembroProps[]})
{
    if(!dadosReuniao || listaMembros.length <= 0)
    {
        redirect("/main");
    }

    return(
        <div>
            <h1>Trabalhando nisso...</h1>
        </div>
    );
}