import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Interceptor para tratar erros de autenticação
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Se o erro for 401 ou 403, pode ser um token inválido/expirado
//     if (error.response && [401, 403].includes(error.response.status)) {

//       localStorage.removeItem('userToken');

//       if (window.location.pathname !== '/loginPage') {
//         window.location = '/loginPage';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;

