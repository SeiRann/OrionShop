import GamesViewStyle from "../styles/GamesViewStyle.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function GamesViewGrid() {
    const [fetchedGames,setFetchedGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const categories = ["All", "Action", "FPS", "RPG", "Singleplayer"];

    const [active, setActive] = useState(categories[0]); // Set the initial active category

    

    useEffect(() => {
        const filterGames = async () => {
            try {
                if (active === "All") {
                    const response = await axios.get("http://localhost:3001/games");
                    const gamesWithTag = response.data;
                    setFilteredGames(gamesWithTag)
                } else {
                    const response = await axios.get("http://localhost:3001/games");
                    const gamesWithTag = response.data.filter((game) =>
                        game.tags.includes(active)
                    );
                    setFilteredGames(gamesWithTag);
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        filterGames();
    }, [active, fetchedGames]);



    useEffect(() => {
        if(active == "All"){
            setFilteredGames(fetchedGames)
        } else {
            setFilteredGames(fetchedGames?.filter((game) => game.tags.includes(active)))
        }
    },[active])

    const handleCategoryClick = (category) => {
        setActive(category); // Update the active category when a button is clicked
    };

    return (
        <div id="GamesView">
            <div id="GamesViewCategories">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={active === category ? "active" : ""}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div id="GamesViewGrid">
                {
                    filteredGames?.map((game) => (
                        <div className="Game" key={game._id}>
                            <Link to={"/game/" + game._id}><img src={game.thumbnail} alt="" /></Link>
                            <Link to={"/game/" + game._id}><h3>{game.name}</h3></Link>
                            {game.price !== "Free" ? <h4>${game.price}</h4> : <h4>{game.price}</h4>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
