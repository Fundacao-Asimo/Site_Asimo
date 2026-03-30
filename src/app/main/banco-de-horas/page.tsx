import { isSessionValid } from "@/app/_lib/session";
import { list_horas_membro } from "@/app/_actions/hora";
import ConteudoBancoHoras from "./conteudo";

export default async function BancoPage()
{
    const session = await isSessionValid();
    const usuarioIdTemp = session as { userId: number };
    const listHorasTemp = await list_horas_membro(usuarioIdTemp.userId);

    listHorasTemp.forEach((hora) => {
        hora.data = new Date(hora.data + "T00:00:00").toLocaleDateString("pt-BR");
    });

    return (
        <main>
            <ConteudoBancoHoras listHorasInit={listHorasTemp} userId={usuarioIdTemp.userId}/>
        </main>
    );
}
