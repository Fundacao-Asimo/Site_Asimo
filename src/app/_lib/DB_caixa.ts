import { supabase } from "./supabase";

export interface CaixaInfo {
    valor: number,
    conta: string
}

export interface CaixaProps {
    id: number,
    valor: number,
    conta: string
}

async function query_caixa()
{
    const { data, error } = await supabase
        .from('caixa')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) {
        return null;
    }
    return data;
}

async function add_caixa(valor: number, entrada: boolean)
{
    const caixa = await query_caixa();

    if(!caixa)
        return null;

    const {id, ...rest} = caixa
    const newCaixa: CaixaInfo = {...rest}

    if(entrada)
        newCaixa.valor += valor;
    else
        newCaixa.valor -= valor;

    const { data, error } = await supabase
        .from("caixa")
        .update(newCaixa)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return null;
    }

    return data;
}

const DB_caixa = {
    query_caixa,
    add_caixa
}

export default DB_caixa;