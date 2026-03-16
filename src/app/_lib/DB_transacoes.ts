import { supabase } from "./supabase";

export interface TransacaoInfo {
    data: string,
    descricao: string,
    valor: number,
    entrada: boolean,
    categoria: string,
    anexo_url: string,
    status: boolean | null,
    membro: number | null
}

export interface TransacaoProps {
    id: number,
    data: string,
    descricao: string,
    valor: number,
    entrada: boolean,
    categoria: string,
    anexo_url: string,
    status: boolean | null,
    membro: number | null
}

async function query_trans_id(id: number)
{
    const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }
    return data;
}

async function list_trans()
{
    const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .order("data", { ascending: false });

    if (error) {
        return [];
    }
    return data;
}

async function insert_trans(dados: TransacaoInfo)
{
    const { data, error } = await supabase
        .from("transacoes")
        .insert([dados])
        .select()
        .single();

    if(error || !data) {
        return null;
    }

    return data;
}

async function delete_trans(id: number)
{
    const { error } = await supabase
        .from("transacoes")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_trans(dadosAtualizados: TransacaoProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos: TransacaoInfo = {...rest}
    const { data, error } = await supabase
        .from("transacoes")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

async function upload_anexo_trans(foto: File, nome:string)
{
    const fileName = `${nome.replace(/\s+/g, '_')}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
        .from('Anexos_Caixa')
        .upload(fileName, foto);

    if (uploadError) {
        console.log(uploadError);
        console.log('nem');
        return null;
    }

    const { data } = await supabase.storage
        .from('Anexos_Caixa')
        .getPublicUrl(fileName);

    return data.publicUrl;
}

const DB_transacoes = {
    query_trans_id,
    list_trans,
    insert_trans,
    delete_trans,
    edit_trans,
    upload_anexo_trans
}

export default DB_transacoes;