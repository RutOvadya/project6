import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect, useRef  } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ViewAlbumsUser from './pages/ViewAlbumsUser';
import ViewInfoUser from './pages/ViewInfoUser';
import ViewPostsUser from './pages/ViewPostsUser';
import ViewTodosUser from './pages/ViewTodosUser';

export default function App() {
  const isLoggedIn = localStorage.getItem("currentUser") != null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />}>
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}


