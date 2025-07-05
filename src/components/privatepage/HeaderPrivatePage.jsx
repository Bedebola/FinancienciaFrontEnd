import React from "react";

function HeaderPrivatePage({ busca, setBusca, buscarProjeto, abrirNovoProjeto }) {
  return (
    <header>
      <div className="header-actions">
        {/* Botão de Novo Projeto */}
        <div className="novo-projeto">
          <button
            onClick={abrirNovoProjeto}
            type="button"
            className="btn-novo-projeto"
            aria-label="Criar um novo projeto"
          >
            Novo Projeto
          </button>
        </div>

        {/* Área de busca */}
        <div className="buscar-area">
          <label htmlFor="campo-busca" style={{ display: "none" }}>
            Buscar Projeto
          </label>
          <input
            type="text"
            id="campo-busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Insira o título do Projeto"
            aria-label="Campo de busca de projetos"
          />
          <button
            type="button"
            onClick={buscarProjeto}
            className="btn-buscar"
            aria-label="Buscar projeto"
          >
            Buscar
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderPrivatePage;
