import ConexaoBD from "../lib/ConexaoBD";
import { isSessionValid } from "../lib/session";
import AniversarianteCard from "../ui/aniversariante-card";
import { MembroProps } from "../ui/membro-card";

const arquivo = 'usuarios-db.json';

export interface AniversarianteProps {
    id: number,
    nick: string,
    foto: string,
    dia: number
}

export default async function MainPage() {
    
    const usuarioLogado = await isSessionValid();
    const usuario = usuarioLogado as {userNick: string};
    const mesAtual = new Date().getMonth() + 1;
    const membros = await ConexaoBD.retornaBD(arquivo);

    const aniversariantes: AniversarianteProps[] = membros
        .filter((membro: MembroProps) => {
            if(membro.nasc === null) return false;
            const data = new Date(membro.nasc);
            return data.getMonth() + 1 === mesAtual;
        })
        .map((membro: MembroProps) => {
            const data = new Date(membro.nasc);
            return {
                id: membro.id,
                nick: membro.nick,
                foto: membro.foto,
                dia: data.getDate()
            };
        });

    const aniversariantesMap = aniversariantes.map((props: AniversarianteProps) => {
        return <AniversarianteCard key={props.id} {...props}/>
    });

    return(
        <main>
            <h1>Bem Vindo {usuario?.userNick ?? "usuário"}!</h1>
            <section>
                <h2>Aniversariantes do Mês</h2>
                {aniversariantesMap}
            </section>
        </main>
    );
}