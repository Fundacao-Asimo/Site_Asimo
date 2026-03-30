import { supabase } from "./supabase";

export interface HoraInfo {
    horas: number,
    data: string,
    tipo: string,
    descricao: string,
    aprovado: boolean | null,
    membro: number
}

export interface HoraProps {
    id: number,
    horas: number,
    data: string,
    tipo: string,
    descricao: string,
    aprovado: boolean | null,
    membro: number
}

async function query_hora_id(id: number)
{
    const { data: hora, error } = await supabase
        .from("horas")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return null;
    }
    return hora;
}

async function list_horas_geral(aprovado: boolean | null = null)
{
    let query = supabase
        .from("horas")
        .select("*")
        .order("id", { ascending: false });

    if (aprovado !== null) {
        query = query.eq("aprovado", aprovado);
    }

    const { data, error } = await query;

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

async function list_horas_membro(id: number, aprovado: boolean | null = null)
{
    let query = supabase
        .from("horas")
        .select("*")
        .eq("membro", id)
        .order("id", { ascending: false });

    if (aprovado !== null) {
        query = query.eq("aprovado", aprovado);
    }

    const { data, error } = await query;

    if (error) {
        return [];
    }

    return data;
}

async function insert_hora(dados: HoraInfo)
{
    const { data, error } = await supabase
        .from("horas")
        .insert([dados])
        .select()
        .single();

    if(error) {
        return null;
    }

    return data;
}

async function delete_hora(id: number)
{
    const { error } = await supabase
        .from("horas")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_hora(dadosAtualizados: HoraProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos: HoraInfo = {...rest}
    const { data, error } = await supabase
        .from("horas")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

const DB_horas = {
    query_hora_id,
    list_horas_geral,
    list_horas_membro,
    insert_hora,
    delete_hora,
    edit_hora
}

export default DB_horas;