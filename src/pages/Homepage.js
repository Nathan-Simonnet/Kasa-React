import React from 'react';
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';
import specimen from '../assets/images/specimen.png';


function Homepage() {
    return (
        <React.Fragment >
            <Header currentPage="/" />

            <main className="homepage">
                <div className="presentation-img_container">
                    <h1 className="presentation_title">Chez vous, partout et ailleurs</h1>
                </div>

                <div className="rental-cards_container">
                    <article className="rental-card"><a className="rental-card_link" aria-label="Liens vers location" href="#" id="x"><img src={specimen} className='rental-card_img' alt="location" /><h2>Specimen</h2></a></article>
                    <article className="rental-card"><a className="rental-card_link" aria-label="Liens vers location" href="#" id="x"><img src={specimen} className='rental-card_img' alt="location" /><h2>Specimen</h2></a></article>
                    <article className="rental-card"><a className="rental-card_link" aria-label="Liens vers location" href="#" id="x"><img src={specimen} className='rental-card_img' alt="location" /><h2>Specimen</h2></a></article>
                    <article className="rental-card"><a className="rental-card_link" aria-label="Liens vers location" href="#" id="x"><img src={specimen} className='rental-card_img' alt="location" /><h2>Specimen</h2></a></article>
                    <article className="rental-card"><a className="rental-card_link" aria-label="Liens vers location" href="#" id="x"><img src={specimen} className='rental-card_img' alt="location" /><h2>Specimen</h2></a></article>
                    <article className="rental-card"><a className="rental-card_link" aria-label="Liens vers location" href="#" id="x"><img src={specimen} className='rental-card_img' alt="location" /><h2>Specimen</h2></a></article>
                </div>
            </main>

            <Footer />
        </React.Fragment >
    );
}

export default Homepage;