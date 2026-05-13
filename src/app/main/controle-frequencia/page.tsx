import { list_presencas } from "@/app/_actions/presencas";
import { PresencaProps } from "@/app/_lib/DB_presencas";
import { list_eventos } from "@/app/_actions/reunioes-eventos";
import { EventoProps } from "@/app/_lib/DB_reunioes-eventos";
import { list_user } from "@/app/_actions/user";
import { MembroProps } from "@/app/_lib/DB_user";
import ConteudoControlePresencas from "./conteudo";

export interface DadosFalta {
    id: number;
    id_membro: number,
    data: string,
    membro: string,
    area: string,
    area_membro: string,
    presente: boolean | null,
    justificativa: string | null
}

export interface DictAreaFalta {
    [area: string]: Record<string, DadosFalta[]>;
}

export default async function ControleFrequenciaPage()
{
    const membros = await list_user();
    const reunioes = await list_eventos();
    const presencasTotais = await list_presencas();

    if(membros.length === 0) return(<main><h1 style={{margin: "2rem"}}>Não foi possível carregar dados dos membros!</h1></main>);
    if(presencasTotais.length === 0 || reunioes.length === 0) return(<main><h1 style={{margin: "2rem"}}>Não foi encontrado nenhum registro de presença!</h1></main>);

    const listaProps = presencasTotais.map((p: PresencaProps) => {
        const m = membros.find((m: MembroProps) => m.id === p.membro);
        const r = reunioes.find((r: EventoProps) => r.id === p.evento);
        if(!m || !r)
            return null;
        const dados: DadosFalta = {
            id: p.id,
            id_membro: m.id,
            data: p.data,
            membro: m.nome_completo,
            area: r.area,
            area_membro: m.area,
            presente: p.presente,
            justificativa: p.justificativa
        };
        return dados;
    }).filter((dado: DadosFalta | null) => dado !== null).sort((a, b) => a.membro.localeCompare(b.membro));

    const areas: DictAreaFalta = {
        "Todas": {},
        "Geral": {},
        "Docência": {},
        "Projetos": {},
        "Marketing": {},
        "Gestão": {},
        "AudioVisual": {},
        "Diretoria": {}
    }
    listaProps.forEach((item) => {
        if (!areas["Todas"][item.membro])
            areas["Todas"][item.membro] = [];

        areas["Todas"][item.membro].push(item);

        switch(item.area)
        {
            case "Geral":
                if (!areas["Geral"][item.membro])
                    areas["Geral"][item.membro] = [];

                areas["Geral"][item.membro].push(item);
                break;

            case "Docência":
                if (!areas["Docência"][item.membro])
                    areas["Docência"][item.membro] = [];

                areas["Docência"][item.membro].push(item);
                break;
            
            case "Projetos":
                if (!areas["Projetos"][item.membro])
                    areas["Projetos"][item.membro] = [];

                areas["Projetos"][item.membro].push(item);
                break;

            case "Marketing":
                if (!areas["Marketing"][item.membro])
                    areas["Marketing"][item.membro] = [];

                areas["Marketing"][item.membro].push(item);
                break;

            case "Gestão":
                if (!areas["Gestão"][item.membro])
                    areas["Gestão"][item.membro] = [];

                areas["Gestão"][item.membro].push(item);
                break;

            case "AudioVisual":
                if (!areas["AudioVisual"][item.membro])
                    areas["AudioVisual"][item.membro] = [];

                areas["AudioVisual"][item.membro].push(item);
                break;

            case "Diretoria":
                if (!areas["Diretoria"][item.membro])
                    areas["Diretoria"][item.membro] = [];

                areas["Diretoria"][item.membro].push(item);
                break;
        }
    });

    return (
        <main>
            <ConteudoControlePresencas dict={areas}/>
        </main>
    )
}