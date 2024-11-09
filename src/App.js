import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./components/pages/Dashboard/DashboardPage";
import UserMapPage from "./components/pages/UserMap/UserMapPage";
import StatisticsPage from "./components/pages/Statistics/StatisticsPage";
import FeedbackForm from "./components/pages/Feedback/FeedbackForm";
import Login from "./components/pages/Auth/Login";
import SignUp from "./components/pages/Auth/SignUp";
import MainLayout from "./components/layout/MainLayout";
import ScootersPage from "./components/pages/Scooters/ScootersPage";
import CustomersRegistryPage from ".//components/pages/Customers/CustomersRegistryPage"
import "./styles/global.css";
import { LanguageProvider } from "./components/reusableComponents/locales/LanguageContext"; // Import LanguageProvider

function App() {
  // Example user data (you can fetch this from an API or use authentication state)
  const [user, setUser] = useState({
    name: "Support",
    icon: "https://via.placeholder.com/50"  // Replace with user avatar URL
  });

  return (
    <LanguageProvider>  {/* Wrap everything inside LanguageProvider */}
      <Router>
        <Routes>
          {/* Public routes (outside of MainLayout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes inside the MainLayout */}
          <Route path="/" element={<MainLayout user={user} />}>
            <Route index element={<Navigate to="/maps" />} /> {/* Default page */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="maps" element={<UserMapPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="feedback" element={<FeedbackForm />} />
            <Route path="/warehouse/scooters" element={<ScootersPage />} />
            <Route path="/customers/customers_registery_page" element={<CustomersRegistryPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
