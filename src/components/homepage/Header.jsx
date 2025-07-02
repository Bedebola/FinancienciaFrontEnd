import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ busca, setBusca, buscarProjeto }) {
  const navigate = useNavigate();

  return (
    <header>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="nav-link" onClick={() => navigate("/login")}>
            Administrar Projetos
          </button>
        </li>
      </ul>
      <div id="buscarInput">
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
