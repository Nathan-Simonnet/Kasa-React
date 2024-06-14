import React from 'react';
import datasLogement from '../assets/data/logements.json'

function Cards() {
    return (
        <React.Fragment >
        {datasLogement.map((data, index) => (
            <article className="rental-card" key={index}>
                <a className="rental-card_link" aria-label={`Liens vers location ${index + 1}`} href={`/location/${data.id}`}>
                <img src={ data.cover } className='rental-card_img' alt="location" />
                    <h2>{ data.title }</h2>
                </a>
            </article>
        ))}
        </React.Fragment>
    );
}

export default Cards;
