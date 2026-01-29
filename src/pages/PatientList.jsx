import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientsAPI } from "../services/api";
import "./PatientList.css";

export default function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    setLoading(true);
    patientsAPI
      .getAll()
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar pacientes:", error);
        alert("❌ Erro ao carregar lista de pacientes");
        setLoading(false);
      });
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePatientClick = (id) => {
    navigate(`/patient/${id}`);
  };

  const handleNewPatient = () => {
    navigate("/patient/new");
  };

  if (loading) {
    return <div className="loading">Carregando pacientes...</div>;
  }

  return (
    <div className="patient-list-page">
      <div className="header">
        <div className="header-content">
          <div>
            <img src="/indexaIcon.jpeg" alt="logo indexa" width="80px" />
            <h1>Indexa - Prontuários SOAP</h1>
            <p className="subtitle">Gerenciamento de Pacientes e Prontuários</p>
          </div>
          <button className="btn-new-patient" onClick={handleNewPatient}>
            ➕ Novo Paciente
          </button>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Buscar paciente por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="stats">
          <span className="stat-badge">
            {filteredPatients.length} paciente(s)
          </span>
        </div>
      </div>

      <div className="patients-container">
        {filteredPatients.length === 0 ? (
          <div className="no-patients">
            <p>😔 Nenhum paciente encontrado</p>
            {searchTerm && (
              <p className="search-tip">
                Tente buscar por outro nome ou limpe a busca
              </p>
            )}
          </div>
        ) : (
          <div className="patients-grid">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="patient-card"
                onClick={() => handlePatientClick(patient.id)}
              >
                <div className="patient-avatar">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)}
                </div>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p className="patient-details">
                    {patient.age} anos • {patient.gender}
                  </p>
                  <p className="patient-phone">📞 {patient.phone}</p>
                  {patient.lastVisit && (
                    <p className="patient-last-visit">
                      📅 Última visita: {patient.lastVisit}
                    </p>
                  )}
                </div>
                <div className="patient-badge">{patient.yearStart}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
