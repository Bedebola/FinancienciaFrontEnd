import React, { useEffect, useState, useRef } from "react";
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

  const [showDialogMsg, setShowDialogMsg] = useState(false);
  const [msgInfo, setMsgInfo] = useState({ titulo: "", texto: "" });

  const [showConfirma, setShowConfirma] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);

  const refMsg = useRef();
  const refConf = useRef();
  const navigate = useNavigate();

  const apiPublic = axios.create({ baseURL: "http://localhost:8080" });

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    carregarProjetos();
  }, []);

  const carregarProjetos = () => {
    apiPublic
      .get("/projeto/listar")
      .then(res => setProjetos(res.data))
      .catch(err => {
        if ([401, 403].includes(err.response?.status)) navigate("/login");
      });
  };

  const buscarProjeto = () => {
    apiPublic
      .get("/projeto/buscar", { params: { tituloProjeto: busca } })
      .then(res => setProjetos(res.data))
      .catch(err => {
        if (err.response?.status === 404) {
          setMsgInfo({ titulo: "Erro", texto: "Projeto não encontrado." });
          setShowDialogMsg(true);
          refMsg.current.showModal();
          setProjetos([]);
        }
      });
  };

  const abrirNovo = () => setProjetoSelecionado({ id: null });

  const abrirEdicao = projeto => setProjetoSelecionado(projeto);

  const fecharProjeto = () => setProjetoSelecionado(null);

  const onProjetoSalvo = () => {
    carregarProjetos();
    fecharProjeto();
  };

  const confirmarDelete = id => {
    setIdExcluir(id);
    setShowConfirma(true);
    refConf.current.showModal();
  };

  const deletarProjeto = () => {
    if (!idExcluir) return;
    axiosComToken
      .delete(`/projeto/excluir/${idExcluir}`)
      .then(() => {
        setMsgInfo({ titulo: "Sucesso", texto: "Projeto excluído." });
        setShowDialogMsg(true);
        refMsg.current.showModal();
        carregarProjetos();
      })
      .catch(() => {
        setMsgInfo({ titulo: "Erro", texto: "Falha ao excluir." });
        setShowDialogMsg(true);
        refMsg.current.showModal();
      })
      .finally(() => {
        setShowConfirma(false);
        setIdExcluir(null);
        refConf.current.close();
      });
  };

  return (
    <div className="body-private">
      <HeaderPrivatePage
        busca={busca}
        setBusca={setBusca}
        buscarProjeto={buscarProjeto}
        abrirNovoProjeto={abrirNovo}
      />

      <ProjetoTablePrivate
        projetos={projetos}
        onEditar={abrirEdicao}
        onDeletar={confirmarDelete}
      />

      <DialogProjetoPrivate
        projeto={projetoSelecionado}
        onFechar={fecharProjeto}
        onSalvo={onProjetoSalvo}
      />

      {
        showDialogMsg ?
        <DialogMensagemPrivate
          ref={refMsg}
          aberto={showDialogMsg}
          tipo="mensagem"
          titulo={msgInfo.titulo}
          mensagem={msgInfo.texto}
          onFechar={() => {
            setShowDialogMsg(false);
            refConf.current.close();
          }}
        />
        :
        <></>

      }


      {
        showConfirma ? 
          <DialogMensagemPrivate
            ref={refConf}
            aberto={showConfirma}
            tipo="confirmacao"
            titulo="Confirmação"
            mensagem="Deseja excluir?"
            onFechar={() => {
              console.log("onFechar", showConfirma)
              setShowConfirma(false);
              refConf.current.close();
            }}
            onConfirmar={deletarProjeto}
          />
          :
            <></>
      }

       
    </div>
  );
}

export default PrivatePage;
