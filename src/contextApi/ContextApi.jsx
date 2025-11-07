// ContextApi.jsx
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_TOKEN");
  const [token, setToken] = useState(getToken);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};
