import React, { useState } from 'react';

function Collapse({ tag, title, infos}) {

    // Handle if the chevron and text are 'active' or not
    const [isVisible, setIsVisible] = useState(false)
    const handleClick = () => { setIsVisible(!isVisible) }

  // Map only for equipments because it's a list of 'p' instead of 1 block
  const textInjection = () => {
    // Prevent react from trying to display an inexisting or undifined/null element
        if (tag === 'equipments') {
            return infos.map((equipment, index) => (
                <p key={index} className="rental_infos">{equipment}</p>
            ))
        } else {
            return <p className="rental_infos">{infos}</p>
    }
}

    return (
        <React.Fragment >
            <div className="dropdown_title-container">
                <h2 tabIndex="0" className="dropdown_title">{title}</h2>
                <i tabIndex="0" aria-label='Cliquez ou appuyez sur entrer pour afficher le texte, sinon tab' className={isVisible ?
                    "chevron fa-solid fa-chevron-up active"
                    : "chevron fa-solid fa-chevron-up"} onClick={handleClick} ></i>
            </div>
            <div tabIndex="0" className={isVisible ? `dropdown_text`
                : `dropdown_text hidden`} id={tag}>
                {textInjection()}
            </div>
        </React.Fragment>
    );
}

export default Collapse;