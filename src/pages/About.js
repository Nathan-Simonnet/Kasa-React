import React from 'react';
import forestAndMountains from '../assets/images/background-image_forest-and-mountains.webp';
import Collapse from '../components/Collapse.jsx';
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';

function About() {

    return (
        <React.Fragment >
            <Header currentPage="/about" />
            <main className="about">
                <figure className="about_image-container">
                    <img src={forestAndMountains} alt="Montagne et forêt" className="about_image" />
                </figure>
                <div className="about_dropdowns-container">
                    <article className="dropdown about_dropdown" id="about_dropdown_reliability">
                        <Collapse tag="reliability" title="Fiabilité"  infos="Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes." />
                    </article>
                    <article className="dropdown about_dropdown" id="about_dropdown_respect">
                        <Collapse tag="respect" title="Respect"  infos="La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme." />
                    </article>
                    <article className="dropdown about_dropdown" id="about_dropdown_service">
                        <Collapse tag="service" title="Service"  infos="Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question." />
                    </article>
                    <article className="dropdown about_dropdown" id="about_dropdown_security">
                        <Collapse tag="security" title="Sécurité"  infos="La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes." />
                    </article>
                </div>
            </main>
            <Footer />
        </React.Fragment >
    );
}





export default About;