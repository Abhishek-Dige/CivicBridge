import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchemeNavigatorPage from './pages/SchemeNavigatorPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import EligibilityFormPage from './pages/EligibilityFormPage';
import CitizenDashboard from './pages/CitizenDashboard';
import ReportIssuePage from './pages/ReportIssuePage';
import ComplaintsPage from './pages/ComplaintsPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import LoginPage from './pages/LoginPage';
import { ComplaintsProvider } from './context/ComplaintsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/schemes.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ComplaintsProvider>
          <div className="app-container">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/schemes" element={<SchemeNavigatorPage />} />
              <Route path="/scheme/:id" element={<SchemeDetailsPage />} />
              <Route path="/eligibility" element={<EligibilityFormPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Citizen Portal routes */}
              <Route path="/citizen/dashboard" element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>} />
              <Route path="/citizen/report" element={<ProtectedRoute><ReportIssuePage /></ProtectedRoute>} />
              <Route path="/citizen/complaints" element={<ProtectedRoute><ComplaintsPage /></ProtectedRoute>} />
              <Route path="/citizen/complaints/:id" element={<ProtectedRoute><ComplaintDetailsPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </ComplaintsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;