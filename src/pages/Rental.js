import React from 'react';
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';

function Rental() {
    return (
        <React.Fragment >
            <Header />
            <main className="rental">
                <div className="rental_carousel">
                    <figure className="location_carousel_img-and-i-container">
                        <i className="carousel_chevron fa-solid fa-chevron-left"></i>
                        <i className="carousel_chevron fa-solid fa-chevron-right"></i>
                        <img className="location_carousel_img" alt="Location n°X" src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg" />
                        <span className="location_carousel_counter"><span id="location_carousel_current-count">1</span>/<span id="location_carousel_total-count">4</span></span>
                    </figure>
                    <div className="carousel_box"></div>
                </div>

                <div className="rental_informations-container">
                    <div className="rental_title-and-location-container">
                        <h1 className="rental_title">Cozy loft on the Canal Saint-Martin</h1>
                        <p className="rental_location">Paris, Île-de-France</p>
                        <div className="rental_tag-container">
                            <span className="rental_tag">Canal Saint Martin</span>
                            <span className="rental_tag">République</span>
                            <span className="rental_tag">Appartement</span>
                        </div>
                    </div>

                    <div className="rental_owner-and-rating-container">
                        <div className="rental_owner-container">
                            <p className="rental_owner_name">Alexandre Dumas</p>
                            <figure className="rental_owner_picture-container">
                                <img src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-1.jpg" alt="The owner" className="rental_owner_picture" />
                            </figure>
                        </div>
                        <div className="rental_rating-container" aria-label="Notation de X étoiles sur 5">
                            <i aria-hidden="true" className="fa-solid fa-star red-star"></i>
                            <i aria-hidden="true" className="fa-solid fa-star red-star"></i>
                            <i aria-hidden="true" className="fa-solid fa-star red-star"></i>
                            <i aria-hidden="true" className="fa-solid fa-star grey-star"></i>
                            <i aria-hidden="true" className="fa-solid fa-star grey-star"></i>
                        </div>

                    </div>
                </div>

                <div className="rental_dropdown_container">
                    <article className="rental_dropdown description" id="rental_dropdown_description">
                        <div className="dropdown rental_dropdown_title-container">
                            <h2 className="dropdown_title">Description</h2>
                            <i className="chevron fa-solid fa-chevron-up" aria-label="cliquez pour déroulez le text"></i>
                            <i className="chevron fa-solid fa-chevron-down active"></i>
                        </div>
                        <p className="dropdown_text rental_dropdown_text hidden" id="rental_dropdown_text_description">À seulement deux pas des Buttes Chaumont, venez découvrir Paris dans ce studio tout équipé. Entièrement équipé pour votre confort et élégamment décoré, il vous permettra de vivre comme un Parisien le temps de votre séjour.</p>
                    </article>

                    <article className="rental_dropdown equipment" id="rental_dropdown_equipments">
                        <div className="dropdown rental_dropdown_title-container">
                            <h2 className="dropdown_title">Equipements</h2>
                            <i className="chevron fa-solid fa-chevron-up" aria-label="cliquez pour déroulez le text"></i>
                            <i className="chevron fa-solid fa-chevron-down active"></i>
                        </div>
                        <p className="dropdown_text rental_dropdown_text hidden" id="rental_dropdown_text_equipments">Wi-fi Cuisine équipée Télévision Sèche Cheveux</p>
                    </article>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default Rental;


