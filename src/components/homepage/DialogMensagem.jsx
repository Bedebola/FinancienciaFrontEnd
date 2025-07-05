import React from "react";

function DialogMensagem({ onFechar }) {
  return (
    <dialog open className="dialog-centralizado">
      <section className="dialog-box">
        <h2>Obrigada!</h2>
        <p>A universidade entrará em contato!</p>
        <menu>
          <button type="button" onClick={onFechar}>Ok!</button>
        </menu>
      </section>
    </dialog>
  );
}

export default DialogMensagem;
