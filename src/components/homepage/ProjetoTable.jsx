import React from "react";

function ProjetoTable({ projetos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Título do Projeto</th>
          <th>Alunos</th>
          <th>Email</th>
          <th>Universidade</th>
          <th>Cidade</th>
        </tr>
      </thead>
      <tbody>
        {projetos.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
              Nenhum projeto encontrado.
            </td>
          </tr>
        ) : (
          projetos.map((projeto) => (
            <tr key={projeto.id}>
              <td>{projeto.tituloProjeto}</td>
              <td>{projeto.alunos}</td>
              <td>{projeto.email}</td>
              <td>{projeto.nomeUniversidade || "—"}</td>
              <td>{projeto.nomeCidade || "—"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProjetoTable;
