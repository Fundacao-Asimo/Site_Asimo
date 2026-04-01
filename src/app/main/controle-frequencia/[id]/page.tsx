import { query_evento_id } from "@/app/_actions/reunioes-eventos";
import { list_user } from "@/app/_actions/user";
import ConteudoControleFrequencia from "./conteudo";

export default async function ControleFrequenciaPage({params}: {params: Promise<{id: string}>})
{
    const {id} = await params;
    const dadosReuniao = await query_evento_id(Number(id));
    const listaMembrosTemp = await list_user();
    let listaMembros = [];

    if(!dadosReuniao || listaMembrosTemp.length === 0)
    {
        return(
            <main>
                <h1 style={{margin: "2rem"}}>Algo deu errado. Não foi possível carregar os dados!</h1>
            </main>
        );
    }
    if(dadosReuniao.area !== "Geral")
    {
        if(dadosReuniao.area === "Diretoria")
            listaMembros = listaMembrosTemp.filter(m => m.adm === true);
        else
            listaMembros = listaMembrosTemp.filter(m => m.area === dadosReuniao.area);
    }

    return(
        <main>
            <ConteudoControleFrequencia dadosReuniao={dadosReuniao} listaMembros={listaMembros}/>
        </main>
    );
}