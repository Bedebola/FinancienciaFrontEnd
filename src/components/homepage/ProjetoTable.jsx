import React, { useState } from "react";
import DialogProjeto from "./DialogProjeto";
import DialogApoiador from "./DialogApoiador";
import DialogMensagem from "./DialogMensagem";

function ProjetoTable({ projetos }) {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [mostrarDialogApoiador, setMostrarDialogApoiador] = useState(false);
  const [mostrarDialogMensagem, setMostrarDialogMensagem] = useState(false);

  const handleAbrirDialog = (projeto) => {
    setProjetoSelecionado(projeto);
  };

  const handleFecharDialog = () => {
    setProjetoSelecionado(null);
  };

  const handleApoiarProjeto = () => {
    setMostrarDialogApoiador(true);
  };

  const enviar = () => {
    setMostrarDialogApoiador(false);
    setMostrarDialogMensagem(true);
     handleFecharDialog(); 
  };

  const fecharDialogMensagem = () => {
    setMostrarDialogMensagem(false);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Ação</th>
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
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Nenhum projeto encontrado.
              </td>
            </tr>
          ) : (
            projetos.map((projeto) => (
              <tr key={projeto.id}>
                <td>
                  <button type="button" onClick={() => handleAbrirDialog(projeto)}>
                    Ver Projeto
                  </button>
                </td>
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

      {projetoSelecionado && (
        <DialogProjeto
          projeto={projetoSelecionado}
          onFechar={handleFecharDialog}
          onApoiar={handleApoiarProjeto}
        />
      )}

      {mostrarDialogApoiador && (
        <DialogApoiador
          idProjeto={projetoSelecionado?.id}
          onFechar={() => setMostrarDialogApoiador(false)}
          onEnviar={enviar}
        />
      )}

      {mostrarDialogMensagem && (
        <DialogMensagem onFechar={fecharDialogMensagem} />
      )}
    </>
  );
}

export default ProjetoTable;
