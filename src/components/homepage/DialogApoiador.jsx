import React, { useState } from "react";
import axios from "axios";

function DialogApoiador({ onFechar, onEnviar, idProjeto }) {
  const [email, setEmail] = useState("");

  const enviar = () => {
    if (!email) return;
  
    axios.post("http://localhost:8080/apoiar", {
      idProjeto,
      email
    })
    .then(() => {
      onEnviar();
    })
    .catch((error) => {
      if (error.response) {
        alert("Erro ao apoiar projeto.");
      } else {
        alert("Erro na requisição.");
      }
    });
  };

  return (
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
  );
}

export default DialogApoiador;
