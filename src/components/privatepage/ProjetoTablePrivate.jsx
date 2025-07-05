import React from "react";

function ProjetoTablePrivate({ projetos, onEditar, onDeletar }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ações</th>
          <th>Título do Projeto</th>
          <th>Universidade</th>
        </tr>
      </thead>
      <tbody>
        {projetos.length === 0 ? (
          <tr>
            <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
              Nenhum projeto encontrado.
            </td>
          </tr>
        ) : (
          projetos.map((projeto) => (
            <tr key={projeto.id}>
              <td>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() => onEditar(projeto)}
                    aria-label={`Editar o projeto: ${projeto.tituloProjeto}`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn-deletar"
                    onClick={() => onDeletar(projeto.id)}
                    aria-label={`Excluir o projeto: ${projeto.tituloProjeto}`}
                  >
                    Excluir
                  </button>
                </div>
              </td>
              <td>{projeto.tituloProjeto}</td>
              <td>{projeto.nomeUniversidade || "—"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProjetoTablePrivate;
