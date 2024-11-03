import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const onChange = (language) => {
    i18n.changeLanguage(language); // This should call the changeLanguage function
  };

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="en">English</option>
      <option value="ar">العربية</option>
      {/* Add other languages as needed */}
    </select>
  );
};

export default LanguageSelector;