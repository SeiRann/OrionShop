import LoginPageStyle from "../styles/LoginPageStyle.scss"
import { Link } from "react-router-dom";

const LoginPage = () => {
    return(
        <div id="Center">
            <div id="LoginPage">
                <header><h1>Login</h1></header>
                <div className="Line" />
                <div id="Inputs">
                    <input type="text" id="username" placeholder="Username"/>
                    <input type="password" id="password" placeholder="Password"/>
                </div>
                <div id="Checkboxes">
                    <label className="container">
                        <input type="checkbox"/>
                        <span className="checkmark" />Show password
                    </label>
                    <label className="container">
                        <input type="checkbox"/>
                        <span className="checkmark" />Remember me
                    </label>
                </div>
                <div id="Buttons">
                    <Link to="/signup"><button id="signup">Sign up</button></Link>
                    <button id="login">Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;