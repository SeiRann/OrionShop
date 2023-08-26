// LightModeContext.js
import React, { createContext, useContext, useState } from 'react';

export const LightModeContext = createContext();

export const LightModeProvider = ({ children }) => {
    const [lightMode, setLightMode] = useState(false);

    const toggleLightMode = () => {
        if(lightMode == false){
            setLightMode(true);
        } else {
            setLightMode(false)
        }
    };

    return (
        <LightModeContext.Provider value={{ lightMode, toggleLightMode }}>
            {children}
        </LightModeContext.Provider>
    );
};
