// LightModeContext.js
import React, { createContext, useContext, useState } from 'react';

export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [lightMode, setLightMode] = useState(false);
    const [loggedAccount, setLoggedAccount] = useState();

    const toggleLightMode = () => {
        if(lightMode == false){
            setLightMode(true);
        } else {
            setLightMode(false);
        }
    };

    return (
        <NavBarContext.Provider value={{ lightMode, toggleLightMode, loggedAccount, setLoggedAccount}}>
            {children}
        </NavBarContext.Provider>
    );
};
