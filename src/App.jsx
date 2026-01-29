import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientsList from "./pages/PatientsList";
import PatientDetail from "./pages/PatientDetail";
import RecordDetail from "./pages/RecordDetail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientsList />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path="/record/:id" element={<RecordDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
