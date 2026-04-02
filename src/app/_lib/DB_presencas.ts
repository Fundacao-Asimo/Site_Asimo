import { supabase } from "./supabase";

export interface PresencaInfo {
    data: string,
    membro: number,
    evento: number,
    presente: boolean | null,
    justificativa: string | null
}

export interface PresencaProps {
    id: number,
    data: string,
    membro: number,
    evento: number,
    presente: boolean | null,
    justificativa: string | null
}

async function query_presenca_id(id: number)
{
    const { data, error } = await supabase
        .from('presencas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }

    return data;
}

async function list_presencas(idMembro: number = 0, idEvento: number = 0)
{
    let query = supabase
        .from("presencas")
        .select("*")
        .order("data", { ascending: false });

    if (idMembro !== 0) {
        query = query.eq("membro", idMembro);
    }

    if (idEvento !== 0) {
        query = query.eq("evento", idEvento);
    }

    const { data, error } = await query;

    if (error) {
        return [];
    }

    return data;
}

async function insert_presenca(dados: PresencaInfo)
{
    const { data, error } = await supabase
        .from("presencas")
        .insert([dados])
        .select()
        .single();

    if(error || !data) {
        return null;
    }

    return data;
}

async function insert_lista_presencas(dados: PresencaInfo[])
{
    const { error } = await supabase
        .from("presencas")
        .insert(dados);

    if(error) {
        console.log(error);
        return null;
    }

    return [];
}

async function delete_presenca(id: number)
{
    const { error } = await supabase
        .from("presencas")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_presenca(dadosAtualizados: PresencaProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos = {...rest}
    const { data, error } = await supabase
        .from("presencas")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

const DB_presenca = {
    query_presenca_id,
    list_presencas,
    insert_lista_presencas,
    insert_presenca,
    edit_presenca,
    delete_presenca
}

export default DB_presenca;