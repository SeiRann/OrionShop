import DarkGamePageStyle from "../styles/DarkGamePageStyle.scss"
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { LightModeContext } from "../components/LightModeContext";


export default function GamePage(){
    const { lightmode } = useContext(LightModeContext);
    const [game,setGame] = useState({});
    const [idd,setId] = useState();
    const { id } = useParams();
    const [galleryIndex, setGalleryIndex] = useState(0);

    const fetchGame = async (id) => {
        try{
            const result = await axios.get(`http://localhost:3001/games/${id}`)
            setGame(result.data)
        } catch(error) {
            console.log(error)
        }
    } 

    useEffect(()=>{
        lightmode ? setId("LightGamePage") : setId("GamePage");
        console.log(lightmode)
    },[lightmode])
    

    useEffect(() => {
        fetchGame(id)
    },[id])

    const handleClick = (index) => {
        setGalleryIndex(index)
    }

    return(
        <div>
            <NavBar />
            <div id={idd}>
                <header>
                    <h1>{game.name}</h1>
                </header>
                <div id="GameInfo">
                    <div id="GameGallery">
                        {game?.gallery && game.gallery[galleryIndex] && <img src={game.gallery[galleryIndex]} alt="" />}
                        <div id="GamePhotos">
                            {game?.gallery && game.gallery[0] && <img src={game.gallery[0]} alt="" onClick={() => handleClick(0)}/>}
                            {game?.gallery && game.gallery[1] && <img src={game.gallery[1]} alt="" onClick={() => handleClick(1)}/>}
                            {game?.gallery && game.gallery[2] && <img src={game.gallery[2]} alt="" onClick={() => handleClick(2)}/>}
                            {game?.gallery && game.gallery[3] && <img src={game.gallery[3]} alt="" onClick={() => handleClick(3)}/>}
                            {game?.gallery && game.gallery[4] && <img src={game.gallery[4]} alt="" onClick={() => handleClick(4)}/>}
                        </div>
                    </div>
                    <div id="GameSideInfo">
                        <img src={game.thumbnail} alt="" />
                        <div id="DevInfo">
                            <p>Developer: {game.developer}</p>
                            <p>Publisher: {game.publisher}</p>
                            <p>Release Date: {game.releaseDate}</p>
                        </div>
                        <h2>Tags</h2>
                        <div id="Tags">
                            {
                                game?.tags && game.tags.map((tag)=> (
                                    <span key={tag}>{tag}</span>
                                ))
                            }
                        </div>
                        <div id="Purchase">
                            <button>Add to cart</button>
                            {game.price !== "Free" ? <h3>${game.price}</h3> : <h3>{game.price}</h3> }
                        </div>
                    </div>
                </div>
                <div id="Description">
                    <h1>Description</h1>
                </div>
                <div id="Line" />
                <div id="DescriptionParagraph">
                    <p>{game.desc}</p>
                </div>
            </div>
        </div>
    )
}