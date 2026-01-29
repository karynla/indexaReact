import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientsAPI } from "../services/api";
import "./PatientsList.css";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    patientsAPI.getAll().then(setPatients).catch(console.error);
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="patients-page">
      <header className="header">
        <h1>Pacientes</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total de Pacientes</h3>
          <p className="stat-number">{patients.length}</p>
        </div>
        <div className="stat-card">
          <h3>Atendidos Hoje</h3>
          <p className="stat-number">2</p>
        </div>
      </div>

      <div className="patients-list">
        <h2>Lista de Pacientes</h2>
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="patient-card"
            onClick={() => navigate(`/patient/${patient.id}`)}
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
              <p>
                👤 {patient.age} anos • 📞 {patient.phone}
              </p>
              {patient.lastVisit && (
                <p className="last-visit">
                  📅 Última visita: {patient.lastVisit}
                </p>
              )}
            </div>
            <div className="patient-records">
              <span className="record-count">{patient.recordCount}</span>
              <span className="record-label">prontuários</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
