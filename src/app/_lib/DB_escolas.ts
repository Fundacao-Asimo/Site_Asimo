import { supabase } from "./supabase";

export interface EscolaInfo {
    nome: string,
    turma: string,
    endereco: string,
    endereco_url: string,
    horario: string,
    membros: number[],
    nome_responsavel: string,
    telefone_responsavel: string
}

export interface EscolaProps {
    id: number,
    nome: string,
    turma: string,
    endereco: string,
    endereco_url: string,
    horario: string,
    membros: number[],
    nome_responsavel: string,
    telefone_responsavel: string
}

async function query_escola_id(id: number)
{
    const { data: escola, error } = await supabase
        .from('escolas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }
    return escola;
}

async function list_escolas()
{
    const { data, error } = await supabase
        .from("escolas")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        return [];
    }
    return data;
}

async function list_escolas_membro(id: number)
{
    const listaTemp = await list_escolas();
    
    if(listaTemp.length === 0)
        return [];

    const lista = listaTemp.filter((e) => {
        return e.membros.includes(id);
    });
    
    return lista;
}

async function insert_escola(dados: EscolaInfo)
{
    const { data, error } = await supabase
        .from("escolas")
        .insert([dados])
        .select()
        .single();

    if(error) {
        return null;
    }

    return data;
}

async function delete_escola(id: number)
{
    const { error } = await supabase
        .from("escolas")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_escola(dadosAtualizados: EscolaProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos: EscolaInfo = {...rest}
    const { data, error } = await supabase
        .from("escolas")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

const DB_escolas = {
    query_escola_id,
    list_escolas,
    list_escolas_membro,
    insert_escola,
    delete_escola,
    edit_escola
}

export default DB_escolas;