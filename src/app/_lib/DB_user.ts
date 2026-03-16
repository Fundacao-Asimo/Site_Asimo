import DB_free from "./DB_free";
import { supabase } from "./supabase";

export interface MembroInfo {
    nome_completo: string,
    apelido: string,
    email: string,
    senha: string,
    nasc_date: string,
    ingresso_date: string,
    foto_url: string | null,
    adm: boolean,
    matricula: string,
    area: string,
    curso: string,
    telefone: string,
    endereco: string,
    cpf: string
}

export interface MembroProps {
    id: number,
    nome_completo: string,
    apelido: string,
    email: string,
    senha: string,
    nasc_date: string,
    ingresso_date: string,
    foto_url: string | null,
    adm: boolean,
    matricula: string,
    area: string,
    curso: string,
    telefone: string,
    endereco: string,
    cpf: string
}

async function query_user_id(id: number)
{
    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }
    return usuario;
}

async function query_user_name(nome: string)
{
    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('nome_completo', nome)
        .single();

    if (error) {
        return null;
    }
    return usuario;
}

async function query_user_email(email: string)
{
    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        return null;
    }
    return usuario;
}

async function list_user()
{
    const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .order("nome_completo", { ascending: true });

    if (error) {
        return [];
    }
    return data;
}

async function list_ids_user()
{
    const list = await list_user();

    if (list.length === 0) {
        return [];
    }
    const data = list.map((u) => {
        return u.id;
    });

    return data;
}

async function insert_user(dados: MembroInfo)
{
    const { data, error } = await supabase
        .from("usuarios")
        .insert([dados])
        .select()
        .single();

    if(error || !data) {
        return null;
    }

    const retorno = await DB_free.insert_free_vazia(data.id);

    return data;
}

async function delete_user(id: number)
{
    const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id);

    if(error) {
        throw error;
    }
}

async function edit_user(dadosAtualizados: MembroProps)
{
    const {id, ...rest} = dadosAtualizados
    const dadosNovos: MembroInfo = {...rest}
    const { data, error } = await supabase
        .from("usuarios")
        .update(dadosNovos)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

async function upload_foto(foto: File, nome:string)
{
    const fileName = `${nome.replace(/\s+/g, '_')}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
        .from('Fotos_Membros')
        .upload(fileName, foto);

    if (uploadError) {
        console.log(uploadError);
        console.log('nem');
        return null;
    }

    const { data } = await supabase.storage
        .from('Fotos_Membros')
        .getPublicUrl(fileName);

    return data.publicUrl;
}

const DB_user = {
    query_user_id,
    query_user_name,
    query_user_email,
    list_user,
    list_ids_user,
    insert_user,
    delete_user,
    edit_user,
    upload_foto
}

export default DB_user;