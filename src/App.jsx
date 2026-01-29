import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewRecord from "./pages/NewRecord";
import PatientDetail from "./pages/PatientDetail";
import PatientList from "./pages/PatientsList";
import RecordDetail from "./pages/RecordDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path="/record/new/:patientId" element={<NewRecord />} />
        <Route path="/record/:id" element={<RecordDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
