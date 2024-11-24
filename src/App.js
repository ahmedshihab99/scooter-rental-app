// App.js
// React and libraries
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate  } from "react-router-dom";

// Styles and assets
import "./styles/global.css";

// Components
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
import Geofence from "./components/pages/Geofence/Geofencing";

// Contexts and services
import { LanguageProvider } from "./components/reusableComponents/locales/LanguageContext";
import AuthService from "./components/services/AuthService";

// Models
import User from "./components/Models/User";

// Utilities
import ClipLoader from "react-spinners/ClipLoader";

const Profile = React.lazy(() => import("./components/pages/Profile/Profile"));

const PublicRoute = ({ user, children }) => {
  return user?.token ? <Navigate to="/" /> : children;
};



function App() {


  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8900";

  const [user, setUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);

    if (!currentUser) {
      (async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/session_user`);
          const data = await response.json();
          const userData = User.fromJson(data);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      })();
    }
  }, []);


  const PublicRoute = ({ user, children }) => {
    return user && user.token ? <Navigate to="/" /> : children;
  };
  

  const handleLogout = () => {
    setUser(null); // Clear user state
  };


  
  

  const LazyWrapper = ({ children }) => (
    <Suspense
      fallback={
        <div className="loading-spinner">
          <ClipLoader color="#3498db" size={90} />
        </div>
      }
    >
      {user ? children : <div>Loading user data...</div>}
    </Suspense>
  );
  


  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public routes (outside of MainLayout) */}
          <Route
            path="/login"
            element={
              <PublicRoute user={user}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute user={user}>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          {/* Protected routes inside the MainLayout */}
          <Route path="/" element={<MainLayout user={user} onLogout={handleLogout}  />}>
            <Route index element={<Navigate to="/maps" />} /> {/* Default page */}
            <Route path="/profile" element={<LazyWrapper><Profile user={user} /></LazyWrapper>} />
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
