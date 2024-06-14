import React, { useState } from 'react';
import datasLogement from '../assets/data/logements.json';

function CollapseRentalChevron({ currentId, tag, title }) {
    
// Find the curent element into datasLogement by its id
    let currentRental;
    const foundRental = datasLogement.find(data => data.id == currentId);
    foundRental ? currentRental = foundRental : currentRental = null;
   
    // Only for equipments because it's a list of 'p' instead of 1 block
    const textInjection = () => {
        if (tag == "equipments") {
            return currentRental.equipments.map((equipment, index) => (
                <p key={index} className="rental_infos">{equipment}</p>
            ))
        } else {
            return <p className="rental_infos">{currentRental.description}</p>
        }
    }

    // Handle if the chevron and text are 'active' or not
    const [isVisible, setIsVisible] = useState(false)
    const handleClick = () => { setIsVisible(!isVisible) }

    return (
        <React.Fragment >
            <div className="dropdown rental_dropdown_title-container">
                <h2 tabIndex="0" className="dropdown_title">{title}</h2>
                <i tabIndex="0" aria-label='Cliquez ou appuyez sur entrer pour afficher le texte, sinon tab'  className={isVisible ?
                    "chevron fa-solid fa-chevron-up active"
                    : "chevron fa-solid fa-chevron-up"} onClick={handleClick} ></i>
            </div>
            <div tabIndex="0" className={isVisible ? "dropdown_text rental_dropdown_text"
                : "dropdown_text rental_dropdown_text hidden"} id={tag}>
                {textInjection()}
            </div>
        </React.Fragment>
    );
}

export default CollapseRentalChevron;