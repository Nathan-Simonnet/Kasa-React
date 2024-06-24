import React from 'react';
import forestAndMountains from '../assets/images/background-image_forest-and-mountains.webp';
import CollapseChevron from '../components/CollapseAbout.jsx';
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
                        <CollapseChevron title="Fiabilité" id="about_dropdown_text_reliability" text="Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes." />
                    </article>
                    <article className="dropdown about_dropdown" id="about_dropdown_respect">
                        <CollapseChevron title="Respect" id="about_dropdown_text_respect" text="La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme." />
                    </article>
                    <article className="dropdown about_dropdown" id="about_dropdown_service">
                        <CollapseChevron title="Service" id="about_dropdown_text_service" text="Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question." />
                    </article>
                    <article className="dropdown about_dropdown" id="about_dropdown_security">
                        <CollapseChevron title="Sécurité" id="about_dropdown_text_security" text="La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes." />
                    </article>
                </div>
            </main>
            <Footer />
        </React.Fragment >
    );
}





export default About;