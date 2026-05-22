"use server";

import { query_user_id } from "@/app/_actions/user";
import FormDesativarMembro from "./form-desativar-membro";

export default async function EditMembro({params}: {params: Promise<{id: string}>})
{
    const {id} = await params;
    const membroTemp = await query_user_id(Number(id));

    return(
        <main>
            <FormDesativarMembro membro={membroTemp}/>
        </main>
    );
}