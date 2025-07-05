import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import axiosComToken from "../../services/axiosinstance";

export default function DialogProjetoPrivate({ projeto, onFechar, onSalvo }) {
  const [form, setForm] = useState({});
  const [listUni, setListUni] = useState([]);
  const [listCid, setListCid] = useState([]);
  const refDialog = useRef();
  const apiBase = axios.create({ baseURL:"http://localhost:8080" });

  useEffect(() => {
    if (projeto) {
      setForm({
        id: projeto.id,
        tituloProjeto: projeto.tituloProjeto || "",
        descricaoProjeto: projeto.descricaoProjeto || "",
        alunos: projeto.alunos || "",
        email: projeto.email || "",
        universidadeId: projeto.universidade?.id || "",
        cidadeId: projeto.cidade?.id || ""
      });
      refDialog.current?.showModal();
      document.body.style.overflow = "hidden";
      apiBase.get("/universidades/listar").then(r=>setListUni(r.data));
      apiBase.get("/cidades/listar").then(r=>setListCid(r.data));
    } else {
      refDialog.current?.close();
      document.body.style.overflow = "auto";
    }
  }, [projeto]);

  const change = (f,v)=> setForm({...form,[f]:v});

  const salvar = () => {
    const { tituloProjeto, descricaoProjeto, alunos, email, universidadeId, cidadeId } = form;
    if (!tituloProjeto||!descricaoProjeto||!alunos||!email||!universidadeId||!cidadeId){
      alert("Preencha todos os campos."); return;
    }
    const payload = { tituloProjeto, descricaoProjeto, alunos, email,
      universidade:{ id: Number(universidadeId) },
      cidade:{ id: Number(cidadeId) }
    };
    const id = form.id;
    axiosComToken[id ? "put" : "post"](id ? `/projeto/editar/${id}` : "/projeto/novo", payload)
      .then(()=> onSalvo());
  };

  return projeto ? (
    <dialog ref={refDialog} className="dialog-centralizado" onCancel={onFechar}>
      <form>
        <section>
          <h2>{form.id ? "Editar" : "Novo"} Projeto</h2>
          {["tituloProjeto","descricaoProjeto","alunos","email"].map(field => (
            <div key={field} className="input-container">
              <label>{{
                tituloProjeto:"Título",descricaoProjeto:"Descrição",
                alunos:"Alunos", email:"Email"
              }[field]}:</label>
              <input
                type={field==="email"?"email":"text"}
                value={form[field] || ""}
                onChange={e => change(field, e.target.value)}
              />
            </div>
          ))}
          <div className="input-container">
            <label>Universidade:</label>
            <select value={form.universidadeId} onChange={e=>change("universidadeId",e.target.value)}>
              <option value="">Selecione</option>
              {listUni.map(u=> <option key={u.id} value={u.id}>{u.nome}</option>)}
            </select>
          </div>
          <div className="input-container">
            <label>Cidade:</label>
            <select value={form.cidadeId} onChange={e=>change("cidadeId",e.target.value)}>
              <option value="">Selecione</option>
              {listCid.map(c=> <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
        </section>
        <menu>
          <button type="button" onClick={onFechar}>Voltar</button>
          <button type="button" onClick={salvar}>Salvar</button>
        </menu>
      </form>
    </dialog>
  ) : null;
}
