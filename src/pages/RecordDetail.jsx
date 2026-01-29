import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recordsAPI } from "../services/api";
import "./RecordDetail.css";

export default function RecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    recordsAPI.getById(id).then(setRecord).catch(console.error);
  }, [id]);

  if (!record) return <div className="loading">Carregando...</div>;

  return (
    <div className="record-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="record-header">
        <div className="record-icon-large">📋</div>
        <div>
          <h1>Prontuário SOAP</h1>
          <p>{record.patientName}</p>
        </div>
      </div>

      <div className="record-meta">
        <p>📅 {record.date}</p>
        <p>👨‍⚕️ {record.doctor}</p>
      </div>

      <div className="soap-tabs">
        <div className="tab active">SOAP Completo</div>
        <div className="tab">4 Seções</div>
      </div>

      <div className="soap-sections">
        <div className="soap-section subjective">
          <div className="section-header">
            <div className="section-icon">S</div>
            <div>
              <h3>S - Subjetivo</h3>
              <p>Queixas relatadas pelo paciente</p>
            </div>
          </div>
          <div className="section-content">{record.subjective}</div>
        </div>

        <div className="soap-section objective">
          <div className="section-header">
            <div className="section-icon">O</div>
            <div>
              <h3>O - Objetivo</h3>
              <p>Dados objetivos e exame físico</p>
            </div>
          </div>
          <div className="section-content">{record.objective}</div>
        </div>

        <div className="soap-section assessment">
          <div className="section-header">
            <div className="section-icon">A</div>
            <div>
              <h3>A - Avaliação</h3>
              <p>Diagnóstico e impressão clínica</p>
            </div>
          </div>
          <div className="section-content">{record.assessment}</div>
        </div>

        <div className="soap-section plan">
          <div className="section-header">
            <div className="section-icon">P</div>
            <div>
              <h3>P - Plano</h3>
              <p>Conduta terapêutica e orientações</p>
            </div>
          </div>
          <div className="section-content">{record.plan}</div>
        </div>
      </div>

      <div className="record-footer">
        <h4>Informações do Registro</h4>
        <p>
          ID do Prontuário: <span>{record.recordId}</span>
        </p>
        <p>
          Data de Criação: <span>{record.date}</span>
        </p>
        <p>
          Profissional: <span>{record.doctor}</span>
        </p>
        <p>
          Método: <span>SOAP (Padronizado)</span>
        </p>
      </div>

      <div className="action-buttons">
        <button className="btn-share">🔗 Compartilhar</button>
        <button className="btn-print">🖨️ Imprimir</button>
      </div>
    </div>
  );
}
