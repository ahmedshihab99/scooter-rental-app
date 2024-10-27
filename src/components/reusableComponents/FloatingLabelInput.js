import React, { useState } from 'react';
import '../styles/FloatingLabelInput.css';

const FloatingLabelInput = ({ label, type, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="floating-label-input">
      <label
        className={`floating-label ${isFocused || value ? 'focused' : ''}`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="input-field"
        required
      />
    </div>
  );
};

export default FloatingLabelInput;
