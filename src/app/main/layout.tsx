import "../globals.css";
import DB_horas from "../lib/DB_horas";
import DB_user from "../lib/DB_user";
import { isSessionValid } from "../lib/session";
import HeaderDinamic from "../ui/HeaderDinamic";
import HeaderMain from "../ui/HeaderMain";

export default async function MainLayout ({ children }: {children: React.ReactNode}){

    const isLogged = await isSessionValid();
    const isAdm = isLogged as {isAdm: boolean};
    const userId = isLogged as {userId: number};
    const usuarioLogado = await DB_user.query_user_id(userId.userId);
    const horasList = await DB_horas.list_horas_membro(userId.userId, true);

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