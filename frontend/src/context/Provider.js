
import { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [userData, setUserData] = useState({});
  const [isLogged, setIsLogged] = useState(true);

  const contextValue = {
    userData,
    setUserData,
    isLogged,
    setIsLogged,
  };

  return (
    <AppContext.Provider value={contextValue}>
      { children }
    </AppContext.Provider>
  );
}

export default Provider;