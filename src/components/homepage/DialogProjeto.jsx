import React from "react";

function DialogProjeto({ projeto, onFechar, onApoiar }) {
  return (
    <dialog open className="dialog-centralizado" id="dialogVisualizarProjeto">
      <section className="dialog-box">
        <h2>
          <input type="text" value={projeto.tituloProjeto} readOnly />
        </h2>

        <div className="input-group">
          <label>Descrição:</label>
          <input type="text" value={projeto.descricaoProjeto} readOnly />
        </div>

        <div className="input-group">
          <label>Alunos:</label>
          <input type="text" value={projeto.alunos} readOnly />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input type="text" value={projeto.email} readOnly />
        </div>

        <div className="input-group">
          <label>Universidade:</label>
          <input type="text" value={projeto.nomeUniversidade} readOnly />
        </div>

        <div className="input-group">
          <label>Cidade:</label>
          <input type="text" value={projeto.nomeCidade} readOnly />
        </div>

        <menu className="dialog-buttons">
          <button type="button" onClick={onFechar}>Voltar</button>
          <button type="button" onClick={onApoiar}>Apoiar Projeto</button>
        </menu>
      </section>
    </dialog>
  );
}

export default DialogProjeto;
