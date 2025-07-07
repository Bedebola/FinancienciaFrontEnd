import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import AdministrationPage from './pages/AdministrationPage/AdministrationPage.jsx';
import HomePage from './pages/HomePage/HomePage';
import ObjectivePage from './pages/ObjectivePage/ObjectivePage';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import MainLayout from './layouts/MainLayout.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
   <AuthProvider>
      <Router>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ObjectivePage" element={<MainLayout><ObjectivePage/></MainLayout>} />
          <Route path="/AboutPage" element={<MainLayout><AboutPage/></MainLayout>} />
          {/* --- Fim das Rotas Públicas --- */}

          {/* --- Rotas Privadas --- */}
          <Route path="/AdministrationPage" element={<PrivateRoute><AdministrationPage/></PrivateRoute>} />
          {/* --- Fim das Rotas Privadas --- */}
        </Routes>
      </Router>
   </AuthProvider>
  );
}

export default App
