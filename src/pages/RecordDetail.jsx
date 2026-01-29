import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientsAPI, recordsAPI } from "../services/api";
import "./RecordDetail.css";

export default function RecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadRecordData();
  }, [id]);

  const loadRecordData = async () => {
    try {
      const recordData = await recordsAPI.getById(id);
      setRecord(recordData);
      setEditForm(recordData);

      const patientData = await patientsAPI.getById(recordData.patientId);
      setPatient(patientData);

      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar prontuário:", error);
      alert("❌ Erro ao carregar prontuário");
      navigate("/");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm(record);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await recordsAPI.update(id, editForm);
      setRecord(editForm);
      setIsEditing(false);
      alert("✅ Prontuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("❌ Erro ao atualizar prontuário");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await recordsAPI.delete(id);
      alert("✅ Prontuário excluído com sucesso!");
      navigate(`/patient/${patient.id}`);
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("❌ Erro ao excluir prontuário");
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="record-detail-page">
      <div className="record-header">
        <button
          className="back-btn"
          onClick={() => navigate(`/patient/${patient.id}`)}
        >
          ← Voltar
        </button>
        <div className="header-actions">
          <button className="btn-edit" onClick={handleEditToggle}>
            {isEditing ? "❌ Cancelar" : "✏️ Editar"}
          </button>
          <button className="btn-delete" onClick={handleDeleteClick}>
            🗑️ Excluir
          </button>
        </div>
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
            {patient.age} anos • {patient.gender} • 📅 {record.date}
          </p>
        </div>
      </div>

      <div className="record-content">
        <div className="record-meta">
          <span className="badge badge-soap">{record.method}</span>
          <span className="badge badge-status">{record.status}</span>
          <span className="doctor-name">👨‍⚕️ {record.doctor}</span>
        </div>

        {isEditing && (
          <div className="edit-actions-top">
            <button className="btn-save" onClick={handleSaveEdit}>
              💾 Salvar Alterações
            </button>
          </div>
        )}

        {/* SUBJETIVO */}
        <div className="soap-section">
          <h2>
            <span className="soap-letter">S</span> Subjetivo
          </h2>
          {isEditing ? (
            <textarea
              name="subjective"
              value={editForm.subjective}
              onChange={handleInputChange}
              rows="6"
            />
          ) : (
            <p>{record.subjective}</p>
          )}
        </div>

        {/* OBJETIVO */}
        <div className="soap-section">
          <h2>
            <span className="soap-letter">O</span> Objetivo
          </h2>
          {isEditing ? (
            <textarea
              name="objective"
              value={editForm.objective}
              onChange={handleInputChange}
              rows="6"
            />
          ) : (
            <p>{record.objective || "Não informado"}</p>
          )}
        </div>

        {/* AVALIAÇÃO */}
        <div className="soap-section">
          <h2>
            <span className="soap-letter">A</span> Avaliação
          </h2>
          {isEditing ? (
            <textarea
              name="assessment"
              value={editForm.assessment}
              onChange={handleInputChange}
              rows="4"
            />
          ) : (
            <p>{record.assessment}</p>
          )}
        </div>

        {/* PLANO */}
        <div className="soap-section">
          <h2>
            <span className="soap-letter">P</span> Plano
          </h2>
          {isEditing ? (
            <textarea
              name="plan"
              value={editForm.plan}
              onChange={handleInputChange}
              rows="6"
            />
          ) : (
            <p>{record.plan || "Não informado"}</p>
          )}
        </div>

        {/* MÉDICO RESPONSÁVEL */}
        {isEditing && (
          <div className="soap-section">
            <h2>👨‍⚕️ Médico Responsável</h2>
            <input
              type="text"
              name="doctor"
              value={editForm.doctor}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>

      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir este prontuário?</p>
            <p className="warning-text">Esta ação não pode ser desfeita!</p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                ❌ Cancelar
              </button>
              <button
                className="btn-confirm-delete"
                onClick={handleConfirmDelete}
              >
                ✔️ Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
