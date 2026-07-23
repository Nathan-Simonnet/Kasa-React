import { Link } from 'react-router-dom';
import logoKasaRed from '../assets/images/logo_kasa_red.webp';

function App({ currentPage }) {
    return (
        <header>
            <div className="header_logo-container">
                <Link aria-label="Page d'accueil kasa" className="link link_kasa_homepage" to="/">
                    <img src={logoKasaRed} alt="Logo kasa" id="logo_kasa" className="logo_kasa" />
                </Link>
            </div>

            <nav className="header-nav" >
                <ul className="header_nav_ul" >
                    <li className="header_nav_li" >
                        <Link className={`header_nav_link ${currentPage === "/" ? "active" : ""}`} id="home_link" aria-label="Acceuil " to="/">Accueil</Link>
                    </li>
                    <li className="header_nav_li" >
                        <Link className={`header_nav_link ${currentPage === "/about" ? "active" : ""}`} id="about_link" aria-label="À propos" to="/a-propos">A Propos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default App;
