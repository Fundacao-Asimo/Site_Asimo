"use client";

import { useState } from "react";
import "./page.css"

export default function MinhaPagina() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <main>
      <button onClick={() => setAbrirModal(true)}>
        Cadastrar Novo Registro
      </button>

      {abrirModal && (
        <div className="overlay">
          <div className="modal">
            <h2>Novo Registro</h2>

            <form>
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