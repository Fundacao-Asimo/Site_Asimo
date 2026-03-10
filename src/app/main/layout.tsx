import "../globals.css";
import { isSessionValid } from "../_lib/session";
import HeaderDinamic from "../_ui/HeaderDinamic";
import HeaderMain from "../_ui/HeaderMain";
import { query_user_id } from "../_actions/user";
import { list_horas_membro } from "../_actions/hora";

export default async function MainLayout ({ children }: {children: React.ReactNode}){

    const isLogged = await isSessionValid();
    const isAdm = isLogged as {isAdm: boolean};
    const userId = isLogged as {userId: number};
    const usuarioLogado = await query_user_id(userId.userId);
    const horasList = await list_horas_membro(userId.userId, true);

    let horasMembro = 0;
    horasList.forEach((h) => horasMembro += h.horas);

    return(
        <section className="layout">
            <HeaderMain isAdm={isAdm.isAdm} userObject={usuarioLogado} />
            <div className="conteudo">
                <HeaderDinamic horas={horasMembro}/>
                {children}
            </div>
        </section>
    )
}