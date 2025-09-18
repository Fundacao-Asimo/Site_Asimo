import ConexaoBD from "@/app/lib/ConexaoBD";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const arquivo = "usuarios-db.json";

export default async function CreateMembro() {

    const addMembro = async (formdata: FormData) => {
        const nome = formdata.get("nome");
        const nick = formdata.get("nick");
        const email = formdata.get("email");
        const senha = formdata.get("password");
        const senhaConfirmacao = formdata.get("password-confirm");

        const membros = await ConexaoBD.retornaBD(arquivo);

        const idNovo = membros[-1].id + 1;

        if(senha === senhaConfirmacao) {

            const novoMembro = {
                id: idNovo,
                nome: nome,
                nick: nick,
                email: email,
                password: senha,
                ingresso: null,
                adm: false,
                nasc: null,
                foto: null
            }
        }
        else {
            toast.error("Senhas não são iguais");
            return;
        }

        membros.push(novoMembro);
        await ConexaoBD.armazenaBD(membros);

        redirect("/main/membros");
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