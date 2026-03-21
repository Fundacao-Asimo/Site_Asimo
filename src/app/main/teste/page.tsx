"use client";

import { useState } from "react";
import "./page.css"
import { criptografar_cpf, criptografar_senha } from "@/app/_actions/cripto";

export default function MinhaPagina() {
  const [abrirModal, setAbrirModal] = useState(false);

  async function teste(formdata: FormData) {
    console.log("senha:", await criptografar_senha("luiz123123"));
    console.log("cpf:", await criptografar_cpf("137.828.316-32"));
  }

  return (
    <main>
      <button onClick={() => setAbrirModal(true)}>
        Cadastrar Novo Registro
      </button>

      {abrirModal && (
        <div className="overlay">
          <div className="modal">
            <h2>Novo Registro</h2>

            <form action={teste}>
              <input type="text" placeholder="Nome" />
              <input type="date" />
              <button type="submit">Salvar</button>
            </form>

            <button onClick={() => setAbrirModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}