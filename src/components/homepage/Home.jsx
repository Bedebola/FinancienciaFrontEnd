import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import ProjetoTable from './ProjetoTable';
import DialogProjeto from './DialogProjeto';
import DialogApoiador from './DialogApoiador';
import DialogMensagem from './DialogMensagem';

function Home() {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [mostrarDialogProjeto, setMostrarDialogProjeto] = useState(false);
  const [mostrarDialogApoiador, setMostrarDialogApoiador] = useState(false);
  const [mostrarDialogMensagem, setMostrarDialogMensagem] = useState(false);

  useEffect(() => {
    carregarProjetos();
  }, []);

  const carregarProjetos = () => {
    axios.get("http://localhost:8080/projeto/listar")
      .then(response => setProjetos(response.data))
      .catch(error => console.error("Erro ao carregar projetos:", error));
  };

  const buscarProjeto = () => {
    axios.get("http://localhost:8080/projeto/buscar", {
      params: { tituloProjeto: busca }
    })
    .then(response => setProjetos(response.data))
    .catch(error => {
      if (error.response?.status === 404) {
        setProjetos([]);
        setMostrarDialogMensagem(true);
      }
    });
  };

  const visualizarProjeto = (id) => {
    axios.get(`http://localhost:8080/projeto/visualizar/${id}`)
      .then(response => {
        setProjetoSelecionado(response.data);
        setMostrarDialogProjeto(true);
      })
      .catch(error => console.error("Erro ao visualizar projeto:", error));
  };

  const apoiarProjeto = () => {
    setMostrarDialogProjeto(false);
    setMostrarDialogApoiador(true);
  };

  const enviarApoio = () => {
    setMostrarDialogApoiador(false);
    setMostrarDialogMensagem(true);
  };

  return (
    <div id="body-home" className="home-wrapper">
      <Header
        busca={busca}
        setBusca={setBusca}
        buscarProjeto={buscarProjeto}
      />
      <ProjetoTable
        projetos={projetos}
        onVisualizar={visualizarProjeto}
      />
      {mostrarDialogProjeto && (
        <DialogProjeto
          projeto={projetoSelecionado}
          onFechar={() => setMostrarDialogProjeto(false)}
          onApoiar={apoiarProjeto}
        />
      )}
      {mostrarDialogApoiador && (
        <DialogApoiador
          onFechar={() => setMostrarDialogApoiador(false)}
          onEnviar={enviarApoio}
          idProjeto={projetoSelecionado?.id}
        />
      )}
      {mostrarDialogMensagem && (
        <DialogMensagem
          onFechar={() => setMostrarDialogMensagem(false)}
        />
      )}
    </div>
  );
}

export default Home;

/*
  Documentação: 

  - Utiliza o CSS externo Home.css com width e height total (100vw, 100vh).
  - Todos os elementos agora colam nas laterais da tela, sem margens visuais.
  - Estrutura funcional com axios, modais e busca de projetos.
*/
