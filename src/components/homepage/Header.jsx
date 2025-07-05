import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ busca, setBusca, buscarProjeto }) {
  const navigate = useNavigate();

  return (
    <header className="home-header">
      <div className="header-top">
        <button onClick={() => navigate("/login")}>
          Administrar Projetos
        </button>
      </div>

      <div className="buscar-input">
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
    </header>
  );
}

export default Header;


