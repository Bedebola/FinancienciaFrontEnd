import React from "react";

function ProjetoTablePrivate({ projetos, onEditar, onDeletar }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead><tr>
          <th>Ações</th><th>Título</th><th>Universidade</th>
        </tr></thead>
        <tbody>
          {(!projetos || projetos.length === 0) ? (
            <tr><td colSpan="3" style={{ textAlign:"center", padding:20 }}>Nenhum projeto.</td></tr>
          ) : projetos.map(p => (
            <tr key={p.id}>
              <td>
                <div className="acoes-buttons">
                  <button className="btn-editar" onClick={()=>onEditar(p)}>Editar</button>
                  <button className="btn-deletar" onClick={()=>onDeletar(p.id)}>Excluir</button>
                </div>
              </td>
              <td>{p.tituloProjeto}</td>
              <td>{p.universidade?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjetoTablePrivate;
