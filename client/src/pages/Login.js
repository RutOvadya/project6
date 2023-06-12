import React, { useState } from "react";
import './Login.css';
import register from "./Register";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export default function Login() {
    const API_URL = 'http://localhost:3000';
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = async() => {
        try {
            const response = await fetch(
              `${API_URL}/usersR/${username}/${password}`,
              { method: 'GET'}
            );
            console.log(response);
            if (response.ok) {
              const userAndPassword = await response.json();
              if (userAndPassword === null) {
                throw new Error("The user is not exist");
              }
              return userAndPassword;
            } else {
              throw new Error("Request failed!");
            }
          } catch (error) {
            alert("" + error);
          }
    };
    
    const loginAndSaveToLS = async() => {
        const userAndPassword = await loginFunction();
        const username= userAndPassword.username_password.name;
        try {
            const response = await fetch(
              `${API_URL}/users/${username}`,
              { method: 'GET'}
            );
            console.log(response);
            if (response.ok) {
              const currentUser = await response.json();
              if (currentUser === null) {
                throw new Error("The user is not exist");
              }
              window.localStorage.setItem("currentUser", JSON.stringify(currentUser.user));
              window.location.href = "/"; // Redirect to the home page
            } else {
                console.log(`${API_URL}/users/${username}`,response);
              throw new Error("Request failed!");
            }
          } catch (error) {
            alert("" + error);
          }
    };

    return(
        <div id="loginContainer">
            <h1 id="welcome">WELCOME</h1>
            <form>
                <label className="label" htmlFor="name">name: </label>
                <input className="box" type="text" id="username" name="name" required
                placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label className="label" htmlFor="password"> password: </label>
                <input className="box" type="text" id="password" name="password" required
                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </form>               
            <button id="login" onClick={loginAndSaveToLS}>Login</button>
            <p>
                <span>New User? Click here to  <Link to="/register">Register</Link></span>
            </p>     
            <footer className="footer">COPYRIGHT © 2023 BY NOA & RUT</footer>
        </div>
    );
    
   
}

