import React from 'react';
 import Cards from '../components/CardsDisplay.jsx'
 import Header from '../layout/Header.js';
 import Footer from '../layout/Footer.js';

function Homepage() {
    return (
        <React.Fragment >
            <Header currentPage = "/" />
            <main className="homepage">
                <div className="presentation-img_container">
                    <h1 className="presentation_title">Chez vous, partout et ailleurs</h1>
                </div>

                <div className="rental-cards_container">
                    <Cards/>
                </div>
            </main>
            <Footer />
        </React.Fragment >
    );
}

export default Homepage;