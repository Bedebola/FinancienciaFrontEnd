import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('userToken'));

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('userToken', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('userToken');
        }
    }, [token]);

    const login = async (email, senha) => {
        const response = await authService.login(email, senha);
        if (response.data?.token) {
            setToken(response.data.token);
        } else {
            throw new Error('Token não fornecido');
        }
    };

    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
