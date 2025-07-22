import ConexaoBD from "../lib/ConexaoBD";

const arquivo = 'usuarios-db.json'

export default async function MainPage() {
    
    const mesAtual = new Date().getMonth() + 1;
    const membros = await ConexaoBD.retornaBD(arquivo);

    const aniversariantes = membros.filter(membro => {
        if(membro.nasc === "0000-00-00") return false;
        const mesNascimento = new Date(membro.nasc).getMonth() + 1;
        return mesNascimento === mesAtual;
    });
    
    return(
        <h1>Home</h1>
    );
}