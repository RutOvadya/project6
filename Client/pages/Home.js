import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ViewInfoUser from "./ViewInfoUser";
import ViewTodosUser from "./ViewTodosUser";
import ViewPostsUser from "./ViewPostsUser";
import ViewAlbumsUser from "./ViewAlbumsUser";
import "./Home.css";

export default function Home(){
  const [contentValue, setContentValue] = useState("");

  const getCurrentName = () => {
    const user = getCurrentUser();
    return user.name;
  };

  const exit = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserTodos");
    window.location.href = "/";
    
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser");
    const objUser = JSON.parse(user);
    return objUser;
  };

  const getAlbumsById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${id}`
      );
      if (response.ok) {
        const listAlbums = await response.json();
        if (listAlbums.length === 0) {
          throw new Error("You have no Albums");
        }
        return listAlbums;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      alert("" + error);
    }
  };

  const getPostsById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      if (response.ok) {
        const listPosts = await response.json();
        if (listPosts.length === 0) {
          throw new Error("You have no Posts");
        }
        return listPosts;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      alert("" + error);
    }
  };

  const getTodosById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${id}`
      );
      if (response.ok) {
        const listTodos = await response.json();
        if (listTodos.length === 0) {
          throw new Error("You have no Todos");
        }
        return listTodos;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      alert("" + error);
    }
  };

  const showInfo = () => {
    const object = getCurrentUser();
    setContentValue(<ViewInfoUser user={object} />);
  };

  const showPosts = async () => {
    const object = getCurrentUser();
    const listPosts = await getPostsById(object.id);
    setContentValue(<ViewPostsUser listPosts={listPosts} username={object.username}/>);
  };

  const showTodos = async () => {
    var listTodos=[];
    if(localStorage.getItem("currentUserTodos") === null){
      const object = getCurrentUser();
      listTodos = await getTodosById(object.id);
      window.localStorage.setItem("currentUserTodos", JSON.stringify(listTodos));
    } else{
      listTodos = JSON.parse(localStorage.getItem("currentUserTodos"));
    }  
    setContentValue(<ViewTodosUser listTodos={listTodos}/>);
  };

  const showAlbums = async () => {
    const object = getCurrentUser();
    const listAlbums = await getAlbumsById(object.id);
    setContentValue(<ViewAlbumsUser listAlbums={listAlbums} username={object.username} />);
  };

  return (
   <div id="homeContainer">
     <h1 id="currentName">Hello {getCurrentName()}</h1>
     <Link to="/" id="exitIcon" title="Logout" onClick={exit}>
        <button className="fas">Logout &#xf2f6;</button>
     </Link>
     <Link to={`/users/${getCurrentUser().username}/Info`} id="infoButton" title="Info" onClick={showInfo}>
      <button className="fas">Show My Info &#xf2bb;</button>       
     </Link>
     <Link to={`/users/${getCurrentUser().username}/Posts`} id="postsButton" title="Posts" onClick={showPosts}>
      <button className="fas">Show My Posts &#xf07c;</button>       
     </Link>
     <Link to={`/users/${getCurrentUser().username}/Todos`} id="todosButton" className="Todo" title="Todos" onClick={showTodos}>      
       <button className="fas">Show My Todos &#xf044;</button>
     </Link>
     <Link to={`/users/${getCurrentUser().username}/Albums`} id="albumsButton" className="Albums" title="Albums" onClick={showAlbums}>       
       <button className="fas">Show My Albums &#xf03e;</button>
     </Link>
     <div id="locationForContent">{contentValue}</div>
     <footer className="footer">COPYRIGHT © 2023 BY AVITAL & RUT</footer>
   </div>
 );
}; 