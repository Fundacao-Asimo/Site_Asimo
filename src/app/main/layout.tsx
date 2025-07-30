import "../globals.css";
import { isSessionValid } from "../lib/session";
import Header from "../ui/Header";

export default async function MainLayout ({ children }: {children: React.ReactNode}){

    const isLogged = await isSessionValid();
    const isAdm = isLogged as {isAdm: boolean};

    return(
        <>
            <Header isLogged={isLogged != false} isAdm={isAdm.isAdm}/>
            {children}
        </>
    )
}