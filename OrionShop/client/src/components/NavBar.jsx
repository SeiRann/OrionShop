import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { NavBarContext } from "./NavBarContext";
import cartIcon from "../assets/shopping-cart.png";
import accountDark from "../assets/accountDark.png";
import NavBarStyle from "../styles/NavBarStyle.scss";


const NavBar = () => {
    const { loggedAccount, fetchGameByName,cart } = useContext(NavBarContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [visible, setVisible] = useState("none");
    const [fetchedGames, setFetchedGames] = useState([]);
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
       fetchGameByName(searchTerm)
            .then(data => {
                setFetchedGames(data)
            })
            .catch(err=> console.log(err))
        
        
    }, [searchTerm])
    
    useEffect(()=>{
        setCounter(cart.length)
    },[cart])

    const onChangeEvent = (e) => {
        if (e.target.value === "") {
            setSearchTerm("");
            setVisible("none");
        } else {
            setSearchTerm(e.target.value);
            setVisible("flex");
        }
    };

    
    const handleAccount = () =>{
        if(loggedAccount){
            navigate("/account")
        } else{
            navigate("/login")
        }
    }


   

    return (
        <div id="NavBar">
            <h1 onClick={() => navigate("/")}>Orion</h1>
            <div>
                <input type="text" placeholder="Search..." onChange={(e) => onChangeEvent(e)} />
                <div id="SearchMenu" style={{ display: visible }}>
                    {fetchedGames?.map((game) => (
                        <div className="SearchMenuItem" key={game._id}>
                            <div className="SuggestionIcon">
                                <img src={game.thumbnail} alt="" />
                                {game.name.length > 30 ? (
                                    <h1
                                        onMouseEnter={(e) => (e.target.style.color = "#729397")}
                                        onMouseLeave={(e) => (e.target.style.color = "#231A22")}
                                    >
                                        <Link to={"/game/" + game._id}>{game.name.slice(0, 30)}...</Link>
                                    </h1>
                                ) : (
                                    <h1
                                        onMouseEnter={(e) => (e.target.style.color = "#729397")}
                                        onMouseLeave={(e) => (e.target.style.color = "#231A22")}
                                    >
                                        <Link to={"/game/" + game._id}>{game.name}</Link>
                                    </h1>
                                )}
                            </div>
                            {game.price !== "Free" ? <p>${game.price}</p> : <p>{game.price}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div id="NavBarButtons">
                {counter>0?<div id="CartIndicator">{counter}</div>:<div id="CartIndicator" style={{display:"none"}}></div>}
                {loggedAccount? <img
                    src={cartIcon}
                    alt="MoonIcon"
                    onClick={() => {
                        navigate("/cart")
                    }}
                />:
                null}
                {loggedAccount ? <h1 id="loggedAccount" onClick={()=>handleAccount()}>{loggedAccount?.username}</h1>:<img src={accountDark} alt="AccountDarkIcon" onClick={() => handleAccount()}/>}
            </div>
        </div>
    );
};

export default NavBar;