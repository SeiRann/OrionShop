import AccountPageStyle from "../styles/AccountPageStyle.scss"
import NavBar from "../components/NavBar"
import { useState,useContext } from "react";
import { NavBarContext } from "../components/NavBarContext";

export default function AccountPage(){
    const { loggedAccount } = useContext(NavBarContext);
    const categories = ["Details", "Owned Games", "Deletion"];
    const [active,setActive] = useState(categories[0]);

    const handleClick = (option) => {
        setActive(option)
    }

    const Details = () => {
        return(
            <div id="Details">
                <h1>Username: {loggedAccount.username}</h1>
                <h1>E-mail: {loggedAccount.email}</h1>
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
                
            </div>
        )
    }

    const InfoController = (active) => {
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