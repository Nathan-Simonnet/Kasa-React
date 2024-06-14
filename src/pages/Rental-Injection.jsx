import datasLogement from '../assets/data/logements.json';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../layout/Header.js';
import Carousel from '../components/Slideshow.jsx';
import Footer from '../layout/Footer.js';
import CollapseRentalChevron from '../components/Collapse_rental.jsx';

function RentalInjection() {

    const { id } = useParams()
    const [currentRental, setCurrentRental] = useState(null);
    const navigate = useNavigate();

    // Find current rental from datasLogement, if no corresponding, navigate to error 404
    useEffect(() => {
        const foundLogement = datasLogement.find(logement => logement.id == id);
        foundLogement ? setCurrentRental(foundLogement) : navigate('/error');
    }, [id, navigate]);

    // Without this it's completely broken!!
    if (!currentRental) return <div>Error: Rental not found</div>;

    // loop for tags inside currentRental
    const tagsInjection = () => {
        return currentRental.tags.map((tag, index) => (
            <span key={index} className="rental_tag">{tag}</span>
        ))
    }
    // loop for rating stars by colors inside currentRental
    const ratingStarsInjection = () => {
        let ratingArray = []
        let stringToNumber = parseInt(currentRental.rating)
        for (let i = 0; i < 5; i++) {
            if (stringToNumber === 0) {
                ratingArray.push('grey')
            } else {
                ratingArray.push('red')
                stringToNumber--;
            }
        }
        return ratingArray.map((color, index) => (
            <i aria-hidden="true" key={index} className={`fa-solid fa-star ${color}-star`}></i>
        ))
    }

    return (
        <React.Fragment >
              <Header />
            <main className="rental">
            <Carousel currentId={currentRental.id} />

                <div className="rental_informations-container">
                    <div tabIndex="0"  className="rental_title-and-location-container">
                        <span className='sr-only'>Informations sur la location et environnement</span>
                        <h1 className="rental_title">{currentRental.title}</h1>
                        <p className="rental_location">{currentRental.location}</p>
                        <div aria-label='Tags'  className="rental_tag-container">
                            {tagsInjection()}
                        </div>
                    </div>

                    <div tabIndex="0" className="rental_owner-and-rating-container">
                        <div className="rental_owner-container">
                            <span className='sr-only'>Informations sur le propriétaire et notation</span>
                            <p className="rental_owner_name">{currentRental.host.name}</p>
                            <figure className="rental_owner_picture-container">
                                <img src={currentRental.host.picture} alt="le propriétaire" className="rental_owner_picture" />
                            </figure>
                        </div>
                        <div className="rental_rating-container" aria-label={`Noté ${currentRental.rating} étoiles sur 5`}>
                            {ratingStarsInjection()}
                        </div>

                    </div>
                </div>

                <div className="rental_dropdown_container">
                    <article className="rental_dropdown description" id="rental_dropdown_description">
                        <CollapseRentalChevron tag="description" currentId={currentRental.id} title="Description" />
                    </article>

                    <article className="rental_dropdown equipment" id="rental_dropdown_equipments">
                        <CollapseRentalChevron tag="equipments" currentId={currentRental.id} title="Équipements" />
                    </article>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default RentalInjection;