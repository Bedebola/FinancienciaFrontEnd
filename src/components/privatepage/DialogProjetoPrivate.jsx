import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosComToken from "../../services/axiosinstance";

function DialogProjetoPrivate({ projeto, onFechar, onSalvo }) {
  const [form, setForm] = useState({
    tituloProjeto: "",
    descricaoProjeto: "",
    alunos: "",
    email: "",
    universidadeId: null,
    cidadeId: null,
  });

  const [universidades, setUniversidades] = useState([]);
  const [cidades, setCidades] = useState([]);

  const axiosBase = axios.create({
    baseURL: "http://localhost:8080",
  });

  useEffect(() => {
    if (projeto) {
      setForm({
        id: projeto.id || null,
        tituloProjeto: projeto.tituloProjeto || "",
        descricaoProjeto: projeto.descricaoProjeto || "",
        alunos: projeto.alunos || "",
        email: projeto.email || "",
        universidadeId: projeto.universidade?.id ?? null,
        cidadeId: projeto.cidade?.id ?? null,
      });
    }

    carregarUniversidadesECidades();
  }, [projeto]);

  const carregarUniversidadesECidades = () => {
    axiosBase.get("/universidades/listar")
      .then((res) => setUniversidades(res.data))
      .catch((err) => console.error("Erro ao carregar universidades:", err));

    axiosBase.get("/cidades/listar")
      .then((res) => setCidades(res.data))
      .catch((err) => console.error("Erro ao carregar cidades:", err));
  };

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSalvar = () => {
    const {
      id,
      tituloProjeto,
      descricaoProjeto,
      alunos,
      email,
      universidadeId,
      cidadeId
    } = form;

    if (
      !tituloProjeto ||
      !descricaoProjeto ||
      !alunos ||
      !email ||
      !universidadeId ||
      !cidadeId
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      tituloProjeto,
      descricaoProjeto,
      alunos,
      email,
      universidade: { id: Number(universidadeId) },
      cidade: { id: Number(cidadeId) }
    };

    const metodo = id ? "put" : "post";
    const url = id ? `/projeto/editar/${id}` : "/projeto/novo";

    axiosComToken[metodo](url, payload)
      .then(() => {
        onSalvo();
        onFechar();
      })
      .catch((err) => {
        console.error("Erro ao salvar projeto:", err);
        alert("Erro ao salvar projeto.");
      });
  };

  if (!form) return null;

  return (
    <dialog open>
      <form method="dialog">
        <section>
          <h2>{form.id ? "Editar Projeto" : "Novo Projeto"}</h2>

          <div className="input-container">
            <label>Título do Projeto:</label>
            <input
              type="text"
              value={form.tituloProjeto}
              onChange={(e) => handleChange("tituloProjeto", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Descrição:</label>
            <input
              type="text"
              value={form.descricaoProjeto}
              onChange={(e) => handleChange("descricaoProjeto", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Alunos:</label>
            <input
              type="text"
              value={form.alunos}
              onChange={(e) => handleChange("alunos", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Universidade:</label>
            <select
              value={form.universidadeId ?? ""}
              onChange={(e) => handleChange("universidadeId", Number(e.target.value))}
            >
              <option value="">Selecione</option>
              {universidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <label>Cidade:</label>
            <select
              value={form.cidadeId ?? ""}
              onChange={(e) => handleChange("cidadeId", Number(e.target.value))}
            >
              <option value="">Selecione</option>
              {cidades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
        </section>

        <menu>
          <button type="button" onClick={onFechar}>Voltar</button>
          <button type="button" onClick={handleSalvar}>Salvar</button>
        </menu>
      </form>
    </dialog>
  );
}

export default DialogProjetoPrivate;
