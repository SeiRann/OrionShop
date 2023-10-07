// LightModeContext.js
import React, { createContext, useContext, useState } from 'react';

export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [lightMode, setLightMode] = useState(false);
    const [loggedAccount, setLoggedAccount] = useState(JSON.parse(localStorage.getItem("account")),[]);
    const [cart, setCart] = useState([]);

    const addToCart = (addedGame) => {
        if(!(cart.some((game) => game.id === addedGame.id))){
            setCart([...cart, addedGame]);
        }
    }

    const deleteFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    }

    const toggleLightMode = () => {
        if(lightMode == false){
            setLightMode(true);
        } else {
            setLightMode(false);
        }
    };

    return (
        <NavBarContext.Provider value={{ lightMode, toggleLightMode, loggedAccount, setLoggedAccount, addToCart,}}>
            {children}
        </NavBarContext.Provider>
    );
};
