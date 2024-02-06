import NavBar from "../components/NavBar"
import CartPageStyle from "../styles/CartPageStyle.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { NavBarContext } from "../components/NavBarContext";

export default function CartPage(){

    const {cart, deleteFromCart, clearCart, fetchGameById} = useContext(NavBarContext)
    const [fetchedGames, setFetchedGames] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        cart?.forEach((game) => {
            fetchGameById(game)
                .then(data=>{
                    setFetchedGames((prevGames) => [...prevGames,data])
                })
                .catch(err=>console.log(err))
        })
        
        
    },[])

    useEffect(() => {
        let totalPrice = 0
        fetchedGames.forEach((game) => {
            console.log(game.price)
            if(game.price !== "Free"){
                totalPrice += parseFloat(game.price)
            }
        })

        setTotal(parseFloat(totalPrice.toFixed(2)))
    },[fetchedGames])

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
                        {fetchedGames?.map((game) => (
                            <div className="CartItem">
                                <img src={game.thumbnail} alt="" />
                                <div className="CartItemDetails">
                                    <h2>{game.name}</h2>
                                    {game.price !=="Free"? <span>${game.price}</span>:<span>{game.price}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="Check">
                        <header>
                            <h1>Products</h1>
                            <div id="CheckLine" />
                        </header>
                        <div id="ProductsList">
                            {fetchedGames?.map((game) => (
                                <div className="Product">
                                    <h3>{game.name}</h3>
                                    {game.price !== "Free" ? <span>${game.price}</span>: <span>{game.price}</span>}
                                </div>  
                            ))}
                        </div>
                        <div id="CheckLine" />
                        <div id="Total">
                            <h2>Total: ${total}</h2>
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