import React, { useState } from 'react'; // 1. Importar useState
import Button from '../Button/Button';
import styles from './ProjectCard.module.css';
import ProjectModal from '../ProjectModal/ProjectModal'; // 2. Importar o novo modal

/**
 * Exibe um card com as informações resumidas de um projeto.
 * @param {{ project: { id: number, tituloProjeto: string, descricao: string, universidade: { nome: string } } }} props
 */
function ProjectCard({ project }) {
  // 3. Adicionar estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) {
    return null;
  }

  const { 
    tituloProjeto = 'Título não disponível', 
    descricao = '',
    universidade = null 
  } = project;

  const shortDescription = descricao.length > 100 
    ? `${descricao.substring(0, 100)}...` 
    : descricao;
    
  // Funções para abrir e fechar o modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="container">
        <article className={styles.card}>
          {/* O conteúdo do card permanece o mesmo */}
          <div>
            <h3 className={styles.cardTitle}>{tituloProjeto}</h3>
            <p className={styles.cardDescription}>
              {shortDescription || 'Descrição não fornecida.'}
            </p>
          </div>
          
          <div className={styles.cardFooter}>
            <span className={styles.universityName}>
              {universidade?.nome || 'Universidade não informada'}
            </span>
            
            {/* 4. O botão agora abre o modal em vez de ser um link */}
            <Button onClick={handleOpenModal}>Ver Detalhes</Button>
          </div>
        </article>
      </div>

      {/* 5. Renderiza o modal condicionalmente */}
      {isModalOpen && (
        <ProjectModal project={project} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default ProjectCard;