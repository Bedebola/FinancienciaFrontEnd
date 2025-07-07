import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Seu arquivo de configuração do Axios

// 1. Criação do Contexto
const AuthContext = createContext(null);

// 2. Criação do Provedor (AuthProvider)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Pode guardar dados do usuário se quiser
    const [token, setToken] = useState(() => localStorage.getItem('authToken')); // Pega o token do localStorage ao iniciar

    // Efeito para configurar o cabeçalho do Axios sempre que o token mudar
    useEffect(() => {
        if (token) {
            // Adiciona o token ao cabeçalho de todas as requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token); // Garante que está salvo
        } else {
            // Remove o token do cabeçalho e do localStorage se ele for nulo
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
        }
    }, [token]);

    // Função de Login: chamada após receber o token do backend
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData); // Opcional: guardar dados do usuário
    };

    // --- FUNÇÃO DE LOGOUT (A SOLUÇÃO) ---
    // Esta função será chamada pelo seu botão "Sair"
    const logout = () => {
        setUser(null);
        setToken(null); // Isso vai disparar o useEffect para limpar tudo
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};