"use server";

import FormEditEscola from "./form-edit-escola";
import { query_escola_id } from "@/app/_actions/escola";

export default async function EditEscola({params}: {params: Promise<{id: string}>})
{
    const {id} = await params;
    const escolaTemp = await query_escola_id(Number(id));

    return(
        <main>
            <FormEditEscola escola={escolaTemp}/>
        </main>
    );
}