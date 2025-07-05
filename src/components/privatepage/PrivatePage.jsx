import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPrivatePage from "./HeaderPrivatePage";
import ProjetoTablePrivate from "./ProjetoTablePrivate";
import DialogProjetoPrivate from "./DialogProjetoPrivate";
import DialogMensagemPrivate from "./DialogMensagemPrivate";
import axios from "axios";
import axiosComToken from "../../services/axiosinstance";

function PrivatePage() {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [showDialogMensagem, setShowDialogMensagem] = useState(false);
  const [mensagemInfo, setMensagemInfo] = useState({ titulo: "", mensagem: "" });
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const navigate = useNavigate();

  const axiosPublic = axios.create({
    baseURL: "http://localhost:8080",
  });

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Carrega projetos ao abrir a tela
  useEffect(() => {
    carregarProjetos();
  }, []);

  const carregarProjetos = () => {
    axiosPublic
      .get("/projeto/listar")
      .then((response) => setProjetos(response.data))
      .catch((error) => {
        console.error("Erro ao carregar projetos:", error);
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/login");
        }
      });
  };

  const buscarProjeto = () => {
    axiosPublic
      .get("/projeto/buscar", { params: { tituloProjeto: busca } })
      .then((response) => setProjetos(response.data))
      .catch((error) => {
        if (error.response?.status === 404) {
          setMensagemInfo({ titulo: "Erro!", mensagem: "Projeto não encontrado." });
          setShowDialogMensagem(true);
          setProjetos([]);
        } else {
          console.error("Erro ao buscar projeto:", error);
        }
      });
  };

  const abrirNovoProjeto = () => {
    setProjetoSelecionado({
      id: null,
      tituloProjeto: "",
      descricaoProjeto: "",
      alunos: "",
      email: "",
      cidade: { id: null },         // correto: objeto com id
      universidade: { id: null }    // correto: objeto com id
    });
  };

  const abrirEdicao = (projeto) => {
    // Aqui o projeto já vem com cidade e universidade como objetos
    setProjetoSelecionado(projeto);
  };

  const fecharDialogProjeto = () => {
    setProjetoSelecionado(null);
  };

  const aoSalvarProjeto = () => {
    carregarProjetos();
    fecharDialogProjeto();
  };

  const confirmarDelete = (id) => {
    setIdParaExcluir(id);
    setConfirmarExclusao(true);
  };

  const deletarProjeto = () => {
    axiosComToken
      .delete(`/projeto/excluir/${idParaExcluir}`)
      .then(() => {
        setMensagemInfo({ titulo: "Sucesso!", mensagem: "Projeto deletado com sucesso!" });
        setShowDialogMensagem(true);
        carregarProjetos();
      })
      .catch(() => {
        setMensagemInfo({ titulo: "Erro!", mensagem: "Erro ao deletar o projeto." });
        setShowDialogMensagem(true);
      })
      .finally(() => {
        setConfirmarExclusao(false);
        setIdParaExcluir(null);
      });
  };

  return (
    <div className="body-private">
      <HeaderPrivatePage
        busca={busca}
        setBusca={setBusca}
        buscarProjeto={buscarProjeto}
        abrirNovoProjeto={abrirNovoProjeto}
      />

      <ProjetoTablePrivate
        projetos={projetos}
        onEditar={abrirEdicao}
        onDeletar={confirmarDelete}
      />

      {projetoSelecionado && (
        <DialogProjetoPrivate
          projeto={projetoSelecionado}
          onFechar={fecharDialogProjeto}
          onSalvo={aoSalvarProjeto}
        />
      )}

      <DialogMensagemPrivate
        aberto={showDialogMensagem}
        titulo={mensagemInfo.titulo}
        mensagem={mensagemInfo.mensagem}
        onFechar={() => setShowDialogMensagem(false)}
      />

      <DialogMensagemPrivate
        aberto={confirmarExclusao}
        tipo="confirmacao"
        titulo="Confirmação"
        mensagem="Deseja realmente excluir o projeto?"
        onFechar={() => setConfirmarExclusao(false)}
        onConfirmar={deletarProjeto}
      />
    </div>
  );
}

export default PrivatePage;
