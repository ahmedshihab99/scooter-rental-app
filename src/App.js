import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminPage from "./components/pages/Admin/AdminPage";
import UserMapPage from "./components/pages/UserMap/UserMapPage";
import StatisticsPage from "./components/pages/Statistics/StatisticsPage";
import FeedbackForm from "./components/pages/Feedback/FeedbackForm";
import Login from "./components/pages/Auth/Login";
import SignUp from "./components/pages/Auth/SignUp";
import MainLayout from "./components/layout/MainLayout";  // Main layout with static sidebar and topbar
import ScootersPage from "./components/pages/Scooters/ScootersPage";
import "./styles/global.css";

function App() {
  // Example user data (you can fetch this from an API or use authentication state)
  const [user, setUser] = useState({
    name: "Support" ,
    icon: "https://via.placeholder.com/50"  // Replace with user avatar URL
  });

  return (
    <Router>
      <Routes>
        {/* Public routes (outside of MainLayout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes inside the MainLayout */}
        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={<Navigate to="/maps" />} /> {/* Default page */}
          <Route path="admin" element={<AdminPage />} />
          <Route path="maps" element={<UserMapPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="/warehouse/scooters" element={<ScootersPage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

