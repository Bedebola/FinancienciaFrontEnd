import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const DialogMensagemPrivate = forwardRef(({ aberto, titulo, mensagem, tipo="mensagem", onFechar, onConfirmar }, ref) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close()
  }));

  useEffect(() => {
    if (!dialogRef.current) return;
    aberto ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [aberto]);

  return (
    <dialog ref={dialogRef} className="dialog-centralizado" onCancel={e => { e.preventDefault(); onFechar?.(); }}>
      <section>
        <h2>{titulo}</h2>
        <p>{mensagem}</p>
        <menu>
          {tipo === "confirmacao" ? (
            <>
              <button onClick={onFechar} className="btn-cancelar">Cancelar</button>
              <button onClick={onConfirmar} className="btn-confirmar">Confirmar</button>
            </>
          ) : (
            <button onClick={onFechar} className="btn-confirmar">Ok!</button>
          )}
        </menu>
      </section>
    </dialog>
  );
});

export default DialogMensagemPrivate;
