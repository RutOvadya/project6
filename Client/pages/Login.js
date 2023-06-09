import React, { useState } from "react";
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = () => {
        fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
      .then(response => {if(response.ok) {
                            return response.json();    
                        } else{
                           throw "Request failed!";    
                    }
        })
      .then(checkUser=> {if(checkUser.length==0){
                        throw "The name is not valid";
                    } else{
                        return checkUser[0];
                    }
        })
      .then(myUser=>{ 
        if(password==myUser.address.geo.lat.slice(-4))
        {
            return JSON.stringify(myUser);
        } else{
            throw "The password is not valid";
        }
    })
      .then(userJSON => { 
        window.localStorage.setItem("currentUser", userJSON);
        //debugger;
        window.location.href = "/"; // Redirect to the home page
     }) 
      .catch(error=>alert(""+error));

    }

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
            <button id="login" onClick={loginFunction}>Login</button>
            <footer className="footer">COPYRIGHT © 2023 BY AVITAL & RUT</footer>
        </div>
    );
    
   
}

