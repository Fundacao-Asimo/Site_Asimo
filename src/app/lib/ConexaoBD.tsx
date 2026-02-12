import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface MembroProps {
    nome_completo: string,
    apelido: string,
    email: string,
    senha: string,
    nasc_date: string,
    ingresso_date: string,
    foto_url: string,
    adm: boolean
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

async function insert_user(dados: MembroProps)
{
    const { data, error } = await supabase
        .from("usuarios")
        .insert([dados])
        .select()
        .single();

    if (error) {
        return null;
    }

  return data;
}

async function delete_user(id: number) {
    const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}

async function edit_user(id: number, dadosAtualizados: Partial<MembroProps>) {
    const { data, error } = await supabase
        .from("usuarios")
        .update(dadosAtualizados)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

  return data;
}

const DB = {
    query_user_id,
    query_user_name,
    query_user_email,
    insert_user,
    delete_user,
    edit_user
}

export default DB;