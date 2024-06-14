import React, { useState } from 'react';

function CollapseChevron( {title,id, text} ) {

    // Dropdown click handler 
    // Chevron click = chevron down + text appear // And reverse
    const [isVisible, setIsVisible] = useState(false)
    const handleClick = () => { setIsVisible(!isVisible) }

    return (
        <React.Fragment >

            <div className="about_dropdown_title-container">
                <span className="dropdown_title">{title}</span>
                <i tabIndex='0' aria-label='Cliquez pour dérouler le texte' className={isVisible ?
                    "chevron fa-solid fa-chevron-up active"
                    : "chevron fa-solid fa-chevron-up"} onClick={handleClick} ></i>
            </div>
            <p tabIndex='0' className={isVisible? "dropdown_text about_dropdown_text" 
                : "dropdown_text about_dropdown_text hidden"} 
                id={id}>{text}</p>
        </React.Fragment>
    );
}

export default CollapseChevron;

// Fiabilité
// "about_dropdown_text_reliability"
// Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes.