import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/MainLayout.css';
import MenuItemWithSub from '../reusableComponents/MenuItemWithSub';
import * as FaIcons from 'react-icons/fa';
import { LanguageContext } from '../reusableComponents/locales/LanguageContext';
import AuthService from '../services/AuthService';
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner


const MainLayout = ({ onLogout }) => {
  // console.log(`This user is ${user.role}`)
  const { t, switchLanguage } = useContext(LanguageContext); // Access translate function from LanguageContext
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  const [subMenuOpen, setSubMenuOpen] = useState({}); // State for sub-menu toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for user dropdown
  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState(null); // Initialize user state

  const [error, setError] = useState("");



  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown element

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle the sidebar state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle user dropdown menu
  };

  const handleMenuClick = (menu, path) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] })); // Toggle sub-menu
    navigate(path); // Navigate to the menu path
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser || !currentUser.token) {
        navigate('/login'); // Redirect if no user or token
      } else {
        setUser(currentUser); // Set the user
      }
      setLoading(false); // Stop loading
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    // Show a spinner while loading
    return (
      <div className="loading-spinner">
        <ClipLoader color="#3498db" loading={loading} size={90} />
      </div>
    );
  }

  const handleLogout = async (e) => {
    try {
      AuthService.logout();
      onLogout();
      setError("");
      navigate("/login"); // Navigate to the main dashboard
    } catch (err) {
      setError("error logging out");
    }
  };
  



  return (
    <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Left Sidebar (Navbar) */}
      <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/images/techurity-logo.jpg" alt="Company Logo" className="company-logo" />
        </div>
        <ul className='sidebar-menu-items'>
          {/* Display only if the user is an admin */}
          {user?.role === "ADMIN" && (
            <li>
              <MenuItemWithSub
                label={t["dashboard"]}
                icon={FaIcons.FaTachometerAlt}
                path="/dashboard"
                subItems={[]}
                isCollapsed={isCollapsed}
              />
            </li>
          )}
          {/* Other menu items */}
          <li>
            <MenuItemWithSub
              label={t["maps"]}
              icon={FaIcons.FaMap}
              path="/maps"
              subItems={[
                // { label: t["location"], path: '/maps/location', icon: FaIcons.FaMapMarkerAlt },
                // { label: t["heat_map"], path: '/maps/heat-map', icon: FaIcons.FaFire },
                // { label: t["countries"], path: '/maps/countries', icon: FaIcons.FaGlobe },
                // { label: t["cities"], path: '/maps/cities', icon: FaIcons.FaCity },
                // { label: t["areas"], path: '/maps/areas', icon: FaIcons.FaDrawPolygon },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label={t["geofence"]}
              icon={FaIcons.FaDrawPolygon}
              path="/geofence"
              subItems={[

              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label={t["customers"]}
              icon={FaIcons.FaUserFriends}
              path="/customers"
              subItems={[
                { label: "Registery Page", path: 'customers/customers_registery_page', icon: FaIcons.FaClipboardList },
                // { label: t["heat_map"], path: '/maps/heat-map', icon: FaIcons.FaFire },

              ]}
              isCollapsed={isCollapsed}
            />
          </li>


          <li>
            <MenuItemWithSub
              label={t["finance"]}
              icon={FaIcons.FaHandHoldingUsd}
              path="/finance"
              subItems={[
                { label: t["billing"], path: '/finance/billing', icon: FaIcons.FaMoneyBill },
                // { label: t["transactions"], path: '/finance/transactions', icon: FaIcons.FaMoneyBill },
                // { label: t["transfer_list"], path: '/finance/transfer-list', icon: FaIcons.FaHandHoldingUsd },
                { label: t["refund_list"], path: '/finance/refund-list', icon: FaIcons.FaMoneyBill },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          {/* <li>
            <MenuItemWithSub
              label={t["marketing"]}
              icon={FaIcons.FaBullhorn}
              path="/marketing"
              subItems={[
                { label: t["customers"], path: '/marketing/customers', icon: FaIcons.FaUsers },
                { label: t["rent_list"], path: '/marketing/rent-list', icon: FaIcons.FaClipboardList },
                { label: t["subscribe"], path: '/marketing/subscribe', icon: FaIcons.FaEnvelopeOpenText },
                { label: t["promo"], path: '/marketing/promo', icon: FaIcons.FaTags },
                { label: t["vouchers"], path: '/marketing/vouchers', icon: FaIcons.FaTicketAlt },
                { label: t["notifications"], path: '/marketing/notifications', icon: FaIcons.FaBell },
              ]}
              isCollapsed={isCollapsed}
            />
          </li> */}

          <li>
            <MenuItemWithSub
              label={t["human_resources"] || "HR"}
              icon={FaIcons.FaUser}
              path="/human-resources"
              subItems={[
                { label: t["staff"], path: '/human-resources/staff', icon: FaIcons.FaUsers },
                { label: t["staff_rides"], path: '/human-resources/staff-rides', icon: FaIcons.FaCarSide },
                { label: t["roles"], path: '/human-resources/roles', icon: FaIcons.FaUserTie },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label={t["rent"]}
              icon={FaIcons.FaClipboardList}
              path="/rent"
              subItems={[
                { label: t["rent_list"], path: '/rent/rent-list', icon: FaIcons.FaClipboardList },
                { label: t["statistics"], path: '/rent/statistics', icon: FaIcons.FaChartBar },
                { label: t["activities"], path: '/rent/activities', icon: FaIcons.FaWrench },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label={t["warehouse"]}
              icon={FaIcons.FaWarehouse}
              path="/warehouse"
              subItems={[
                { label: t["scooters"], path: '/warehouse/scooters', icon: FaIcons.FaMotorcycle },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>
        </ul>
      </nav>

      {/* Right Content Area */}
      <div className="content">
        {/* Top Bar */}
        <header className="topbar">
          <FaIcons.FaBars className="menu-icon" onClick={toggleSidebar} color='white' /> {/* Menu icon in the top bar */}
          <select onChange={(e) => switchLanguage(e.target.value)} defaultValue="en">
            <option value="en">{t["english"]}</option>
            <option value="fr">{t["french"]}</option>
            <option value="ar">العربية</option>
            {/* Add more options as needed */}
          </select>
          <div className="user-info" onClick={toggleDropdown}>
            <img src={user?.icon || "/images/default-user.png"} alt="User Icon" className="user-icon" />
            <span className="username">{user?.firstName}</span>
          </div>

          {/* User dropdown menu */}
          {isDropdownOpen && (
            <div className="user-dropdown" ref={dropdownRef}>
              <Link to="/profile" className="dropdown-item">{t["my_profile"] || "My Profile"}</Link>
              <Link to="/settings" className="dropdown-item">{t["settings"] || "Settings"}</Link>
              <button onClick={handleLogout}>Logout</button>

            </div>
          )}
        </header>

        {/* Dynamic page content based on route */}
        <div className='outlet-body'>
          <Outlet /> {/* Routed pages render here */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;