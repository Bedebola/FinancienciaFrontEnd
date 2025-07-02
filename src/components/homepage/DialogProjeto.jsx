import React from "react";

function DialogProjeto({ projeto, onFechar, onApoiar }) {
  return (
    <dialog open id="dialogVisualizarProjeto">
      <section>
        <h2>
          <input type="text" value={projeto.tituloProjeto} readOnly />
        </h2>
        <p><label>Descrição:</label><input value={projeto.descricaoProjeto} readOnly /></p>
        <p><label>Alunos:</label><input value={projeto.alunos} readOnly /></p>
        <p><label>Email:</label><input value={projeto.email} readOnly /></p>
        <p><label>Universidade:</label><input value={projeto.nomeUniversidade} readOnly /></p>
        <p><label>Cidade:</label><input value={projeto.nomeCidade} readOnly /></p>
      </section>
      <menu>
        <button type="button" onClick={onFechar}>Voltar</button>
        <button type="button" onClick={onApoiar}>Apoiar Projeto</button>
      </menu>
    </dialog>
  );
}

export default DialogProjeto;
