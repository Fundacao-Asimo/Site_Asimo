import Image from "next/image";
import Link from "next/link";
import DB_user, { MembroProps } from "../lib/DB_user";

export default function MembroCard(props: MembroProps)
{
    async function deleteMembro(form: FormData) {
        'use server';
        await DB_user.delete_user(form.get('membro-id'));
    }

    return(
        <div className="membro-container-card">
            <h1>{props.nome_completo}</h1>
            <Image src={props.foto_url}
                   alt="Foto do membro"
                   width={200}
                   height={200}
            />
            <section className="membro-edit-buttons-container">
                <Link href={`/main/membros/edit/${props.id}`} className="link-edit-membro">Editar</Link>
                <Link href={`/main/membros/advertencia/${props.id}`} className="link-adver-membro">Adivertencia</Link>
                <form action={deleteMembro}>
                    <button>Remover</button>
                    <input defaultValue={props.id} name="membro-id" hidden/>
                </form>
            </section>
        </div>
    );
}