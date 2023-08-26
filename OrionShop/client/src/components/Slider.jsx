import SliderStyle from "../styles/SliderStyle.scss";
import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Slider (){
    const [fetchedGames, setFetchedGames] = useState([]);
    const [counter, setCounter] = useState(0);
    const [activeOptionIndex, setActiveOptionIndex] = useState(counter);
    

    const fetchGames = async () => {
        try {
            const results = await axios.get("http://localhost:3001/games")
            setFetchedGames(results.data);
            
        } catch (error){
            console.log(error)
        }
    }
    

    useEffect(()=>{
        fetchGames()
    },[])

    const onClickLeft = () => {
        const newIndex = (activeOptionIndex - 1 + fetchedGames?.length) % fetchedGames?.length;
        setActiveOptionIndex(newIndex);
        if (counter - 1 < 0) {
            setCounter(fetchedGames?.length - 1);
        } else {
            setCounter(counter - 1);
        }
    };
    
    const onClickRight = () => {
        const newIndex = (activeOptionIndex + 1) % fetchedGames?.length;
        setActiveOptionIndex(newIndex);
        if (counter + 1 >= fetchedGames?.length) {
            setCounter(0);
        } else {
            setCounter(counter + 1);
        }
    };

    const handleOptionClick = (e) => {
        setCounter(e)
        setActiveOptionIndex(e)
    }
    


    return(
        <div id="Slider" key={fetchGames[counter]?._id}>
            <header><h1>Featured</h1></header>
            <div id="Content" key={fetchGames[counter]?._id}>
                <svg onClick={onClickLeft} id="left"xmlns="http://www.w3.org/2000/svg" width="26" height="52" viewBox="0 0 26 52" fill="none">
                    <path d="M24 3.68893L2.10179 26L24 48.3111L24 3.68893Z" fill="#CBCDBC" stroke="#3F3A3E" strokeWidth="3"/>
                </svg>
                <div id="FeaturedContent" key={fetchGames[counter]?._id}>
                    <Link to={"/game/" + fetchedGames[counter]?._id}><img src={fetchedGames[counter]?.thumbnail} alt="" /></Link>
                    <div id="SideContent">
                        {fetchedGames[counter]?.name.length > 20? 
                        <Link to={"/game/" + fetchedGames[counter]?._id}><h1>{fetchedGames[counter]?.name.slice(0,20)}...</h1></Link>
                        : 
                        <Link to={"/game/" + fetchedGames[counter]?._id}><h1>{fetchedGames[counter]?.name}</h1></Link>
                        }
                        <div id="SideContentGrid" key={fetchGames[counter]?._id}>
                            <Link to={"/game/" + fetchedGames[counter]?._id}><img src={fetchedGames[counter]?.gallery[0]} alt="" /></Link>
                            <Link to={"/game/" + fetchedGames[counter]?._id}><img src={fetchedGames[counter]?.gallery[1]} alt="" /></Link>
                            <Link to={"/game/" + fetchedGames[counter]?._id}><img src={fetchedGames[counter]?.gallery[2]} alt="" /></Link>
                            <Link to={"/game/" + fetchedGames[counter]?._id}><img src={fetchedGames[counter]?.gallery[3]} alt="" /></Link>
                        </div>
                        <h2>Tags</h2>
                        <div id="SideContentTags" key={fetchGames[counter]?._id}>
                            {
                                fetchedGames[counter]?.tags.map((tag)=> (
                                    <span className="Tag" key={tag}>{tag}</span>
                                ))
                            }
                        </div>
                        {fetchedGames[counter]?.price !== "Free" ? <h3>${fetchedGames[counter]?.price}</h3>: <h3>{fetchedGames[counter]?.price}</h3>}
                    </div>
                </div>
                <svg onClick={onClickRight}id="right"xmlns="http://www.w3.org/2000/svg" width="26" height="52" viewBox="0 0 26 52" fill="none">
                    <path d="M2 3.68893L23.8982 26L2 48.3111L2 3.68893Z" fill="#CBCDBC" stroke="#3F3A3E" strokeWidth="3"/>
                </svg>
            </div>
            <div id="SliderOptions" key={fetchGames[counter]?._id}>
                {
                   fetchedGames.map((game,index) => (
                        <div key={index}
                        className={`Line ${index === activeOptionIndex ? 'active' : ''}`}
                        onClick={() => handleOptionClick(index)}></div>
                   ))
                }
            </div>
        </div>
    )
}