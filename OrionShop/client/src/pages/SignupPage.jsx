import React, { useState, useContext, useEffect } from "react";
import SignupPageStyle from "../styles/SignupPageStyle.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBarContext } from "../components/NavBarContext";
import NavBar from "../components/NavBar.jsx";

const SignupPage = () => {
    const navigate = useNavigate();
    const { loggedAccount } = useContext(NavBarContext);

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (loggedAccount) {
            navigate("/");
        } else {
            navigate("/signup");
        }
    }, [loggedAccount, navigate]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const checkUsername = () => {
        const usernameRegEx = /^[a-zA-Z0-9_]{8,}$/;
        if (username !== "") {
            if (usernameRegEx.test(username)) {
                setUsername(username);
                return true;
            } else {
                setError("Username must have at least 8 characters");
                return false;
            }
        } else {
            setError("Username is required!");
            return false;
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const checkEmail = () => {
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email !== "") {
            if (emailRegEx.test(email)) {
                setEmail(email);
                return true;
            } else {
                setError("E-mail is written incorrectly");
                return false;
            }
        } else {
            setError("E-mail is required!");
            return false;
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const checkPassword = () => {
        const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (password !== "") {
            if (passwordRegEx.test(password)) {
                setPassword(password);
                return true;
            } else {
                setError("Password must have at least 8 characters, at least 1 capital, 1 number, 1 symbol");
                return false;
            }
        } else {
            setError("Password is required!");
            return false;
        }
    };

    const onSignup = async () => {
        if (checkEmail() && checkPassword() && checkUsername()) {
            try {
                const response = await axios.post("http://localhost:3001/create/account", {
                    username: username,
                    email: email,
                    password: password
                });

                if (!response.data.unique) {
                    setError("Username or email is already taken.");
                    setEmail("")
                    setPassword("")
                    setUsername("")
                } else {
                    setSuccess("Account successfully created!");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (success) {
            setError("")
            const timer = setTimeout(() => {
                setSuccess("");
                navigate("/login");
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    return (
        <div>
            <NavBar />
            <div id="Center" style={SignupPageStyle}>
            <h1 id="Error">{error}</h1>
            <h1 id="Success">{success}</h1>
            <div id="SignupPage">
                <header><h1>Sign up</h1></header>
                <div className="Line" />
                <div id="Inputs">
                    <input type="text" id="username" placeholder="Username" onChange={(e) => handleUsername(e)} />
                    <input type="email" id="email" placeholder="E-mail" onChange={(e) => handleEmail(e)} />
                    <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" onChange={(e) => handlePassword(e)} />
                </div>
                <div id="Checkboxes">
                    <label className="container">
                        <input type="checkbox" onChange={() => toggleShowPassword()} />
                        <span className="checkmark" />Show password
                    </label>
                </div>
                <div id="Buttons">
                    <Link to="/login"><button>Cancel</button></Link>
                    <button id="signup" onClick={() => onSignup()}>Sign up</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignupPage;
