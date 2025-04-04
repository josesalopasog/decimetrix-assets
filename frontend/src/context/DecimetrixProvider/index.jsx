import DecimetrixContext from '../DecimetrixContext';

import { useState } from 'react';

const DecimetrixProvider = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  }

  return (
    <DecimetrixContext.Provider value={{
      isSideMenuOpen,
      setIsSideMenuOpen,
      toggleSideMenu,
    }}>
      {children}
    </DecimetrixContext.Provider>
  );
}

export default DecimetrixProvider;
