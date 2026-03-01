'use client';

import DB_free from "@/app/lib/DB_free";
import { isSessionValid } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const horarios = [
  "07:00","07:30","08:00","08:30",
  "09:00","09:30","10:00","10:30",
  "11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30",
  "19:00","19:30","20:00","20:30",
  "21:00","21:30","22:00","22:30"
];

const dias = ["seg", "ter", "qua", "qui", "sex", "sab"];

export default function MeuFreeTimePage()
{
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    async function load()
    {
        try {
            const isLogged = await isSessionValid();
            const userId = isLogged as { userId: number };
            const data = await DB_free.query_free_membro(userId.userId);

            if (!data) {
                toast.error("Não foi possível acessar seus dados!");
                redirect("/main");
            }

            setData(data);
        } catch (err) {
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    }

    function toggle(day: string, index: number)
    {
        const updated = { ...data };
        const chars = updated[day].split("");

        chars[index] = chars[index] === "1" ? "0" : "1";

        updated[day] = chars.join("");
        setData(updated);
    }

    async function salvar()
    {
        const retorno = await DB_free.edit_free(data);

        if(retorno)
        {
            toast.success("Salvo com sucesso!");
            return;
        }
        toast.error("Não foi possível atualizar sua free time!");
    }

    if(loading) return <main><p style={{color: "black", fontSize: "3rem"}}>Carregando...</p></main>;

    return (
        <main>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Horário</th>
                        {dias.map((d) => (<th key={d}>{d.toUpperCase()}</th>))}
                    </tr>
                </thead>
                <tbody>
                {horarios.map((hora, i) => (
                    <tr key={hora}>
                        <td>{hora}</td>
                        {dias.map((d) => {const ocupado = data[d][i] === "1";
                            return (
                                <td
                                    key={d}
                                    onClick={() => toggle(d, i)}
                                    style={{
                                    cursor: "pointer",
                                    backgroundColor: ocupado ? "#ff6b6b" : "#9be9a8",
                                    }}
                                />
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={salvar} style={{ marginTop: 20 }}>Salvar alterações</button>
        </main>
    );
}