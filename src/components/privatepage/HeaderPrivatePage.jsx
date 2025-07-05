import React from "react";

function HeaderPrivatePage({ busca, setBusca, buscarProjeto, abrirNovoProjeto }) {
  return (
    <header>
      <div className="header-actions">
        {/* Botão de Novo Projeto à esquerda */}
        <div className="novo-projeto">
          <button onClick={abrirNovoProjeto}>
            Novo Projeto
          </button>
        </div>

        {/* Campo de busca à direita */}
        <div className="buscar-area">
          <label htmlFor="buscar">Buscar Projeto:</label>
          <input
            type="text"
            id="buscar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Insira o título do Projeto"
          />
          <button onClick={buscarProjeto}>Buscar</button>
        </div>
      </div>
    </header>
  );
}

export default HeaderPrivatePage;
