import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import './Photos.css';

export default function ViewPhotos({ idAlbum, listURL }) {

    const [current, setCurrent] = useState(0);
    const length = listURL.length;

    const getPhotosById = async (id, photoId) => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${id}&id=${50*(id-1)+photoId+1}`
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
    listURL.push(nextPhoto[0].thumbnailUrl);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(listURL) || listURL.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {listURL.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide} alt='image' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );

}

