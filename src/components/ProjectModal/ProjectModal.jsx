import React, { useState } from 'react';
import styles from './ProjectModal.module.css';

/**
 * Modal que exibe todas as informações de um projeto e um formulário de contato.
 * @param {{ project: object, onClose: () => void }} props
 */
function ProjectModal({ project, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Desestruturação segura dos dados do projeto
  const {
    tituloProjeto = 'Título não disponível',
    descricao = 'Descrição não fornecida.',
    universidade = { nome: 'Universidade não informada' }
  } = project;

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // 1. Validação do E-mail
    if (!email) {
      setError('Por favor, insira um e-mail.');
      return;
    }
    // Regex simples para validação de formato de e-mail
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('O formato do e-mail é inválido.');
      return;
    }

    // 2. Simulação de envio
    setError('');
    setIsLoading(true);
    
    console.log(`Simulando envio de contato para o projeto "${tituloProjeto}" com o e-mail da instituição: ${email}`);

    // Simula uma chamada de API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500); // 1.5 segundos de "loading"
  };

  // Impede que o clique dentro do modal o feche
  const handleModalContentClick = (e) => e.stopPropagation();

  return (
    // O backdrop que cobre a tela inteira. O onClick aqui fecha o modal.
    <div className={styles.modalBackdrop} onClick={onClose}>
      
      <div className={styles.modalContent} onClick={handleModalContentClick}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">&times;</button>
        
        <h2 className={styles.modalTitle}>{tituloProjeto}</h2>
        <span className={styles.universityName}>{universidade.nome}</span>
        
        <p className={styles.modalDescription}>
          {descricao}
        </p>

        <div className={styles.contactSection}>
          <hr className={styles.divider} />

          {/* Renderização condicional: exibe o formulário ou a mensagem de sucesso */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className={styles.contactTitle}>Interessado? Entre em contato!</h3>
              <p className={styles.contactSubtitle}>
                Deixe o e-mail da sua instituição e os responsáveis pelo projeto entrarão em contato.
              </p>
              
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.inputField}
                  placeholder="seu.email@instituicao.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar Contato'}
                </button>
              </div>
              {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
          ) : (
            <div className={styles.successMessage}>
              <p>✔ E-mail enviado com sucesso!</p>
              <span>Obrigado pelo seu interesse. A equipe do projeto foi notificada.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;