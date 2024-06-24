import React, { useState, useEffect } from 'react';

function Cards() {

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
            {datasLogement.map((data, index) => (
                <article className="rental-card" key={index}>
                    <a className="rental-card_link" aria-label={`Liens vers location ${index + 1}`} href={`/location/${data.id}`}>
                        <img src={data.cover} className='rental-card_img' alt="location" />
                        <h2>{data.title}</h2>
                    </a>
                </article>
            ))}
        </React.Fragment>
    );
}

export default Cards;
