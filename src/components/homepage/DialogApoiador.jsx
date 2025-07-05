import React, { useState } from "react";
import DialogMensagem from './DialogMensagem';

function DialogApoiador({ onFechar, onEnviar, idProjeto }) {
  const [email, setEmail] = useState("");
  const [mostrarDialogMensagem, setMostrarDialogMensagem] = useState(false);

  const enviar = () => {
    setMostrarDialogMensagem(true);
    setEmail("");
    onEnviar();
  };

  return (
    <>
      <dialog open className="dialog-centralizado">
        <section className="dialog-box">
          <h2>Por gentileza, informe seu e-mail:</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
          />
          <menu>
            <button type="button" onClick={onFechar}>Voltar</button>
            <button type="button" onClick={enviar} disabled={!email}>Enviar</button>
          </menu>
        </section>
      </dialog>

      {mostrarDialogMensagem && (
        <DialogMensagem onFechar={() => setMostrarDialogMensagem(false)} />
      )}
    </>
  );
}

export default DialogApoiador;
