import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaceProvider, useFace } from './context/FaceContext';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Connections from './components/Connections';
import ConnectionHistory from './components/ConnectionHistory';
import PatientHUD from './components/PatientHUD';
import AdminPanel from './components/AdminPanel';
import './index.css';

// Wrapper to show loading state
const AppContent = () => {
  const { modelsLoaded } = useFace();

  if (!modelsLoaded) return <div className="flex items-center justify-center w-full h-screen text-xl font-bold">Initializing Neural Engine...</div>;

  return (
    <div className="relative flex flex-col w-full h-screen overflow-hidden bg-gray-50">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/history/:name" element={<ConnectionHistory />} />
        <Route path="/camera" element={<PatientHUD />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <FaceProvider>
        <AppContent />
      </FaceProvider>
    </Router>
  );
}

export default App;
