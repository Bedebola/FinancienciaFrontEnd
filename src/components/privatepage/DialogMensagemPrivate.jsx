import React from "react";

function DialogMensagemPrivate({
  aberto,
  titulo,
  mensagem,
  tipo = "mensagem",
  onFechar,
  onConfirmar
}) {
  if (!aberto) return null;

  return (
    <dialog open>
      <section>
        <h2>{titulo}</h2>
        <p>{mensagem}</p>

        <menu>
          {tipo === "confirmacao" ? (
            <>
              <button type="button" onClick={onFechar}>
                Cancelar
              </button>
              <button type="button" onClick={onConfirmar}>
                Confirmar
              </button>
            </>
          ) : (
            <button type="button" onClick={onFechar}>
              Ok!
            </button>
          )}
        </menu>
      </section>
    </dialog>
  );
}

export default DialogMensagemPrivate;
