import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ViewInfoUser from "./ViewInfoUser";
import ViewTodosUser from "./ViewTodosUser";
import ViewPostsUser from "./ViewPostsUser";
import ViewAlbumsUser from "./ViewAlbumsUser";
import "./Home.css";
import '@fortawesome/fontawesome-free/css/all.css';

export default function Home(){
  const API_URL = 'http://localhost:3000';
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
        `${API_URL}/albums/${id}`,
        { method: 'GET'}
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
        `${API_URL}/posts/${id}`,
         { method: 'GET'}
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
        `${API_URL}/todos/${id}`,
        { method: 'GET'}
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

  const getNotCompletedTodosById = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/todos/${id}/0`,
        { method: 'GET'}
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
    setContentValue(<ViewPostsUser listPosts={listPosts} username={object.username} userID={object.id}/>);
  };

  const showTodos = async () => {
    const object = getCurrentUser();
    var res= window.confirm("Do you want just the not comleted todos?");
    if(!res){
    const listTodos = await getTodosById(object.id);
    setContentValue(<ViewTodosUser listTodos={listTodos} userID={object.id}/>);
    } else{
      const listTodos = await getNotCompletedTodosById(object.id);
      setContentValue(<ViewTodosUser listTodos={listTodos} userID={object.id}/>);
    }
  };

  const showAlbums = async () => {
    const object = getCurrentUser();
    const listAlbums = await getAlbumsById(object.id);
    setContentValue(<ViewAlbumsUser listAlbums={listAlbums} username={object.username} userID={object.id}/>);
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
     <footer className="footer">COPYRIGHT © 2023 BY NOA & RUT</footer>
   </div>
 );
}; 