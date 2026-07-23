import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';

function Error() {
  return (
    <React.Fragment >
      <Header />
      <main className="error">
        <h1 className="error_title">404</h1>
        <h2 className="error_text">Oups! La page que vous demandez n'existe pas.</h2>
        <Link className="link error_link" to="/">Retrounez sur la page d'accueil</Link>
      </main>
      <Footer />
    </React.Fragment >
  );
}

export default Error;


