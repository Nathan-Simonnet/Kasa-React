import datasLogement from '../assets/data/logements.json'
import React, { useState } from 'react';

function Carousel({ currentId }) {

    // Find the curent element into datasLogement by its id
    let currentRental;
    const foundRental = datasLogement.find(data => data.id == currentId);
    foundRental ? currentRental = foundRental : currentRental = null;

    // Carousel handler (loop)
    const [carouselIndex, setCarouselIndex] = useState(0);
    const totalPhotosIndex = currentRental.pictures.length;
    const handleCarouselLeftArrow = () => {
        carouselIndex === 0 ? setCarouselIndex(totalPhotosIndex - 1):setCarouselIndex(carouselIndex - 1)
    }
    const handleCarouselRightArrow = () => {
        carouselIndex === totalPhotosIndex - 1 ?setCarouselIndex(0):setCarouselIndex(carouselIndex + 1)
    }

    // Slideshow only if more than 1 picture 
    if(currentRental.pictures.length > 1 ){
        return (
            <div className="rental_carousel">
                <figure className="location_carousel_img-and-i-container">
                    <i tabIndex="0" aria-label='Faire défiler les photos de la location vers la droite' className="carousel_chevron fa-solid fa-chevron-left"
                        onClick={handleCarouselLeftArrow}
                    ></i>
                    <i tabIndex="0" aria-label='Faire défiler les photos de la location vers la gauche' className="carousel_chevron fa-solid fa-chevron-right"
                        onClick={handleCarouselRightArrow}
                    ></i>
                    <img className="location_carousel_img" tabIndex="0" alt={`Pièce n°${carouselIndex} sur ${totalPhotosIndex}`} src={currentRental.pictures[carouselIndex]} />
                    <span className="location_carousel_counter"><span id="location_carousel_current-count">{carouselIndex + 1}</span>/<span id="location_carousel_total-count">{totalPhotosIndex}</span></span>
                </figure>
                <div className="carousel_box"></div>
            </div>
        )
    } else{
        return (<div className="rental_carousel">
        <figure className="location_carousel_img-and-i-container">
            <img className="location_carousel_img" tabIndex="0" alt={`Pièce n°${carouselIndex} sur ${totalPhotosIndex}`} src={currentRental.pictures[carouselIndex]} />
        </figure>
        <div className="carousel_box"></div>
    </div>)
    }
}

export default Carousel;