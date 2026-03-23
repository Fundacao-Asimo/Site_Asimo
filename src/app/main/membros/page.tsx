import { list_user } from "@/app/_actions/user";
import ListaMambros from "./lista-mambros";

export default async function DiretorioMembrosPage()
{
    const list = await list_user();

    return(
        <main>
            <ListaMambros list={list}/>
        </main>
    );
}