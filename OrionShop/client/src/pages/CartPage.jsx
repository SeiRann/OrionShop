import NavBar from "../components/NavBar"
import CartPageStyle from "../styles/CartPageStyle.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios";

export default function CartPage(){

    const [fetchedGame, setFetchedGame] = useState();

    const fetchGame = async () => {
        try {
            const response = await axios.get("http://localhost:3001/games/64d236c0f179a0f313a2aa33");
            setFetchedGame(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGame();
    }, []);

    return(
        <div>
            <NavBar />
            <div id="CartPage">
                
                <header>
                    <h1>Cart</h1>
                    <div className="Line" />
                </header>
                <div id="CartContent">
                    <div id="CartItems">
                        <div className="CartItem">
                            <img src={fetchedGame?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGame?.name}</h2>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                        </div>
                        <div className="CartItem">
                            <img src={fetchedGame?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGame?.name}</h2>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                        </div>
                        <div className="CartItem">
                            <img src={fetchedGame?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGame?.name}</h2>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                        </div>
                        <div className="CartItem">
                            <img src={fetchedGame?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGame?.name}</h2>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                        </div>
                        <div className="CartItem">
                            <img src={fetchedGame?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGame?.name}</h2>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                        </div>
                        <div className="CartItem">
                            <img src={fetchedGame?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGame?.name}</h2>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                        </div>
                    </div>
                    <div id="Check">
                        <header>
                            <h1>Products</h1>
                            <div id="CheckLine" />
                        </header>
                        <div id="ProductsList">
                            <div className="Product">
                                <h3>{fetchedGame?.name}</h3>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                            <div className="Product">
                                <h3>{fetchedGame?.name}</h3>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                            <div className="Product">
                                <h3>{fetchedGame?.name}</h3>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                            <div className="Product">
                                <h3>{fetchedGame?.name}</h3>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                            <div className="Product">
                                <h3>{fetchedGame?.name}</h3>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                            <div className="Product">
                                <h3>{fetchedGame?.name}</h3>
                                {fetchedGame?.price !== "Free" ? <span>${fetchedGame?.price}</span>: <span>{fetchedGame?.price}</span>}
                            </div>
                            
                        </div>
                        <div id="CheckLine" />
                        <div id="Total">
                            <h2>Total: <span>$6.66</span></h2>
                        </div>
                        <div id="Buy">
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}