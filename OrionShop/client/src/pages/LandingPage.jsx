import NavBar from "../components/NavBar.jsx";
import Slider from "../components/Slider"
import GamesViewGrid from "../components/GamesViewGrid";
import LandingPageStyle from "../styles/LandingPageStyle.scss"

export default function LandingPage() {
    return(
        <div id="LandingPage">
            <NavBar />
            <Slider />
            <GamesViewGrid />
            
        </div>
    )
}