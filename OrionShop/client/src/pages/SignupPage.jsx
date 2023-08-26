import SignupPageStyle from "../styles/SignupPageStyle.scss"
import { Link } from "react-router-dom";

const SignupPage = () => {
    return(
        <div id="Center">
            <div id="SignupPage">
                <header><h1>Sign up</h1></header>
                <div className="Line" />
                <div id="Inputs">
                    <input type="text" id="username" placeholder="Username"/>
                    <input type="text" id="email" placeholder="E-mail"/>
                    <input type="password" id="password" placeholder="Password"/>
                </div>
                <div id="Checkboxes">
                    <label className="container">
                        <input type="checkbox"/>
                        <span className="checkmark" />Show password
                    </label>
                </div>
                <div id="Buttons">
                    <Link to="/login"><button>Cancel</button></Link>
                    <button id="signup">Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;