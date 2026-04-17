"use client";

import Image from "next/image";
import Link from "next/link";
import { MembroProps } from "../_lib/DB_user";
import { delete_user } from "../_actions/user";
import styles from "../_styles/MembroCard.module.css"
import modal from "../_styles/popUp_confirmation.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function MembroCard(props: MembroProps)
{
    const [modalExcluir, setModalExcluir] = useState<{
            open: boolean;
            membro: MembroProps | null;
        }>({
            open: false,
            membro: null
        });

    return(
        <>
            {modalExcluir.open && modalExcluir.membro && <ModalExcluir membro={modalExcluir.membro} onClose={() => setModalExcluir(prev => ({...prev, open: false}))}/>}
            <div className={styles.card}>
                <h2 className={styles.name}>{props.nome_completo}</h2>

                <div>
                    {props.foto_url && <Image
                        src={props.foto_url || "/docencia.png"}
                        alt="Foto do membro"
                        width={140}
                        height={140}
                        className={styles.image}
                    />}
                    {!props.foto_url && <Image
                        src={"/docencia.png"}
                        alt="Foto do membro"
                        width={140}
                        height={140}
                        className={styles.image}
                    />}

                    <section className={styles.actions}>
                        <Link
                            href={`/main/controle-membros/edit/${props.id}`}
                            className={styles.link}
                        >
                            Editar
                        </Link>

                        <Link
                            href={`/main/controle-membros/advertencia/${props.id}`}
                            className={styles.link}
                        >
                            Advertência
                        </Link>

                        <form action={() => setModalExcluir({open: true, membro: props})}>
                            <button className={styles.deleteButton}>
                                Remover
                            </button>

                            <input
                                defaultValue={props.id}
                                name="membro-id"
                                hidden
                            />
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

function ModalExcluir({ membro, onClose }: {membro: MembroProps, onClose: () => void})
{

    async function excluir() {
        const retorno = await delete_user(membro.id);

        if(!retorno)
        {
            toast.error(`Erro ao excluir registro!`);
            onClose();
        }
        else
        {
            toast.success(`Êxito ao excluir registro!`);
            onClose();
            redirect("/main/controle-membros");
        }
    }

    return(
        <div className={modal.overlay}>
        
            <div className={modal.modal}>

                <div className={modal.header}>
                    <h2>Remover Membro?</h2>
                    <button onClick={onClose} className={modal.close}>×</button>
                </div>

                <div className={modal.footer}>
                    <button onClick={excluir} className={modal.btnConf}>
                        Confirmar
                    </button>
                    <button onClick={onClose} className={modal.btnCanc}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    );
}