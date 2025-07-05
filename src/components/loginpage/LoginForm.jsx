import React, { useState } from "react";
import axios from "axios";
import DialogMessage from "./DialogMessage";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const disabled = email.trim() === "" || senha.trim() === "" || isLoading;

  const acessar = async () => {
    if (disabled) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:8080/usuario/login", { 
        email, 
        senha 
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/private");
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setShowDialog(true);
      } else {
        console.error("Erro no login:", error);
        alert("Erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) {
      acessar();
    }
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
              onKeyPress={handleKeyPress}
              autoFocus
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
              onKeyPress={handleKeyPress}
            />
          </div>

          <button 
            id="acessarButton" 
            onClick={acessar} 
            disabled={disabled}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </div>

        {showDialog && (
          <DialogMessage 
            onClose={() => {
              setShowDialog(false);
              setSenha("");
            }} 
          />
        )}
      </div>
    </div>
  );
}

export default LoginForm;