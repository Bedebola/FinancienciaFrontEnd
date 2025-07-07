import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import projectService from '../../services/projectService';
import AdminProjectCard from '../../components/AdminProjectCard/AdminProjectCard';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import ProjectForm from '../../components/ProjectForm/ProjectForm'; // PASSO 1: IMPORTADO
import styles from './AdministrationPage.module.css';

function AdministrationPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Estados para dados, UI e paginação
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [refetchIndex, setRefetchIndex] = useState(0);

    // Estados para o Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // O estado 'formData' e seu 'useEffect' foram removidos (PASSO 4)

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await projectService.listProjects(currentPage, 10);
                setProjects(response.data.content);
                setTotalPages(response.data.page.totalPages);
            } catch (err) {
                console.error("Erro ao buscar projetos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [currentPage, refetchIndex]);

    const handleLogout = () => {
        logout();
        navigate('/HomePage');
    };

    // Abre o modal para CRIAR um novo projeto
    const handleCreateProject = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    // Abre o modal para EDITAR (lógica já estava correta)
    const handleEditProject = async (projectSummary) => {
        try {
            setLoading(true);
            const response = await projectService.getProjectDetails(projectSummary.id);
            setEditingProject(response.data);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Erro ao buscar detalhes do projeto:", err);
            alert("Não foi possível carregar os dados do projeto para edição.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
            try {
                await projectService.deleteProject(id);
                setRefetchIndex(prev => prev + 1);
            } catch (err) {
                console.error("Erro ao excluir projeto:", err);
                alert("Não foi possível excluir o projeto.");
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    // PASSO 3: LÓGICA DE SALVAMENTO ATUALIZADA
    const handleSaveProject = async (projectData) => {
        try {
            if (editingProject) {
                // Mantendo a chamada como no seu service: editProject
                await projectService.editProject(editingProject.id, projectData);
            } else {
                 // Mantendo a chamada como no seu service: newProject
                await projectService.newProject(projectData);
            }
            handleCloseModal();
            setRefetchIndex(prev => prev + 1);
        } catch (err) {
            console.error("Erro ao salvar projeto:", err);
            alert("Não foi possível salvar o projeto.");
        }
    };

    return (
        <div className={styles.adminPage}>
            <header className={styles.header}>
                <h1>Painel de Administração</h1>
                <div>
                    <button onClick={handleCreateProject} className={styles.createButton}>Criar Novo Projeto</button>
                    <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
                </div>
            </header>

            <main className={styles.mainContent}>
                {loading && <p>Carregando projetos...</p>}
                {error && <p>Ocorreu um erro ao carregar os projetos.</p>}

                {!loading && !error && (
                    <div className={styles.projectList}>
                        {projects.map(project => (
                            <AdminProjectCard
                                key={project.id}
                                project={project}
                                onEdit={() => handleEditProject(project)}
                                onDelete={() => handleDeleteProject(project.id)}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )
                }
            </main>
            
            {/* PASSO 2: MODAL AGORA USA O PROJECTFORM */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProject ? "Editar Projeto" : "Criar Novo Projeto"}
            >
                <ProjectForm
                    project={editingProject}
                    onSubmit={handleSaveProject}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
}

export default AdministrationPage;