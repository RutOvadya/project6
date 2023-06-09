import React , { useState} from "react";
import { Link } from "react-router-dom";
import ViewPhotos from "./ViewPhotos";
import './Photos.css';

export default function ViewAlbumsUser({ listAlbums, username }) {
  const [showPhotos, setShowPhotos] = useState("");

  const getFirstPhotoById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}&id=${50*(id-1)+1}&id=${50*(id-1)+2}`
          );
      if (response.ok) {
        const firstPhoto = await response.json();
        if (firstPhoto === null) {
          throw new Error("This Album have not photos");
        }
        return firstPhoto;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      alert("" + error);
    } 
  };

  const ViewThePhotos = async (id) => {
  // Code logic for viewing the photos
   const twoFirstPhoto = await getFirstPhotoById(id);
   const allURL=[];
   allURL.push(twoFirstPhoto[0].thumbnailUrl);
   allURL.push(twoFirstPhoto[1].thumbnailUrl);
    setShowPhotos(<ViewPhotos idAlbum={id} listURL={allURL} />);
  };

  return (
    <div>
      {listAlbums.map((album) => (
          <div key={album.id}>
            <Link to={`/users/${username}/Albums/${album.id}`} onClick={() => ViewThePhotos(album.id)}>
            <button id="album" >
            {album.id}. {album.title}
             </button></Link>
          </div>
      ))}
      <div id="forPhotos">{showPhotos}</div>
    </div>
  );
};
