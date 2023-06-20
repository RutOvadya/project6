import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
//import { withRouter } from "react-router-dom";
//import { useNavigate } from "react-router-dom";



//import login from "./pages/Login";

import './Login.css';

export default function Register() {
    const API_URL = 'http://localhost:3000';
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const doingRegister= async (user) =>{
      await fetch(
        `${API_URL}/usersR`,
        {method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body:JSON.stringify({
          username: user.username, 
          password: user.password
        }) })  
         .then(response => response.json())
         .then(data => {
           alert(data.message); // User created successfully
         })
         .catch(error => {
           alert('Error create todo:', error);
         });

        // try {
        //     console.log(user);
        //      await fetch(`${API_URL}/usersR`, {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({
        //             username: user.username, 
        //             password: user.password
        //           })
        //       }) .then(response => response.json())
        //       .then(data => {
        //         alert(data);// Response from the server
        //       })
        //     }
        //      catch (error) {
        //         alert("" + error);
        //       };
            };

    //  const getAllUsers= async () =>{
    //     try {
    //         const response = await fetch(
    //           `${API_URL}/users`,
    //            { method: 'GET'}
    //         );
    //         if (response.ok) {
    //           const listUsers = await response.json();
    //           if (listUsers.length === 0) {
    //             throw new Error("You have no Users");
    //           }
    //           console.log(listUsers);
    //           return listUsers;
    //         } else {
    //           throw new Error("Request of users failed!");
    //         }
    //       } catch (error) {
    //         alert("" + error);
    //       }
    //  };

    const handleRegistrationComplete = async(e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            username: username,
            email: email,
            address: address,
            phone: phone,
            password: password
          };


          await fetch(
            `${API_URL}/users`,
            {method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(newUser) })  
             .then(response => response.json())
             .then(data => {
               alert(data.message); // User created successfully
             })
             .catch(error => {
               alert('Error create todo:', error);
             });
    
         doingRegister(newUser); 
         backToLogin();

        // var listUsers= await getAllUsers();
        // console.log(listUsers);
        // for (var i = 0; i < listUsers.length; i++) {
        // if(listUsers[i].name==user.name & listUsers[i].username==user.username &
        //     listUsers[i].email==user.email & listUsers[i].address==user.address &
        //     listUsers[i].phone==user.phone)
        //     console.log("yes");
        //     doingRegister(user); 
        //     break;
        // }
        // if (i==listUsers.length) 
        //     alert("This user not exist in the database");

          
       // doingRegister(user);

        // Clear the form fields after registration
        // setName("");
        // setUsername("");
        // setPassword("");
        // setEmail("");
        // setAddress("");      
        // setPhone("");
        // Navigate back to the Login page
    };

    const backToLogin = (e) => {
        window.location.href = "/login";
    };



    return(
        <div id="loginContainer">
            <form>
                <label className="label" htmlFor="name">enter your name: </label>
                <input className="box" type="text" id="name" name="name" required
                placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <br/>

                <label className="label" htmlFor="username">enter your username: </label>
                <input className="box" type="text" id="username" name="username" required
                placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <br/>

                <label className="label" htmlFor="password">enter your password: </label>
                <input className="box" type="text" id="password" name="pssword" required
                placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br/>

                <label className="label" htmlFor="email">enter your email: </label>
                <input className="box" type="text" id="email" name="email" required
                placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <br/>

                <label className="label" htmlFor="address">enter your address: </label>
                <input className="box" type="text" id="address" name="address" required
                placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                <br/>

                <label className="label" htmlFor="phone">enter your phone: </label>
                <input className="box" type="text" id="phone" name="phone" required
                placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
             <br/>
            </form>  
            <button id="register" onClick={handleRegistrationComplete}>Register</button>

            <button id="login" onClick={backToLogin}>Back to login page</button>
            
            <footer className="footer">COPYRIGHT © 2023 BY NOA & RUT</footer>
        </div>
    );
     }

