import React from "react";

function ProjetoTable({ projetos, onVisualizar }) {
  return (
    <table className="table table-striped" id="tabelaProjetos">
      <thead>
        <tr>
          <th>Visualizar</th>
          <th>Título do Projeto</th>
          <th>Universidade</th>
        </tr>
      </thead>
      <tbody>
        {projetos.map(projeto => (
          <tr key={projeto.id}>
            <td>
            <button
             onClick={() => onVisualizar(projeto.id)}
            >Visualizar Projeto</button>
            </td>
            <td>{projeto.tituloProjeto}</td>
            <td>{projeto.nomeUniversidade || projeto.universidade?.nome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProjetoTable;
