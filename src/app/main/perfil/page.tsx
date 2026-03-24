"use server";

import { query_user_id } from "@/app/_actions/user";
import { isSessionValid } from "@/app/_lib/session";
import FormPerfil from "./form-perfil";

export default async function EditMembro()
{
    const session = await isSessionValid();
    const {userId} = session as { userId: number };

    const membro = await query_user_id(userId);

    return(
        <main>
            <FormPerfil membro={membro}/>
        </main>
    );
}