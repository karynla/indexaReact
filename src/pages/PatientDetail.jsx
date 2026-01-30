import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patientsAPI, recordsAPI } from "../services/api";
import "./PatientDetail.css";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadPatientData();
  }, [id]);

  const loadPatientData = () => {
    patientsAPI
      .getById(id)
      .then((data) => {
        setPatient(data);
        setEditForm(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar paciente:", error);
        alert("Erro ao carregar dados do paciente");
      });

    recordsAPI.getByPatient(id).then(setRecords).catch(console.error);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm(patient);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await patientsAPI.update(id, editForm);
      setPatient(editForm);
      setIsEditing(false);
      alert("Paciente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar paciente. Tente novamente.");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      console.log("niciando exclusão do paciente:", id);
      console.log("Prontuários a excluir:", records);

      // Primeiro, deletar todos os prontuários do paciente
      if (records.length > 0) {
        console.log(`Excluindo ${records.length} prontuário(s)...`);

        for (const record of records) {
          console.log(`Excluindo prontuário ${record.id}...`);
          await recordsAPI.delete(record.id);
        }

        console.log("Todos os prontuários excluídos");
      }

      // Depois, deletar o paciente
      console.log("Excluindo paciente...");
      await patientsAPI.delete(id);
      console.log("Paciente excluído");

      alert("Paciente excluído com sucesso!");

      // Redirecionar para a lista de pacientes
      navigate("/");
    } catch (error) {
      console.error("Erro detalhado:", error);
      console.error("Erro message:", error.message);
      console.error("Erro stack:", error.stack);
      alert(`Erro ao excluir paciente: ${error.message}`);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleAddRecord = () => {
    navigate(`/record/new/${id}`);
  };

  if (!patient) return <div className="loading">Carregando...</div>;

  return (
    <div className="patient-detail-page">
      <div className="top-actions">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Voltar
        </button>
        <div className="action-buttons-top">
          <button className="btn-edit" onClick={handleEditToggle}>
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          <button
            className="btn-delete"
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="patient-header">
        <div className="patient-avatar-large">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)}
        </div>
        <div className="patient-header-info">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <h1>{patient.name}</h1>
          )}
          <p>
            {" "}
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={editForm.age}
                onChange={handleInputChange}
                className="edit-input-small"
              />
            ) : (
              patient.age
            )}{" "}
            anos •{" "}
            {isEditing ? (
              <select
                name="gender"
                value={editForm.gender}
                onChange={handleInputChange}
                className="edit-select"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            ) : (
              patient.gender
            )}
          </p>
        </div>
      </div>

      <div className="patient-meta">
        <p>
          📞{" "}
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editForm.phone}
              onChange={handleInputChange}
              className="edit-input-small"
            />
          ) : (
            patient.phone
          )}
        </p>
        {patient.lastVisit && <p>Última visita: {patient.lastVisit}</p>}
      </div>

      {isEditing && (
        <div className="edit-actions">
          <button className="btn-save" onClick={handleSaveEdit}>
            Salvar Alterações
          </button>
        </div>
      )}

      <div className="patient-stats-grid">
        <div className="stat-box">
          <h3>{records.length}</h3>
          <p>Prontuários</p>
        </div>
        <div className="stat-box">
          <h3>{patient.yearStart}</h3>
          <p>Ano de Início</p>
        </div>
      </div>

      <div className="records-section">
        <div className="records-header">
          <h2>Histórico de Prontuários</h2>
          <div className="records-header-actions">
            <span className="records-badge">{records.length} registros</span>
            <button className="btn-add-record" onClick={handleAddRecord}>
              Novo Prontuário
            </button>
          </div>
        </div>

        {records.length === 0 ? (
          <p className="no-records">Nenhum prontuário encontrado</p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="record-card"
              onClick={() => navigate(`/record/${record.id}`)}
            >
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
          ))
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Confirmar Exclusão</h2>
            <p>
              Tem certeza que deseja excluir o paciente{" "}
              <strong>{patient.name}</strong>?
            </p>
            {records.length > 0 && (
              <p className="warning-text">
                Atenção: {records.length} prontuário(s) também será(ão)
                excluído(s)!
              </p>
            )}
            <p className="warning-text-danger">
              Esta ação não pode ser desfeita!
            </p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                className="btn-confirm-delete"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
