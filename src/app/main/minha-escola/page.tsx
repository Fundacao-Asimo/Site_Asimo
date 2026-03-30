import { isSessionValid } from "@/app/_lib/session";
import EscolaMembro from "@/app/_ui/escola-membro";
import { list_escolas_membro } from "@/app/_actions/escola";

export default async function MinhaEscola()
{
    const isLogged = await isSessionValid();
    const userId = isLogged as { userId: number };
    const data = await list_escolas_membro(userId.userId);

    if(data.length === 0) return(<main><h1 style={{margin: "2rem"}}>Você ainda não está vinculado a nenhuma escola!</h1></main>);

    const listComponents = data.map((e) => {
        return <EscolaMembro key={e.id} dados={e}/>
    });

    return (
        <main>
            {listComponents}
        </main>
    );
}