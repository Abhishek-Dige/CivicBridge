import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchemeNavigatorPage from './pages/SchemeNavigatorPage';
import EligibilityFormPage from './pages/EligibilityFormPage';
import './styles/schemes.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schemes" element={<SchemeNavigatorPage />} />
          <Route path="/eligibility" element={<EligibilityFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;