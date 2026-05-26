'use client';

import { useRef, useState } from "react";
import styles from "./modal.module.css";
import { insert_trans, upload_anexo_trans } from "@/app/_actions/transacao";
import toast from "react-hot-toast";
import { TransacaoInfo, TransacaoProps } from "@/app/_lib/DB_transacoes";

export default function ModalCaixa({ entrada, onClose, onSuccess, addLista }: {entrada: boolean, onClose: () => void, onSuccess: (v: number) => void, addLista: (t: TransacaoProps) => void})
{
    const [valor, setValor] = useState<string>("R$ 0,00");
    const formRef = useRef<HTMLFormElement>(null);

    function handleChangeMoney(e: React.ChangeEvent<HTMLInputElement>) {
        const onlyNumbers = e.target.value.replace(/\D/g, "");
        const formatted = formatMoney(onlyNumbers);
        setValor(formatted);
    }

    function formatMoney(value: string) {
        if (!value) return "R$ 0,00";

        const number = parseInt(value, 10) / 100;

        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    async function cadastrar(formData: FormData)
    {
        const newT = {
            data: formData.get('data') as string,
            descricao: formData.get('descricao') as string,
            valor: 0,
            valorTemp: formData.get('valor') as string,
            entrada: entrada,
            categoria: formData.get('categoria') as string,
            anexo: formData.get('anexo') as File | null,
            status: true,
            membro: null
        }

        newT.valor = Number(newT.valorTemp.replace("R$", "").replace(/\s/g, "").replace(",", "."));
        
        let url_anexo = null;
        if(newT.anexo && newT.anexo.size > 0)
        {
            const ext = newT.anexo.name.split(".").pop();
            url_anexo = await upload_anexo_trans(newT.anexo, `${newT.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ç/g, "c").replace(/Ç/g, "C")}_${Date.now()}.${ext}`);
        }

        if(!url_anexo)
        {
            toast.error('Não foi possível fazer upload do arquivo');
            return;
        }

        const {valorTemp, anexo, ...rest} = newT;

        const newTrans: TransacaoInfo = {
            ...rest,
            anexo_url: url_anexo
        }

        const retorno = await insert_trans(newTrans);

        if(!retorno){
            toast.error("Não foi possível registrar a sua movimentação!");
            return;
        }else{
            toast.success("Movimentação registrada com sucesso!");
            onSuccess(entrada ? newT.valor : -newT.valor);
            addLista(retorno);
            formRef.current?.reset();
        }
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>
                    {entrada ? <h2>Adicionar Entrada Financeira</h2> : <h2>Adicionar Saída Financeira</h2>}
                    <button onClick={onClose} className={styles.close}>×</button>
                </div>
                <form
                    ref={formRef}
                    className={styles.lista}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        await cadastrar(formData);
                    }}
                    encType="multipart/form-data"
                >

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="data">Data</label>
                        <input
                            className={styles.input}
                            type="date"
                            id="data"
                            name="data"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="descricao">Descrição</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="descricao"
                            name="descricao"
                            placeholder="Descrição do Registro"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="valor">Valor</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="valor"
                            name="valor"
                            value={valor}
                            onChange={handleChangeMoney}
                            inputMode="numeric"
                            placeholder="Valor"
                            required
                        />
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="categoria">Categoria</label>
                        <select
                            className={styles.select}
                            name="categoria"
                            id="categoria"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            <option value="Edital">Edital</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Evento">Evento</option>
                            <option value="Patrocínio">Patrocínio</option>
                            <option value="Material">Material</option>
                            <option value="Venda">Venda</option>
                            <option value="Doação">Doação</option>
                            <option value="Reembolso">Reembolso</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </section>

                    <section className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="anexo">Anexo</label>
                        <input
                            className={styles.fileInput}
                            type="file"
                            id="anexo"
                            name="anexo"
                            required
                        />
                    </section>

                    <button className={styles.button}>Registrar</button>

                </form>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.btn}>
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
}