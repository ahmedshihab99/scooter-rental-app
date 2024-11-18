// Profile.js
import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner
import "./Profile.css";

const ProfilePage = ({ user, onSaveName }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [originalFirstName, setOriginalFirstName] = useState(user.firstName);
  const [originalLastName, setOriginalLastName] = useState(user.lastName);

  // Toggle editing mode for name fields
  const handleEditClick = () => {
    setOriginalFirstName(firstName);
    setOriginalLastName(lastName);
    setIsEditingName(true);
  };

  // Cancel editing and revert changes
  const handleCancelClick = () => {
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    setIsEditingName(false);
  };

  // Handle name input changes
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // Save name changes
  const handleSaveClick = () => {
    onSaveName(firstName, lastName);
    setIsEditingName(false);
  };

  

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-info">
        <div className="input-fields">
          {/* Email - Read Only */}
        <div className="profile-field">
          <label>Email:</label>
          <input type="text" value={user.email} readOnly />
        </div>

        {/* First Name - Editable */}
        <div className="profile-field">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            readOnly={!isEditingName}
          />
        </div>

        {/* Last Name - Editable */}
        <div className="profile-field">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            readOnly={!isEditingName}
          />
        </div>

        {/* Billing ID - Read Only */}
        <div className="profile-field">
          <label>Billing ID:</label>
          <input type="text" value={user.billingId} readOnly />
        </div>

        {/* Total Rentals - Read Only */}
        <div className="profile-field">
          <label>Total Rentals:</label>
          <input type="text" value={user.totalRentals} readOnly />
        </div>

        {/* Total Rental Duration - Read Only */}
        <div className="profile-field">
          <label>Total Rental Duration:</label>
          <input type="text" value={user.totalRentalDuration} readOnly />
        </div>
          
        </div>
        

        {/* Save/Edit and Cancel Buttons */}
        <div className="profile-buttons">
          {isEditingName ? (
            <>
              <button onClick={handleSaveClick} className="save-button">Save</button>
              <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
            </>
          ) : (
            <button onClick={handleEditClick} className="edit-button">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
