import AccountPageStyle from "../styles/AccountPageStyle.scss"
import NavBar from "../components/NavBar"
import { useState,useContext, useEffect } from "react";
import { NavBarContext } from "../components/NavBarContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AccountPage(){
    const navigate = useNavigate();

    const { loggedAccount, setLoggedAccount } = useContext(NavBarContext);
    const categories = ["Details", "Owned Games", "Deletion"];
    const [active,setActive] = useState(categories[0]);


    useEffect(() => {
        if(loggedAccount){
            
        } else {
            navigate("/")
        }
    },[])
    

    const handleClick = (option) => {
        setActive(option)
    }

    const handleSignOut = () => {
        localStorage.removeItem("account")
        setLoggedAccount(null)
        navigate("/")
    }

    const handleDeletion = (id) => {
        localStorage.removeItem("account")
        setLoggedAccount(null)
        axios.delete(`http://localhost:3001/account/${id}`)
        alert("Account Deleted!")
        navigate("/")
    }

    const Details = () => {
        return(
            <div id="Details">
                <h1>Username: {loggedAccount.username}</h1>
                <h1>E-mail: {loggedAccount.email}</h1>
                <button id="SignOutButton"onClick={handleSignOut}>Sign out</button>
            </div>
        )
    }  
    
    const OwnedGames = () => {
        return(
            <div id="OwnedGames">
                {
                    loggedAccount.ownedGame.map((game) => (
                        <div id="Game">
                            <img src={game.thumbnail} alt="" />
                            <h1>{game.name}</h1>
                        </div>
                    ))
                }
            </div>
        )
    }

    const Deletion = () => {
        return(
            <div id="Deletion">
                <h1>In this section you are able to permanently delete your account and never have access to this account ever again!!!</h1>
                <button onClick={() => handleDeletion(loggedAccount._id)}id="DeleteButton">Delete Account</button>
            </div>
        )
    }

    const InfoController = (active) => {
        if(loggedAccount){
            switch (active) {
                case "Details":
                    return <Details />;
                case "Owned Games":
                    return <OwnedGames />;
                case "Deletion":
                    return <Deletion />;
                default:
                    return null; // You can handle an unknown category here if needed.
            }
        } else {
            navigate("/")
        }
    }
    
    
    return(
        <div>
            <NavBar />
            <div id="AccountPage">
                <header><h1>Account</h1></header>
                <div id="Line" />
                <div id="AccountContent">
                    <div id="AccountOptions">
                        {
                            categories.map((option) => (
                                <button
                                    onClick={() => handleClick(option)}
                                    className={active === option ? "active" : ""}
                                >{option}</button>
                            ))
                        }
                    </div>
                    <div id="AccountInfo">
                        {InfoController(active)}
                    </div>
                </div>
            </div>
        </div>
    )
}