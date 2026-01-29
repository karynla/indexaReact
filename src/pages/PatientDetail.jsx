import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientsAPI, recordsAPI } from "../services/api";
import "./PatientDetail.css";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    patientsAPI.getById(id).then(setPatient).catch(console.error);
    recordsAPI.getByPatient(id).then(setRecords).catch(console.error);
  }, [id]);

  if (!patient) return <div className="loading">Carregando...</div>;

  return (
    <div className="patient-detail-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <div className="patient-header">
        <div className="patient-avatar-large">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)}
        </div>
        <div className="patient-header-info">
          <h1>{patient.name}</h1>
          <p>
            👤 {patient.age} anos • {patient.gender}
          </p>
        </div>
      </div>

      <div className="patient-meta">
        <p>📞 {patient.phone}</p>
        {patient.lastVisit && <p>📅 Última visita: {patient.lastVisit}</p>}
      </div>

      <div className="patient-stats-grid">
        <div className="stat-box">
          <h3>{records.length}</h3>
          <p>Prontuários</p>
        </div>
        <div className="stat-box">
          <h3>14</h3>
          <p>Último Atendimento</p>
        </div>
        <div className="stat-box">
          <h3>{patient.yearStart}</h3>
          <p>Ano de Início</p>
        </div>
      </div>

      <div className="records-section">
        <div className="records-header">
          <h2>Histórico de Prontuários</h2>
          <span className="records-badge">{records.length} registros</span>
        </div>

        {records.map((record) => (
          <div
            key={record.id}
            className="record-card"
            onClick={() => navigate(`/record/${record.id}`)}
          >
            <div className="record-icon">📋</div>
            <div className="record-content">
              <div className="record-date">
                <strong>{record.date}</strong>
                <p>{record.doctor}</p>
              </div>
              <div className="record-preview">
                <p>
                  <strong>Subjetivo:</strong>
                </p>
                <p>{record.subjective.substring(0, 80)}...</p>
                <p>
                  <strong>Avaliação:</strong>
                </p>
                <p className="assessment-text">{record.assessment}...</p>
              </div>
              <div className="record-badges">
                <span className="badge badge-soap">{record.method}</span>
                <span className="badge badge-complete">{record.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
