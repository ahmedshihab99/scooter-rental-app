// App.js
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./components/pages/Profile/Profile";
import DashboardPage from "./components/pages/Dashboard/DashboardPage";
import UserMapPage from "./components/pages/UserMap/UserMapPage";
import StatisticsPage from "./components/pages/Statistics/StatisticsPage";
import FeedbackForm from "./components/pages/Feedback/FeedbackForm";
import Login from "./components/pages/Auth/Login";
import SignUp from "./components/pages/Auth/SignUp";
import MainLayout from "./components/layout/MainLayout";
import ScootersPage from "./components/pages/Scooters/ScootersPage";
import CustomersRegistryPage from "./components/pages/Customers/CustomersRegistryPage";
import Billing from "./components/pages/Finance/Billing/Billing";
import Geofence from "./components/pages/Geofence/Geofencing"
import "./styles/global.css";
import { LanguageProvider } from "./components/reusableComponents/locales/LanguageContext";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner
import User from "./components/Models/User";  // Import the User model
import AuthService from "./components/services/AuthService"


const Profile = React.lazy(() => import("./components/pages/Profile/Profile"));

function App() {


  const [user, setUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);



  const ProtectedRoute = ({ children }) => {
    if (!user || !user.token) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  


  useEffect(() => {
    // Simulating a fetch call to an API endpoint
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:8900/session_user"); // Correct API URL
        const data = await response.json();
        const userData = User.fromJson(data);  // Parse JSON into User model
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public routes (outside of MainLayout) */}
          {/*  Usage in Routes */}
          <Route path="/" element={<ProtectedRoute user={user}><MainLayout user={user} /></ProtectedRoute>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes inside the MainLayout */}
          <Route path="/" element={<MainLayout user={user} />}>
            {/* <Route path="/" element={<ProtectedRoute user={user}><MainLayout user={user} /></ProtectedRoute>}> */}
            <Route index element={<Navigate to="/maps" />} /> {/* Default page */}
            <Route
              path="/profile"
              element={
                <Suspense fallback={<div className="loading-spinner">
                  <ClipLoader color="#3498db" loading={!user} size={90} />
                </div>}>
                  <Profile user={user} />
                </Suspense>
              }
            /> {/* Pass user as prop */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="maps" element={<UserMapPage />} />
            <Route path="geofence" element={<Geofence />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="feedback" element={<FeedbackForm />} />
            <Route path="/warehouse/scooters" element={<ScootersPage />} />
            <Route path="/customers/customers_registery_page" element={<CustomersRegistryPage />} />
            <Route path="/finance/billing" element={<Billing />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
