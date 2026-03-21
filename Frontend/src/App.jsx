import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchemeNavigatorPage from './pages/SchemeNavigatorPage';
import EligibilityFormPage from './pages/EligibilityFormPage';
import CitizenDashboard from './pages/CitizenDashboard';
import ReportIssuePage from './pages/ReportIssuePage';
import ComplaintsPage from './pages/ComplaintsPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import { ComplaintsProvider } from './context/ComplaintsContext';
import './styles/schemes.css';

function App() {
  return (
    <Router>
      <ComplaintsProvider>
        <div className="app-container">
          <Routes>
            {/* Existing routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/schemes" element={<SchemeNavigatorPage />} />
            <Route path="/eligibility" element={<EligibilityFormPage />} />

            {/* Citizen Portal routes */}
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/report" element={<ReportIssuePage />} />
            <Route path="/citizen/complaints" element={<ComplaintsPage />} />
            <Route path="/citizen/complaints/:id" element={<ComplaintDetailsPage />} />
          </Routes>
        </div>
      </ComplaintsProvider>
    </Router>
  );
}

export default App;