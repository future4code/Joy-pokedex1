import React, { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {

    return (
        <GlobalContext.Provider value="">
            {children}
        </GlobalContext.Provider>
    )
};
