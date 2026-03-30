import { supabase } from "./supabase";

export interface FreeTimeInfo {
    membro: number,
    seg: string,
    ter: string,
    qua: string,
    qui: string,
    sex: string,
    sab: string
}

export interface FreeTimeProps {
    id: number,
    membro: number,
    seg: string,
    ter: string,
    qua: string,
    qui: string,
    sex: string,
    sab: string
}

async function query_free_id(id: number)
{
    const { data: free_time, error } = await supabase
        .from("free_time")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return null;
    }
    return free_time;
}

async function query_free_membro(id: number)
{
    const { data: free_time, error } = await supabase
        .from("free_time")
        .select("*")
        .eq("membro", id)
        .single();

    if (error) {
        const padrao: FreeTimeProps = {
            id: 0,
            membro: 0,
            seg: "00000000000000000000000000000000",
            ter: "00000000000000000000000000000000",
            qua: "00000000000000000000000000000000",
            qui: "00000000000000000000000000000000",
            sex: "00000000000000000000000000000000",
            sab: "00000000000000000000000000000000"
        };
        return padrao;
    }
    const free: FreeTimeProps = free_time;
    return free;
}

async function list_free()
{
    const { data, error } = await supabase
        .from("free_time")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        return [];
    }
    return data;
}

async function insert_free_vazia(id: number)
{
    const { data, error } = await supabase
        .from("free_time")
        .insert([{"membro": id}])
        .select()
        .single();

    return { data, error };
}

async function insert_free(dados: FreeTimeInfo)
{
    const { data, error } = await supabase
        .from("free_time")
        .insert([dados])
        .select()
        .single();

    if(error) {
        return null;
    }

    return data;
}

async function delete_free(id: number)
{
    const { error } = await supabase
        .from("free_time")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_free(dadosAtualizados: FreeTimeProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos: FreeTimeInfo = {...rest}
    const { data, error } = await supabase
        .from("free_time")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

const DB_free = {
    query_free_id,
    insert_free,
    delete_free,
    edit_free,
    list_free,
    query_free_membro,
    insert_free_vazia
}

export default DB_free;