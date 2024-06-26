import React, { useState, useEffect } from 'react';
import placeholder from '../assets/images/placeholder.png';

function Slideshow({ currentId }) {
    const [datasRentals, setDatasRentals] = useState([]);
    const [currentRental, setCurrentRental] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        // Fetch the data when the component mounts
        fetch('/logements.json')
            .then(response => response.json())
            .then(data => setDatasRentals(data))
            .catch(error => console.error('Error fetching data:', error));
        // Prevent infinite loop
    }, []);

    useEffect(() => {
        if (datasRentals.length > 0) {
            setCurrentRental(datasRentals.find(data => data.id == currentId));
            // setCarouselIndex(0); // Could reset carousel index when rental changes
        }
    }, [datasRentals, currentId]);

    // Oui c'est vitale! Sion react essayera de charger unélément inexistant (et c'est pas bien)
    if (!currentRental) {
        return <div>Loading...</div>; // or a spinner/loading component
    }
    // Allows infinite sliding from zero to first picture and last picture to zero 
    const totalPhotosIndex = currentRental.pictures ? currentRental.pictures.length : 0;
    const handleCarouselLeftArrow = () => {
        setCarouselIndex(carouselIndex === 0 ? totalPhotosIndex - 1 : carouselIndex - 1);
    };
    const handleCarouselRightArrow = () => {
        setCarouselIndex(carouselIndex === totalPhotosIndex - 1 ? 0 : carouselIndex + 1);
    };

    // Slideshow only if more than 1 picture
    if (totalPhotosIndex > 1) {
        return (
            <div className="rental_carousel">
                <figure className="location_carousel_img-and-i-container">
                    <i
                        tabIndex="0"
                        aria-label="Faire défiler les photos de la location vers la gauche"
                        className="carousel_chevron fa-solid fa-chevron-left"
                        onClick={handleCarouselLeftArrow}
                    ></i>
                    <i
                        tabIndex="0"
                        aria-label="Faire défiler les photos de la location vers la droite"
                        className="carousel_chevron fa-solid fa-chevron-right"
                        onClick={handleCarouselRightArrow}
                    ></i>
                    <img
                        className="location_carousel_img"
                        tabIndex="0"
                        alt={`Pièce n°${carouselIndex + 1} sur ${totalPhotosIndex}`}
                        src={currentRental.pictures[carouselIndex]}
                    />
                    <span className="location_carousel_counter">
                        <span id="location_carousel_current-count">{carouselIndex + 1}</span>/
                        <span id="location_carousel_total-count">{totalPhotosIndex}</span>
                    </span>
                </figure>
            </div>
        );
    } else if (totalPhotosIndex === 1) {
        return (
            <div className="rental_carousel">
                <figure className="location_carousel_img-and-i-container">
                    <img
                        className="location_carousel_img"
                        tabIndex="0"
                        alt={`Pièce n°1 sur 1`}
                        src={currentRental.pictures[0]}
                    />
                </figure>
            </div>
        );
    } else {
        return (
            <div className="rental_carousel">
                <figure className="location_carousel_img-and-i-container">
                    <img
                        className="location_carousel_img"
                        tabIndex="0"
                        alt={`Pas de photos disponible`}
                        src={placeholder}
                    />
                </figure>
            </div>
        )
    }
}

export default Slideshow;
