import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import style from './LoginPage.module.css';
import logo from '../../assets/images/logo-financiencia.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !senha) {
            setError('Preencha todos os campos.');
            return;
        }

        try {
            await login(email, senha);
            navigate('/AdministrationPage');
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Usuário ou senha inválidos.');
            } else {
                setError('Erro no servidor. Tente novamente.');
            }
        }
    };

    return (
        <div className={style.loginContainer}>
            <div className={style.loginBox}>
                <img src={logo} alt="Logo FinanCiência" className={style.logo} />
                <form className={style.form} onSubmit={handleLogin}>
                    <div className={style.formGroup}>
                        <h2 className="login-title">Olá, administradores!</h2>

                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Digite seu usuário"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="login-button">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
