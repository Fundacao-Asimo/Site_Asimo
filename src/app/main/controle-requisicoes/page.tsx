import { list_req } from "@/app/_actions/requisicoes";

export default function ControleReqPage()
{
    const listaReq = list_req();

    return(
        <main>
            <h1>teste</h1>
        </main>
    );
}