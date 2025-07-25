'use server';

import Image from "next/image";
import Link from "next/link";
import ConexaoBD from "../lib/ConexaoBD";
import { redirect } from "next/navigation";

export interface MembroProps {
    id: number,
    nome: string,
    nick: any,
    email: string,
    password: string,
    adm: boolean,
    nasc: any,
    foto: any
}

const arquivo = 'usuarios-db.json';

export default function MembroCard(props: MembroProps) {

    const deleteMembro = async (form: FormData) => {
        const email = Number(form.get('membro-email'));
        const listaMembros = await ConexaoBD.retornaBD(arquivo);
        const membroIdx = listaMembros.findIndex((d) => d.email === email);

        listaMembros.splice(membroIdx,1);
        await ConexaoBD.armazenaBD(arquivo, listaMembros);

        redirect('/main');
    }

    return(
        <div className="membro-container-card">
            <h1>{props.nome}</h1>
            <Image src={props.foto}
                   alt="Foto do membro"
                   width={200}
                   height={200}
            />
            <section className="membro-edit-buttons-container">
                <Link href={`/main/membros/edit/${props.email}`} className="link-edit-membro">Editar</Link>
                <form action={deleteMembro}>
                    <button>Remover</button>
                    <input defaultValue={props.email} name="membro-email" hidden/>
                </form>
            </section>
        </div>
    );
}