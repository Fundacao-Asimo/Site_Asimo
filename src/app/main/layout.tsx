import "../globals.css";
import { isSessionValid } from "../lib/session";
import HeaderDinamic from "../ui/HeaderDinamic";
import HeaderMain from "../ui/HeaderMain";

export default async function MainLayout ({ children }: {children: React.ReactNode}){

    const isLogged = await isSessionValid();
    const isAdm = isLogged as {isAdm: boolean};

    return(
        <section className="layout">
            <HeaderMain isAdm={isAdm.isAdm} />
            <div className="conteudo">
                <HeaderDinamic horas={5}/>
                {children}
            </div>
        </section>
    )
}