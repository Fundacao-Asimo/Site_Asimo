import Link from "next/link";

interface formAddMembro {
    nome: string,
    nick: string,
    email: string,
    password: string,
}

export default function CreateMembro() {

    const addMembro = (formdata: FormData) => {

    }

    return(
        <main className="create-membro-container">
            <h1>Inserir Inserir Membro</h1>
            <form action={addMembro} className="create-membro-form">
                <section className="membro-input">
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome do Membro"
                        aria-label="Nome do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="nick"
                        name="nick"
                        placeholder="Apelido do Membro"
                        aria-label="Apelido do Membro"
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email do Membro"
                        aria-label="Email do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Senha do Membro"
                        aria-label="Senha do Membro"
                        required
                    />
                </section>
                <section className="membro-input">
                    <input
                        type="password"
                        id="password-confirm"
                        name="password-confirm"
                        placeholder="Confirme Senha do Membro"
                        aria-label="Confirme Senha do Membro"
                        required
                    />
                </section>
                <button>Adicionar Membro</button>
            </form>
            <Link href={'/main/membros'}>Voltar para lista</Link>
        </main>
    );
}