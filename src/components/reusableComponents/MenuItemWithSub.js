import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';

const MenuItemWithSub = ({ label, icon: Icon, path, subItems, isCollapsed }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setSubMenuOpen((prev) => !prev);
  };

  return (
    <li>
      <div className="menu-item-with-sub" onClick={handleMenuClick}>
        <Link className="menu-item-with-sub-link" to={path}>
          <Icon className="menu-icon" /> {!isCollapsed && label}
        </Link>
        {!isCollapsed && (
          <FaAngleDown
            className={`arrow-icon ${subMenuOpen ? 'open' : ''}`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent link navigation
              setSubMenuOpen((prev) => !prev);
            }}
          />
        )}
      </div>

      {/* Subitems toggle based on state */}
      {subMenuOpen && (
        <ul className="sub-menu">
          {subItems.map((item, index) => (
            <li key={index}>
              <Link className="sub-menu-link" to={item.path}>
                {/* Check if icon is provided before rendering it */}
                {item.icon && <item.icon className="sub-menu-icon" />}
                {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItemWithSub;
