import React, { useState } from "react";
import axios from "axios";
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
        const { token } = response.data;

        if (token) {
          localStorage.setItem("token", token); // Salva o token no localStorage
          navigate("/private"); // Redireciona para rota privada
        } else {
          setShowDialog(true); // Falha de autenticação
        }
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          setShowDialog(true);
        } else {
          alert("Erro desconhecido (ver console)");
          console.error(error);
        }
      });
  };

  return (
    <div id="body-login">
      <div className="container text-center">
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
    </div>
  );
}

export default LoginForm;
