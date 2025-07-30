import ConexaoBD from "@/app/lib/ConexaoBD";
import MembroCard, { MembroProps } from "@/app/ui/membro-card";
import Link from "next/link";

const arquivo = 'usuarios-db.json';

export default async function ListMembrosPage() {

    const membros = await ConexaoBD.retornaBD(arquivo);

    const membrosMap = membros.filter(membro => membro.id !== 0)
        .map((membro: MembroProps) => {
        return <MembroCard key={membro.id} {...membro}/>
    });

    return(
        <main className="list-container">
            <Link href={'/main/membros/create'} className="link-add-membro">Adicionar</Link>
            <div className="list-membros-container">
                {membrosMap}
            </div>
        </main>
    );
}