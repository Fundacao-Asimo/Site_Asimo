import { supabase } from "./supabase";

export interface EventoInfo {
    data: string,
    area: string,
    tipo: string,
    descricao: string | null,
    aberta: boolean
}

export interface EventoProps {
    id: number,
    data: string,
    area: string,
    tipo: string,
    descricao: string | null,
    aberta: boolean
}

async function query_evento_id(id: number)
{
    const { data, error } = await supabase
        .from('reunioes-eventos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }

    return data;
}

async function list_eventos(area: string | null = null, tipo: string | null = null)
{
    let query = supabase
        .from("reunioes-eventos")
        .select("*")
        .order("data", { ascending: false });

    if (area !== null) {
        query = query.eq("area", area);
    }
    if (tipo !== null) {
        query = query.eq("tipo", tipo);
    }

    const { data, error } = await query;

    if (error) {
        return [];
    }

    return data;
}

async function insert_evento(dados: EventoInfo)
{
    const { data, error } = await supabase
        .from("reunioes-eventos")
        .insert([dados])
        .select()
        .single();

    if(error || !data) {
        return null;
    }

    return data;
}

async function delete_evento(id: number)
{
    const { error } = await supabase
        .from("reunioes-eventos")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_evento(dadosAtualizados: EventoProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos = {...rest}
    const { data, error } = await supabase
        .from("reunioes-eventos")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

const DB_eventos = {
    query_evento_id,
    list_eventos,
    insert_evento,
    delete_evento,
    edit_evento
}

export default DB_eventos;