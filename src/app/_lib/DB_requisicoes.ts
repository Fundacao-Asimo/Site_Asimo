import { supabase } from "./supabase";

export interface RequiInfo {
    membro: number,
    data_envio: string,
    data: string,
    descricao: string,
    area: string,
    anexo_url: string | null,
    status: boolean | null
}

export interface RequiProps {
    id: number,
    membro: number,
    data_envio: string,
    data: string,
    descricao: string,
    area: string,
    anexo_url: string | null,
    status: boolean | null
}

async function query_req_id(id: number)
{
    const { data: req, error } = await supabase
        .from('requisicoes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }

    return req;
}

async function list_req(idMembro: number = 0)
{
    let query = supabase
        .from("requisicoes")
        .select("*")
        .order("data", { ascending: false });

    if (idMembro !== 0) {
        query = query.eq("membro", idMembro);
    }

    const { data, error } = await query;

    if (error) {
        return [];
    }

    return data;
}

async function insert_req(dados: RequiInfo)
{
    const { data, error } = await supabase
        .from("requisicoes")
        .insert([dados])
        .select()
        .single();

    if(error || !data) {
        return null;
    }

    return data;
}

async function delete_req(id: number)
{
    const { error } = await supabase
        .from("requisicoes")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_req(dadosAtualizados: RequiProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos = {...rest}
    const { data, error } = await supabase
        .from("requisicoes")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

function normalizeFileName(nome: string) {
    return nome
        .normalize("NFD") // separa acento da letra
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, "_") // espaços → _
        .replace(/[^\w\-]/g, ""); // remove caracteres especiais
}

async function upload_anexo_req(foto: File, nome: string)
{
    const fileName = normalizeFileName(nome);

    const { error: uploadError } = await supabase.storage
        .from('Anexos_Requisicoes')
        .upload(fileName, foto);

    if (uploadError) {
        console.log(uploadError);
        console.log('nem');
        return null;
    }

    const { data } = await supabase.storage
        .from('Anexos_Requisicoes')
        .getPublicUrl(fileName);

    return data.publicUrl;
}

const DB_req = {
    query_req_id,
    list_req,
    insert_req,
    edit_req,
    delete_req,
    upload_anexo_req
}

export default DB_req;