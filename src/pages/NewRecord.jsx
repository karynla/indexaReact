import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientsAPI, recordsAPI } from "../services/api";
import "./NewRecord.css";

export default function NewRecord() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    doctor: "",
  });

  useEffect(() => {
    // Carregar dados do paciente
    patientsAPI
      .getById(patientId)
      .then(setPatient)
      .catch((error) => {
        console.error("Erro ao carregar paciente:", error);
        alert("Erro ao carregar dados do paciente");
        navigate("/");
      });
  }, [patientId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (!formData.subjective.trim()) {
      alert("O campo 'Subjetivo' é obrigatório!");
      return;
    }
    if (!formData.assessment.trim()) {
      alert("O campo 'Avaliação' é obrigatório!");
      return;
    }
    if (!formData.doctor.trim()) {
      alert("O campo 'Médico Responsável' é obrigatório!");
      return;
    }

    setLoading(true);

    try {
      // Criar novo prontuário
      const newRecord = {
        patientId: patientId,
        date: new Date().toLocaleDateString("pt-BR"),
        subjective: formData.subjective,
        objective: formData.objective,
        assessment: formData.assessment,
        plan: formData.plan,
        doctor: formData.doctor,
        method: "SOAP",
        status: "Completo",
      };

      const createdRecord = await recordsAPI.create(newRecord);

      alert("Prontuário criado com sucesso!");
      navigate(`/patient/${patientId}`);
    } catch (error) {
      console.error("Erro ao criar prontuário:", error);
      alert("Erro ao criar prontuário. Tente novamente.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      formData.subjective ||
      formData.objective ||
      formData.assessment ||
      formData.plan
    ) {
      if (
        window.confirm(
          "Você tem alterações não salvas. Deseja realmente cancelar?",
        )
      ) {
        navigate(`/patient/${patientId}`);
      }
    } else {
      navigate(`/patient/${patientId}`);
    }
  };

  if (!patient) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="new-record-page">
      <div className="new-record-header">
        <button className="back-btn" onClick={handleCancel}>
          ← Voltar
        </button>
        <h1>Novo Prontuário</h1>
      </div>

      <div className="patient-info-banner">
        <div className="patient-avatar-small">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)}
        </div>
        <div className="patient-info-text">
          <h3>{patient.name}</h3>
          <p>
            {patient.age} anos • {patient.gender} • {patient.phone}
          </p>
        </div>
      </div>

      <form className="soap-form" onSubmit={handleSubmit}>
        {/* SUBJETIVO */}
        <div className="form-section">
          <div className="section-header">
            <h2>
              <span className="soap-letter">S</span> Subjetivo
            </h2>
            <span className="required-badge">Obrigatório</span>
          </div>
          <p className="section-description">
            O que o paciente relata? Queixas, sintomas, história da doença
            atual.
          </p>
          <textarea
            name="subjective"
            value={formData.subjective}
            onChange={handleChange}
            placeholder="Ex: Paciente relata dor de cabeça há 3 dias, de forte intensidade, localizada na região frontal..."
            rows="6"
            required
          />
        </div>

        {/* OBJETIVO */}
        <div className="form-section">
          <div className="section-header">
            <h2>
              <span className="soap-letter">O</span> Objetivo
            </h2>
            <span className="optional-badge">Opcional</span>
          </div>
          <p className="section-description">
            Dados objetivos: exame físico, sinais vitais, resultados de exames.
          </p>
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            placeholder="Ex: PA: 120/80 mmHg, FC: 72 bpm, Tax: 36.5°C. Ausculta cardíaca e pulmonar sem alterações..."
            rows="6"
          />
        </div>

        {/* AVALIAÇÃO */}
        <div className="form-section">
          <div className="section-header">
            <h2>
              <span className="soap-letter">A</span> Avaliação
            </h2>
            <span className="required-badge">Obrigatório</span>
          </div>
          <p className="section-description">
            Diagnóstico, hipóteses diagnósticas, interpretação dos dados.
          </p>
          <textarea
            name="assessment"
            value={formData.assessment}
            onChange={handleChange}
            placeholder="Ex: Cefaleia tensional. CID-10: G44.2"
            rows="4"
            required
          />
        </div>

        {/* PLANO */}
        <div className="form-section">
          <div className="section-header">
            <h2>
              <span className="soap-letter">P</span> Plano
            </h2>
            <span className="optional-badge">Opcional</span>
          </div>
          <p className="section-description">
            Conduta, prescrições, orientações, encaminhamentos.
          </p>
          <textarea
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            placeholder="Ex: Prescrição de Paracetamol 750mg 8/8h por 5 dias. Orientado repouso e hidratação. Retorno em 7 dias..."
            rows="6"
          />
        </div>

        {/* MÉDICO RESPONSÁVEL */}
        <div className="form-section">
          <div className="section-header">
            <h2>Médico Responsável</h2>
            <span className="required-badge">Obrigatório</span>
          </div>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder="Ex: Dr. João Silva - CRM 12345"
            required
          />
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
            {loading ? "Salvando..." : "Salvar Prontuário"}
          </button>
        </div>
      </form>
    </div>
  );
}
