import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Este componente atua como um guardião para rotas protegidas.
 * Ele verifica se o usuário está autenticado usando o AuthContext.
 */
const PrivateRoute = ({ children }) => {
    // Pega o status de autenticação do nosso contexto.
    const { isAuthenticated } = useAuth(); //
    const location = useLocation();

    if (!isAuthenticated) {
        // Se o usuário não estiver autenticado, redireciona para a página de login.
        // O `state={{ from: location }}` é um bônus: ele guarda a página que o usuário
        // tentou acessar, para que possamos redirecioná-lo de volta após o login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se o usuário estiver autenticado, renderiza o componente filho (a página privada).
    return children;
};

export default PrivateRoute;