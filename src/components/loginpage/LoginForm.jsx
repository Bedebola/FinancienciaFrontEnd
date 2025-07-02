import React, { useState } from "react";
import axios from "axios"
import DialogMessage from "./DialogMessage";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const disabled = email.trim() === "" || senha.trim() === "";

  const acessar = () => {
    axios
      .post("http://localhost:8080/usuario/login", { email, senha })
      .then((response) => {
        if (response.status === 200) {
          <button className="nav-link" onClick={() => navigate("/private")}></button>
        }
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setShowDialog(true);
        } else {
          alert("Verifique o console");
          console.error("Erro desconhecido:", error);
        }
      });
  };

  return (
    <div id= "body-login" className="container text-center">
      <h1 className="title">FinanCiência</h1>
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Usuário:</label>
          <input
            type="text"
            id="email"
            placeholder="Digite seu usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button id="acessarButton" onClick={acessar} disabled={disabled}>
          Entrar
        </button>
      </div>

      {showDialog && <DialogMessage onClose={() => window.location.reload()} />}
    </div>
  );
}

export default LoginForm;

/*
  Documentação: LoginForm.jsx

  Este componente representa a tela de login do sistema.

  - Usa useState para armazenar o email, a senha e o controle da exibição do diálogo de erro.
  - Usa axios para enviar os dados de login para o backend.
  - Usa useNavigate para redirecionar o usuário após o login bem-sucedido.
  - Exibe o componente DialogMessage quando o login falha com erro 400.

  Estrutura:
  - Um título principal “FinanCiência”.
  - Dois campos de entrada: um para email (usuário) e outro para senha.
  - Um botão "Entrar" que dispara a função de login (acessar()), desativado se os campos estiverem vazios.
  - Um diálogo modal de erro, exibido somente em caso de falha no login.
*/

