import React from "react";

function DialogMessage({ onClose }) {
  return (
    <dialog open className="dialog-centralizado">
      <section className="dialog-box">
        <h2>Erro!</h2>
        <p>Login inválido! Verifique suas credenciais.</p>
        <menu>
          <button type="button" onClick={onClose}>
            Ok!
          </button>
        </menu>
      </section>
    </dialog>
  );
}

export default DialogMessage;
