// LightModeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [loggedAccount, setLoggedAccount] = useState(JSON.parse(localStorage.getItem("account")),[]);
    const [cart, setCart] = useState([]);

    console.log(loggedAccount)
    const addToCart = (addedGame) => {
        if(!(cart.some((game) => game.id === addedGame.id))){
            setCart([...cart, addedGame]);
        }
    }

    const deleteFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    }


    return (
        <NavBarContext.Provider value={{loggedAccount, setLoggedAccount, addToCart,}}>
            {children}
        </NavBarContext.Provider>
    );
};
