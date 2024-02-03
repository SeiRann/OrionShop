// LightModeContext.js
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
    const [loggedAccount, setLoggedAccount] = useState(JSON.parse(localStorage.getItem("account")),[]);
    const [cart, setCart] = useState([]);
    

    
    console.log(cart)
    const addToCart = (addedGame) => {
        
        const isIdInCart = cart.includes(addedGame);
    
        
        if (!isIdInCart) {
            setCart(prevCart => [...prevCart, addedGame]); 
        }
    }
    

    const deleteFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    }

    const clearCart = () =>{
        setCart([])
    }

    const fetchGameByName = async (name) => {
        if(name){
            try{
                const response = await axios.get("http://localhost:3001/games/name/"+name)
                const result = response.data
                return result 
            } catch(err){
                console.log(err)
            }
        } else {
            return;
        }
    }

    const fetchGameById = async (id) => {
        if(id){
            try{
                const response = await axios.get("http://localhost:3001/games/"+id)
                const result = response.data
                return result 
            } catch(err){
                console.log(err)
            }
        } else {
            return;
        }
    }

    const fetchAllGames = async () => {
        try{
            const response = await axios.get("http://localhost:3001/games")
            const result = response.data
            return result
        } catch(err){
            console.log(err)
        }
    }


    return (
        <NavBarContext.Provider value={{cart,loggedAccount, setLoggedAccount, addToCart,deleteFromCart, clearCart, fetchGameByName, fetchGameById, fetchAllGames}}>
            {children}
        </NavBarContext.Provider>
    );
};
