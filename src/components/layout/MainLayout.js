import React, { useState, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/MainLayout.css';
import MenuItemWithSub from '../reusableComponents/MenuItemWithSub';
import * as FaIcons from 'react-icons/fa';
import { LanguageContext } from '../reusableComponents/locales/LanguageContext';



const MainLayout = ({ user }) => {
  const { t, switchLanguage  } = useContext(LanguageContext); // Access translate function from LanguageContext

  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  const [subMenuOpen, setSubMenuOpen] = useState({}); // State for sub-menu toggle
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle the sidebar state
  };

  const handleMenuClick = (menu, path) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] })); // Toggle sub-menu
    navigate(path); // Navigate to the menu path
  };

  return (
    <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Left Sidebar (Navbar) */}
      <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/images/techurity-logo.jpg" alt="Company Logo" className="company-logo" />
        </div>
        <ul className='sidebar-menu-items'>
          {/* Admin */}
          <li>
            <MenuItemWithSub
              label={t["dashboard"]}
              icon={FaIcons.FaTachometerAlt}
              path="/dashboard"
              subItems={[
                { label: t["scooter_activities"], path: '/dashboard/scooter-activities', icon: FaIcons.FaWrench },
                { label: t["statistics"], path: '/dashboard/statistics', icon: FaIcons.FaChartBar },
                { label: t["active_scooters"], path: '/dashboard/active-scooters', icon: FaIcons.FaMotorcycle },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>
  
          <li>
            <MenuItemWithSub
              label={t["maps"]}
              icon={FaIcons.FaMap}
              path="/maps"
              subItems={[
                { label: t["location"], path: '/maps/location', icon: FaIcons.FaMapMarkerAlt },
                { label: t["heat_map"], path: '/maps/heat-map', icon: FaIcons.FaFire },
                { label: t["countries"], path: '/maps/countries', icon: FaIcons.FaGlobe },
                { label: t["cities"], path: '/maps/cities', icon: FaIcons.FaCity },
                { label: t["areas"], path: '/maps/areas', icon: FaIcons.FaDrawPolygon },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>
          
          <li>
            <MenuItemWithSub
              label={t["customers"]}
              icon={FaIcons.FaPersonBooth}
              path="/customers"
              subItems={[
                { label: "Registery Page", path: 'customers/customers_registery_page', icon: FaIcons.FaMapMarkerAlt },
                { label: t["heat_map"], path: '/maps/heat-map', icon: FaIcons.FaFire },
               
              ]}
              isCollapsed={isCollapsed}
            />
          </li>
  
          <li>
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
          </li>
  
          <li>
            <MenuItemWithSub
              label={t["finance"]}
              icon={FaIcons.FaHandHoldingUsd}
              path="/finance"
              subItems={[
                { label: t["transactions"], path: '/finance/transactions', icon: FaIcons.FaMoneyBill },
                { label: t["transfer_list"], path: '/finance/transfer-list', icon: FaIcons.FaHandHoldingUsd },
                { label: t["refund_list"], path: '/finance/refund-list', icon: FaIcons.FaMoneyBill },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>
  
          
  
          <li>
            <MenuItemWithSub
              label={t["human_resources"]}
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
          <div className="user-info">
            <img src={user.icon} alt="User Icon" className="user-icon" />
            <span className="username">{user.name}</span>
          </div>
          
        </header>
  
        {/* Dynamic page content based on route */}
        <main>
          <Outlet /> {/* Routed pages render here */}
        </main>
      </div>
    </div>
  );
  
};

export default MainLayout;
