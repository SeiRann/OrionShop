import NavBar from "../components/NavBar"
import CartPageStyle from "../styles/CartPageStyle.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { NavBarContext } from "../components/NavBarContext";

export default function CartPage(){

    const {cart, deleteFromCart, clearCart, fetchGameById} = useContext(NavBarContext)
    const [fetchedGames, setFetchedGames] = useState([]);

    // const fetchGame = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:3001/games/64d236c0f179a0f313a2aa33");
    //         setFetchedGames(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchGame();
    // }, []);

    useEffect(() => {
        cart?.forEach((game) => {
            fetchGameById(game)
                .then(data=>{
                    setFetchedGames((prevGames) => [...prevGames,data])
                })
                .catch(err=>console.log(err))
        })
        
        console.log(fetchedGames)
        console.log(cart)
    },[])

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
                        {/* <div className="CartItem">
                            <img src={fetchedGames?.thumbnail} alt="" />
                            <div className="CartItemDetails">
                                <h2>{fetchedGames?.name}</h2>
                                {fetchedGames?.price !== "Free" ? <span>${fetchedGames?.price}</span>: <span>{fetchedGames?.price}</span>}
                            </div>
                        </div> */}
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
                            <div className="Product">
                                <h3>{fetchedGames?.name}</h3>
                                {fetchedGames?.price !== "Free" ? <span>${fetchedGames?.price}</span>: <span>{fetchedGames?.price}</span>}
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