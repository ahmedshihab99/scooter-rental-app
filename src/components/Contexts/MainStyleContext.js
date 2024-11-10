// MainStyleContext.js
import React, { createContext, useContext, useState } from 'react';

const MainStyleContext = createContext();

export const useMainStyle = () => useContext(MainStyleContext);

export const MainStyleProvider = ({ children }) => {
  const [mainStyle, setMainStyle] = useState({});

  return (
    <MainStyleContext.Provider value={{ mainStyle, setMainStyle }}>
      <main style={mainStyle}>
        {children}
      </main>
    </MainStyleContext.Provider>
  );
};
