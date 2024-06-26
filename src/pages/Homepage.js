import React, { useState, useEffect } from 'react';
 import Card from '../components/Card.jsx'
 import Header from '../layout/Header.js';
 import Footer from '../layout/Footer.js';

function Homepage() {

    
    const [datasLogement, setDatasLogement] = useState([]);

    useEffect(() => {
        //  Component mounts
        fetch('/logements.json') 
            .then(response => response.json())
            .then(data => setDatasLogement(data))
            .catch(error => console.error('Error fetching rental details:', error));
        // Prevent ininite loop
        }, []); 


    return (
        <React.Fragment >
            <Header currentPage = "/" />
            <main className="homepage">
                <div className="presentation-img_container">
                    <h1 className="presentation_title">Chez vous, partout et ailleurs</h1>
                </div>

                <div className="rental-cards_container">
                    {datasLogement.map((data, index) =>{
                  return <Card key={index} id={data.id} img={data.cover} title={data.title}/>
                    })}
                </div>
            </main>
            <Footer />
        </React.Fragment >
    );
}

export default Homepage;