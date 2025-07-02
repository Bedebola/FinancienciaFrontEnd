import React from "react";

function DialogMessage({ onClose }) {
  return (
    <dialog open>
      <section>
        <h2>Erro!</h2>
        <p>Login Inválido!</p>
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

/*
  Documentação: DialogMessage.jsx

  Este componente exibe uma caixa de diálogo com a mensagem “Login Inválido”.

  - Recebe uma função onClose como prop, que é chamada ao clicar no botão “Ok!”.
  - Usa o elemento HTML <dialog> com open para exibir automaticamente.
  - É usado para informar ao usuário que o login falhou por erro do tipo 400 (credenciais inválidas).

  Estrutura:
  - Um título “Erro!”.
  - Um parágrafo com a mensagem “Login Inválido!”.
  - Um botão “Ok!” que executa a função onClose.
*/