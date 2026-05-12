import { list_presencas } from "@/app/_actions/presencas";
import { PresencaProps } from "@/app/_lib/DB_presencas";
import { list_eventos } from "@/app/_actions/reunioes-eventos";
import { EventoProps } from "@/app/_lib/DB_reunioes-eventos";
import { list_user } from "@/app/_actions/user";
import { MembroProps } from "@/app/_lib/DB_user";
import ConteudoControlePresencas from "./conteudo";

interface DadosFalta {
    id: number;
    data: string,
    membro: string,
    area: string,
    presente: boolean | null,
    justificativa: string | null
}

export interface DictAreaFalta {
    [area: string]: DadosFalta[];
}

export default async function ControleFrequenciaPage()
{
    const membros = await list_user();
    const reunioes = await list_eventos();
    const presencasTotais = await list_presencas();

    if(membros.length === 0) return(<main><h1 style={{margin: "2rem"}}>Não foi possível carregar dados dos membros!</h1></main>);
    if(presencasTotais.length === 0 || reunioes.length === 0) return(<main><h1 style={{margin: "2rem"}}>Não foi encontrado nenhum registro de presença!</h1></main>);

    const listaFaltas = presencasTotais.filter((p: PresencaProps) => p.presente === false);
    const listaProps = listaFaltas.map((p: PresencaProps) => {
        const m = membros.find((m: MembroProps) => m.id === p.membro);
        const r = reunioes.find((r: EventoProps) => r.id === p.evento);
        if(!m || !r)
            return null;
        const dados: DadosFalta = {
            id: p.id,
            data: p.data,
            membro: m.nome_completo,
            area: r.area,
            presente: p.presente,
            justificativa: p.justificativa
        };
        return dados;
    }).filter((dado: DadosFalta | null) => dado !== null);

    const areas: DictAreaFalta = {
        "Geral": listaProps.filter(dado => dado.area === "Geral").sort((a, b) => a.membro.localeCompare(b.membro)),
        "Docência": listaProps.filter(dado => dado.area === "Docência").sort((a, b) => a.membro.localeCompare(b.membro)),
        "Projetos": listaProps.filter(dado => dado.area === "Projetos").sort((a, b) => a.membro.localeCompare(b.membro)),
        "Marketing": listaProps.filter(dado => dado.area === "Marketing").sort((a, b) => a.membro.localeCompare(b.membro)),
        "Gestão": listaProps.filter(dado => dado.area === "Gestão").sort((a, b) => a.membro.localeCompare(b.membro)),
        "AudioVisual": listaProps.filter(dado => dado.area === "AudioVisual").sort((a, b) => a.membro.localeCompare(b.membro)),
        "Diretoria": listaProps.filter(dado => dado.area === "Diretoria").sort((a, b) => a.membro.localeCompare(b.membro))
    }

    return (
        <main>
            <ConteudoControlePresencas dict={areas}/>
        </main>
    )
}