import React from 'react';
import forestAndMountains from '../assets/images/background-image_forest-and-mountains.webp';
 import Header from '../layout/Header.js';
 import Footer from '../layout/Footer.js';

function About() {

return (
        <React.Fragment >
            <Header currentPage = "/about" />
            <main className="about">
        <figure className="about_image-container">
            <img src={forestAndMountains} alt="Montagne et forêt" className="about_image"/>
        </figure>

        <div className="about_dropdowns-container">
            <article className="dropdown about_dropdown" id="about_dropdown_reliability">
                <div className="about_dropdown_title-container">
                    <span className="dropdown_title">Fiabilité</span>
                    <i className="chevron fa-solid fa-chevron-up"></i>
                    <i className="chevron fa-solid fa-chevron-down active"></i>
                </div>
                <p className="dropdown_text about_dropdown_text hidden" id="about_dropdown_text_reliability">Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes.</p>
            </article>

            <article className="dropdown about_dropdown" id="about_dropdown_respect">
                <div className="about_dropdown_title-container">
                    <span className="dropdown_title">Respect</span>
                    <i className=" chevron fa-solid fa-chevron-up"></i>
                    <i className=" chevron fa-solid fa-chevron-down active"></i>
                </div>
                <p className="dropdown_text about_dropdown_text hidden" id="about_dropdown_text_respect">La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.</p>
            </article>

            <article className="dropdown about_dropdown" id="about_dropdown_service">
                <div className="about_dropdown_title-container">
                    <span className="dropdown_title">Service</span>
                    <i className=" chevron fa-solid fa-chevron-up"></i>
                    <i className=" chevron fa-solid fa-chevron-down active"></i>
                </div>
                <p className="dropdown_text about_dropdown_text hidden" id="about_dropdown_text_service">Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.</p>
            </article>

            <article className="dropdown about_dropdown" id="about_dropdown_security">
                <div className="about_dropdown_title-container">
                    <span className="dropdown_title">Sécurité</span>
                    <i className=" chevron fa-solid fa-chevron-up"></i>
                    <i className=" chevron fa-solid fa-chevron-down active"></i>
                </div>
                <p className="dropdown_text about_dropdown_text hidden" id="about_dropdown_text_security">La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes.</p>
            </article>

        </div>
    </main>
            <Footer />
        </React.Fragment >
    );
}





export default About;