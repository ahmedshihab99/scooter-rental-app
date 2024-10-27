import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/MainLayout.css';
import MenuItemWithSub from '../reusableComponents/MenuItemWithSub';
import * as FaIcons from 'react-icons/fa';


const MainLayout = ({ user }) => {
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
              label="Admin"
              icon={FaIcons.FaCog}
              path="/admin"
              subItems={[
                { label: 'Management', path: '/admin/management', icon: FaIcons.FaCog },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label="Maps"
              icon={FaIcons.FaMap}
              path="/maps"
              subItems={[
                { label: 'Location', path: '/maps/location', icon: FaIcons.FaMapMarkerAlt },
                { label: 'Heat Map', path: '/maps/heat-map', icon: FaIcons.FaFire },
                { label: 'Countries', path: '/maps/countries', icon: FaIcons.FaGlobe },
                { label: 'Cities', path: '/maps/cities', icon: FaIcons.FaCity },
                { label: 'Areas', path: '/maps/areas', icon: FaIcons.FaDrawPolygon },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>


          <li>
            <MenuItemWithSub
              label="Marketing"
              icon={FaIcons.FaBullhorn} // Example: Bullhorn icon for marketing
              path="/marketing"
              subItems={[
                { label: 'Customers', path: '/marketing/customers', icon: FaIcons.FaUsers },
                { label: 'Rent List', path: '/marketing/rent-list', icon: FaIcons.FaClipboardList },
                { label: 'Subscribe', path: '/marketing/subscribe', icon: FaIcons.FaEnvelopeOpenText },
                { label: 'Promo', path: '/marketing/promo', icon: FaIcons.FaTags },
                { label: 'Vouchers', path: '/marketing/vouchers', icon: FaIcons.FaTicketAlt },
                { label: 'Notifications', path: '/marketing/notifications', icon: FaIcons.FaBell },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>



          <li>
            <MenuItemWithSub
              label="Finance"
              icon={FaIcons.FaHandHoldingUsd}
              path="/finance"
              subItems={[
                { label: 'Transactions', path: '/finance/transactions', icon: FaIcons.FaMoneyBill },
                { label: 'Transfer List', path: '/finance/transfer-list', icon: FaIcons.FaHandHoldingUsd },
                { label: 'Refund List', path: '/finance/refund-list', icon: FaIcons.FaMoneyBill },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>


          <li>
            <MenuItemWithSub
              label="Dashboard"
              icon={FaIcons.FaTachometerAlt}
              path="/dashboard"
              subItems={[
                { label: 'Scooter Activities', path: '/dashboard/scooter-activities', icon: FaIcons.FaWrench },
                { label: 'Statistics', path: '/dashboard/statistics', icon: FaIcons.FaChartBar },
                { label: 'Active Scooters', path: '/dashboard/active-scooters', icon: FaIcons.FaMotorcycle },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label="HR"
              icon={FaIcons.FaUser}
              path="/human-resources"
              subItems={[
                { label: 'Staff', path: '/human-resources/staff', icon: FaIcons.FaUsers },
                { label: 'Staff Rides', path: '/human-resources/staff-rides', icon: FaIcons.FaCarSide },
                { label: 'Roles', path: '/human-resources/roles', icon: FaIcons.FaUserTie },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label="Rent"
              icon={FaIcons.FaClipboardList}
              path="/rent"
              subItems={[
                { label: 'Rent List', path: '/rent/rent-list', icon: FaIcons.FaClipboardList },
                { label: 'Statistics', path: '/rent/statistics', icon: FaIcons.FaChartBar },
                { label: 'Activities', path: '/rent/activities', icon: FaIcons.FaWrench },
              ]}
              isCollapsed={isCollapsed}
            />
          </li>

          <li>
            <MenuItemWithSub
              label="Warehouse"
              icon={FaIcons.FaWarehouse}
              path="/warehouse"
              subItems={[
                { label: 'Scooters', path: '/warehouse/scooters', icon: FaIcons.FaMotorcycle },
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
