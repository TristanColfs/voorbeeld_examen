import React, { createContext, useReducer } from "react";
import { GlobalReducer } from "./GlobalReducer";
import { languages } from "./Language";

export const GlobalContext = new createContext();

export const GlobalContexProvider = ({ children }) => {
  const [Global, Global_Dispatch] = useReducer(GlobalReducer, {
    Language: languages.nl,
  });

  return (
    <GlobalContext.Provider value={{ Global, Global_Dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
