import Image from "next/image";
import Link from "next/link";

export default function FreeTime() {
    return(
        <div className="league-container-card">
            <h1>{props.nome}</h1>
            <Image src={props.img}
                   alt="Imagem do emblema da liga"
                   width={200}
                   height={200}
            />
            <p>{props.pais}</p>
            <section className="league-edit-buttons-container">
                <Link href={`/main/edit/${props.id}`} className="link-edit-league">Editar</Link>
                <form action={deleteLeague}>
                    <button>Remover</button>
                    <input defaultValue={props.id} name="league-id" hidden/>
                </form>
            </section>
        </div>
    );
}