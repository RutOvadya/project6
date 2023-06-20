import React , { useState} from "react";
import { Link } from "react-router-dom";
import ViewPhotos from "./ViewPhotos";
import './Photos.css';

export default function ViewAlbumsUser({ listAlbums, username, userID }) {
  const API_URL = 'http://localhost:3000';
  const [showPhotos, setShowPhotos] = useState("");  
  const [albums, setAlbums] = useState([...(listAlbums || [])]);
  const [showNewAlbumForm, setShowNewAlbumForm] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');




  const getFirstPhotoById = async (albumId) => {
    try {
      const response = await fetch(
        `${API_URL}/photos/${albumId}/${50*(albumId-1)+1}`,
        { method: 'GET'}
          );
      if (response.ok) {
        const photo = await response.json();
        if (photo === null) {
          throw new Error("This Album have not photos");
        }
        return photo;
      } else {
        throw new Error("This Album have not photos");
      }
    } catch (error) {
      alert("" + error);
    } 
  };

  const ViewThePhotos = async (id) => {
    // Code logic for viewing the photos
     const firstPhoto = await getFirstPhotoById(id);
     if(firstPhoto!=undefined){
     const allURL=[];
     allURL.push(firstPhoto.photo.thumbnailUrl);
      setShowPhotos(<ViewPhotos idAlbum={id} listURL={allURL} />);
     }
    };

    const getCurrentAlbums = async()=>{
      try {
        const response = await fetch(
          `${API_URL}/albums/${userID}`,
          { method: 'GET'}
        );
        if (response.ok) {
          const listAlbums = await response.json();
          if (listAlbums.length === 0) {
            throw new Error("You have no Todos");
          }
          setAlbums(listAlbums);
          return listAlbums;
        } else {
          throw new Error("Request failed!");
        }
      } catch (error) {
        alert("" + error);
      }
    };
    const handleCreateAlbum= async()=>{
      const newAlbum = {
        title: newAlbumTitle, 
      };
        await fetch(
          `${API_URL}/albums/${userID}`,
          {method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(newAlbum) })  
           .then(response => response.json())
           .then(data => {
             alert(data.message); // Album created successfully
           })
           .catch(error => {
             alert('Error create album:', error);
           });
           getCurrentAlbums(); //to get the update list of todo

       };

       
  const deleteAlbum= async(id)=>{
    var res=window.confirm("Aro you sure to delete this album?");
    if(res){
    await fetch(
      `${API_URL}/albums/${userID}/${id}`, 
      {method: 'DELETE',
      headers: {'Content-Type': 'application/json'} })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // 'Todo deleted successfully'd
    })
    .catch(error => {
      alert('Error deleting album:', error);
    });
    getCurrentAlbums(); //to get the update list of album
  }
  };


  return (
    <div>
         <div>
      {showNewAlbumForm ? (
        <div id="forNewAlbum">
          <label htmlFor="albumTitle">&emsp;Title:</label>
          <textarea
            type="text"
            id="Title"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}/>
          <button onClick={handleCreateAlbum}>Create Album</button>
          <button onClick={() => setShowNewAlbumForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowNewAlbumForm(true)}>Click here to add new album</button>
      )}
    </div>
      { albums.length>0 ? (
      albums.map((album) => (
          <div key={album.id}>
            <Link to={`/users/${username}/Albums/${album.id}`} onClick={() => ViewThePhotos(album.id)}>
            <button id="album" >
            {album.title}
             </button></Link>
             <button className="forActions" onClick={() => deleteAlbum(album.id)} title="Delete this Album">
             <i className='fas'>&#xf2ed;</i></button>
          </div>
      ))) : (
        <p> &emsp; There are no Albums</p>
      )}
      <div id="forPhotos">{showPhotos}</div>
    </div>
  );
};
