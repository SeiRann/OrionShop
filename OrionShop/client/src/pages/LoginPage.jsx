import LoginPageStyle from "../styles/LoginPageStyle.scss"
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavBarContext } from "../components/NavBarContext";
import NavBar  from "../components/NavBar";

const LoginPage = () => {
    const navigate = useNavigate();
    const { loggedAccount,setLoggedAccount } = useContext(NavBarContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    // const [text,setText] = useState("dsjhafjklsdjflk"); //the text
    // const encrypted = CryptoJS.MD5(text); // Encrypt the text (text -> hash)

    // useEffect(() => {
    //     console.log(encrypted.toString(CryptoJS.enc.Hex)); //make it a string
    // }, [])

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    useEffect(() => {
        if(loggedAccount){
            navigate("/")
        } else {
            navigate("/login")
        }
    },[])

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    //login: seiran //email: bo646ru@gmail.com //password: klfb1234

    const onLogin = async () => {
        if(username !== "" && password !== ""){
            try{
                const fetchedAccount = await axios.post("http://localhost:3001/login", {
                    username: username,
                    password: password
                });
                if(fetchedAccount.data.success) {
                    setSuccess("Logged in succesfully!")
                    setLoggedAccount(fetchedAccount.data.account);
                    if(rememberMe){
                        const accountData = JSON.stringify(fetchedAccount.data.account);
                        localStorage.setItem("account", accountData);
                    }
                } else {
                    setError("Wrong login credentials!")
                }
            } catch(err){
                console.log(err);
            }
        } else {
            setError("Login incomplete!")
        }
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
                navigate("/");
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [success, navigate]);


    return(
        <div>
            <NavBar />
            <div id="Center">
            <h1 id="Error">{error}</h1>
            <h1 id="Success">{success}</h1>
            <div id="LoginPage">
                
                <header><h1>Login</h1></header>
                <div className="Line" />
                <div id="Inputs">
                    <input type="text" id="username" placeholder="Username" onChange={(e) => handleUsername(e)}/>
                    <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" onChange={(e) => handlePassword(e)}/>
                </div>
                <div id="Checkboxes">
                    <label className="container">
                        <input type="checkbox" onChange={() => toggleShowPassword()}/>
                        <span className="checkmark" />Show password
                    </label>
                    <label className="container">
                        <input type="checkbox" onChange={() => toggleRememberMe()}/>
                        <span className="checkmark" />Remember me
                    </label>
                </div>
                <div id="Buttons">
                    <Link to="/signup"><button id="signup">Sign up</button></Link>
                    <button id="login" onClick={() => onLogin()}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default LoginPage;