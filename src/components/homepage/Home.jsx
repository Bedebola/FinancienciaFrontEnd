import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProjetoTable from "./ProjetoTable";
import DialogProjeto from "./DialogProjeto";
import "./Home.css"
import axios from "axios";

function Home() {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  useEffect(() => {
    listarProjetos();
  }, []);

  const listarProjetos = () => {
    axios
      .get("http://localhost:8080/projeto/listar")
      .then((res) => setProjetos(res.data))
      .catch((err) => console.error("Erro ao listar projetos:", err));
  };

  const buscarProjeto = () => {
    if (!busca.trim()) {
      listarProjetos();
      return;
    }

    axios
      .get(`http://localhost:8080/projeto/buscar?tituloProjeto=${busca}`)
      .then((res) => setProjetos(res.data))
      .catch((err) => {
        console.error("Erro ao buscar projeto:", err);
        setProjetos([]);
      });
  };

  const abrirNovoProjeto = () => {
    setProjetoSelecionado(null);
    setDialogAberto(true);
  };

  const fecharDialog = () => {
    setDialogAberto(false);
    setProjetoSelecionado(null);
  };

  return (
    <div className="home-wrapper">
      <Header
        busca={busca}
        setBusca={setBusca}
        buscarProjeto={buscarProjeto}
        abrirNovoProjeto={abrirNovoProjeto}
      />

      <ProjetoTable projetos={projetos} />

      {dialogAberto && (
        <DialogProjeto
          projeto={projetoSelecionado}
          onFechar={fecharDialog}
          onSalvo={listarProjetos}
        />
      )}
    </div>
  );
}

export default Home;
