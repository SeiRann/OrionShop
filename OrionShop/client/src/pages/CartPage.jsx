import NavBar from "../components/NavBar"
import CartPageStyle from "../styles/CartPageStyle.scss"
import close from "../assets/close.png"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBarContext } from "../components/NavBarContext";

export default function CartPage(){

    const {cart, deleteFromCart, clearCart, fetchGameById, loggedAccount} = useContext(NavBarContext)
    const [fetchedGames, setFetchedGames] = useState([]);
    const [total, setTotal] = useState(0);
    const [id, setId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        cart?.forEach((game) => {
            fetchGameById(game)
                .then(data=>{
                    setFetchedGames((prevGames) => [...prevGames,data])
                })
                .catch(err=>console.log(err))
        })
        
        setId(loggedAccount._id)
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

    const onBuy = () => {
        let gameIds = []
        fetchedGames.forEach((game)=>gameIds.push(game._id))
        try{
            axios({
                method:"put",
                url:"http://localhost:3001/account/buyGame/"+id,
                data:{
                    games:gameIds
                },
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response=>{
                console.log(response.data);
            })
            .catch(err => {
                console.error(err)
            })
        }catch(err){
            console.log(err)
        }
        clearCart()
        navigate("/")
    }

    const onClose = (e) =>{
        deleteFromCart(e.target._id)
        
    }

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
                                <img id="Close" src={close} alt="" onClick={(e)=>onClose(e)}/>
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
                            <button onClick={()=>onBuy()}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}