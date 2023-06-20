import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import './Photos.css';

export default function ViewPhotos({ idAlbum, listURL }) {
    const API_URL = 'http://localhost:3000';
    const [current, setCurrent] = useState(0);
    const [currentPhotos, setCurrentPhotos] = useState([...(listURL || [])]);
    const length = currentPhotos.length;


    const getPhotosById = async (id, photoId) => {
      try {
        const response = await fetch(
          `${API_URL}/photos/${idAlbum}/${50*(id-1)+photoId+1}`,
          { method: 'GET'}
            );
        if (response.ok) {
          const photo = await response.json();
          if (photo === null) {
            throw new Error("This album has no more photos");
          }
          return photo;
        } else {
          throw new Error("Request failed!");
        }
      } catch (error) {
        alert("" + error);
      } 
    };
        
  const nextSlide = async() => {
    const nextPhoto = await getPhotosById(idAlbum, length);
    currentPhotos.push(nextPhoto.photo.thumbnailUrl);
    setCurrent(current === length  ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(currentPhotos) || currentPhotos.length <= 0) {
    return null;
  }


  // const deletePhoto= async(id)=>{

  //   await fetch(
  //     `${API_URL}/photos/${idAlbum}/${50*(idAlbum-1)+1}`, 
  //     {method: 'DELETE',
  //     headers: {'Content-Type': 'application/json'} })
  //   .then(response => response.json())
  //   .then(data => {
  //     alert(data.message); 
  //   })
  //   .catch(error => {
  //     alert('Error deleting photo:', error);
  //   });
  //   var newListPhotos = currentPhotos.slice(0, id).concat(currentPhotos.slice(id + 1));
  //   setCurrentPhotos(newListPhotos);
  //   //nextSlide();
  // };


  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      { length>0 ? (
      currentPhotos.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide} alt='image' className='image' />
            )}
            {/* <div> <button id="deleteButton" onClick={() => deletePhoto(index)} title='Delete this Photo'>
          <i className='fas'>&#xf2ed;</i></button></div> */}
          </div>
          
        );
        
      })) : (
        <p> &emsp; There are no Photos</p>
      )}
        
    </section>
  );

}

