import "../globals.css";
import { isSessionValid } from "../lib/session";
import Header from "../ui/Header";

export default async function MainLayout ({ children }: {children: React.ReactNode}){

    const isLogged = await isSessionValid();

    return(
        <>
            <Header isLogged={isLogged != false}/>
            {children}
        </>
    )
}