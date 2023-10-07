import { useState, useContext, useEffect } from "react";
import SignupPageStyle from "../styles/SignupPageStyle.scss"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBarContext } from "../components/NavBarContext";


const SignupPage = () => {
    const navigate = useNavigate();
   
    const {loggedAccount} = useContext(NavBarContext);

    const [showPassword, setShowPassword] = useState(false);
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    useEffect(() => {
        if(loggedAccount){
            navigate("/")
        } else {
            navigate("/signup")
        }
    },[])

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSignup = async () => {
        try{
            const response = await axios.post("http://localhost:3001/create/account", {
            username: username,
            email: email,
            password: password
            })

            if(!response.data.unique){
                alert("Username or email is already taken.");
            } else {
                alert("Account created successfully!");
                navigate("/login")
            }
        } catch(err){
            console.error(err);
        }
    }

    return(
        <div id="Center">
            <div id="SignupPage">
                <header><h1>Sign up</h1></header>
                <div className="Line" />
                <div id="Inputs">
                    <input type="text" id="username" placeholder="Username" onChange={(e) => handleUsername(e)}/>
                    <input type="text" id="email" placeholder="E-mail" onChange={(e) => handleEmail(e)}/>
                    <input type={ showPassword ? "text" : "password" } id="password" placeholder="Password" onChange={(e) => handlePassword(e)}/>
                </div>
                <div id="Checkboxes">
                    <label className="container">
                        <input type="checkbox" onChange={()=>toggleShowPassword()}/>
                        <span className="checkmark" />Show password
                    </label>
                </div>
                <div id="Buttons">
                    <Link to="/login"><button>Cancel</button></Link>
                    <button id="signup" onClick={() => onSignup()}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;