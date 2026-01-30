import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientsAPI } from "../services/api";
import "./NewPatient.css";

export default function NewPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Masculino",
    phone: "",
    yearStart: new Date().getFullYear().toString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (!formData.name.trim()) {
      alert("O nome é obrigatório!");
      return;
    }
    if (!formData.age || formData.age < 0 || formData.age > 150) {
      alert("Insira uma idade válida!");
      return;
    }
    if (!formData.phone.trim()) {
      alert("O telefone é obrigatório!");
      return;
    }

    setLoading(true);

    try {
      const newPatient = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
        yearStart: formData.yearStart,
        lastVisit: null,
      };

      const createdPatient = await patientsAPI.create(newPatient);

      alert("Paciente cadastrado com sucesso!");
      navigate(`/patient/${createdPatient.id}`);
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      alert("Erro ao cadastrar paciente. Tente novamente.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.name || formData.phone) {
      if (
        window.confirm("Você tem dados não salvos. Deseja realmente cancelar?")
      ) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="new-patient-page">
      <div className="new-patient-header">
        <button className="back-btn" onClick={handleCancel}>
          ← Voltar
        </button>
        <h1>Novo Paciente</h1>
      </div>

      <form className="patient-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* NOME COMPLETO */}
          <div className="form-group full-width">
            <label htmlFor="name">
              Nome Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Maria da Silva Santos"
              required
            />
          </div>

          {/* IDADE */}
          <div className="form-group">
            <label htmlFor="age">
              Idade <span className="required">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ex: 35"
              min="0"
              max="150"
              required
            />
          </div>

          {/* GÊNERO */}
          <div className="form-group">
            <label htmlFor="gender">
              Gênero <span className="required">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* TELEFONE */}
          <div className="form-group">
            <label htmlFor="phone">
              Telefone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 98765-4321"
              required
            />
          </div>

          {/* ANO DE INÍCIO */}
          <div className="form-group">
            <label htmlFor="yearStart">Ano de Início do Tratamento</label>
            <input
              type="number"
              id="yearStart"
              name="yearStart"
              value={formData.yearStart}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        {/* BOTÕES */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel-form"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-submit-form" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Paciente"}
          </button>
        </div>
      </form>
    </div>
  );
}
