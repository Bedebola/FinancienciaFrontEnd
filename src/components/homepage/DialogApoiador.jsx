import React, { useState } from "react";
import DialogMensagem from './DialogMensagem';

function DialogApoiador({ onFechar, onEnviar, idProjeto }) {
  const [email, setEmail] = useState("");
  const [mostrarDialogApoiador, setMostrarDialogApoiador] = useState(false);
  const [mostrarDialogMensagem, setMostrarDialogMensagem] = useState(false);
  
  

  const enviar = () => {
    setMostrarDialogApoiador(false);
    setMostrarDialogMensagem(true);
    }

  return (
    <div>
    <dialog open id="dialogFormApoiador">
      <section>
        <h2>Por gentileza, informe seu e-mail:</h2>
        <input
          type="email"
          id="emailApoiadorInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <menu>
          <button type="button" onClick={onFechar}>Voltar</button>
          <button type="button" disabled={!email} onClick={enviar}>Enviar</button>
        </menu>
      </section>
    </dialog>
    {mostrarDialogMensagem && (
        <DialogMensagem
          onFechar={() => setMostrarDialogMensagem(false)}
        />
      )}
    </div>
  );
}

export default DialogApoiador;
