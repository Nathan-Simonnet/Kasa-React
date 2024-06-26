import React from 'react';

function Card({ id, img, title }) {

    return (
        <React.Fragment >
            {
                <article className="rental-card">
                    <a className="rental-card_link" aria-label={`Liens vers location ${id}`} href={`/location/${id}`}>
                        <img src={img} className='rental-card_img' alt="location" />
                        <h2>{title}</h2>
                    </a>
                </article>
            }
        </React.Fragment>
    );
}

export default Card;
