import { list_user } from "@/app/_actions/user";
import ListaMambros from "./lista-mambros";
import { list_horas_geral } from "@/app/_actions/hora";
import { MembroProps } from "@/app/_lib/DB_user";

export type MembroComHoras = MembroProps & {
    horas_aprovadas: number;
    horas_pendentes: number;
};

export default async function DiretorioMembrosPage()
{
    const membros = await list_user();
    const horas = await list_horas_geral();

    const horasPorMembro: Record<number, { aprovadas: number; pendentes: number }> = {};

    horas.forEach((hora) => {
        if (!horasPorMembro[hora.membro]) {
            horasPorMembro[hora.membro] = { aprovadas: 0, pendentes: 0 };
        }

        if (hora.aprovado === true) {
            horasPorMembro[hora.membro].aprovadas += hora.horas;
        } else if (hora.aprovado === null) {
            horasPorMembro[hora.membro].pendentes += hora.horas;
        }
    });

    // 2. Criar novo objeto combinando dados
    const membrosComHoras: MembroComHoras[] = membros.map((membro) => {
        const horasDoMembro = horasPorMembro[membro.id] || {
            aprovadas: 0,
            pendentes: 0,
        };

        return {
            ...membro,
            horas_aprovadas: horasDoMembro.aprovadas,
            horas_pendentes: horasDoMembro.pendentes,
        };
    });

    return(
        <main>
            <ListaMambros list={membrosComHoras}/>
        </main>
    );
}