import logoKasaRed from '../assets/images/logo_kasa_red.webp';

function App({currentPage}) {
    return (
        <header>
        <div className="header_logo-container">
            <a aria-label="liens vers la page d'acceuil kasa" className="link link_kasa_homepage" href="/">
                <img src={logoKasaRed} alt="Logo kasa" id="logo_kasa" className="logo_kasa"/>
            </a>
        </div>

        <nav className="header-nav">
            <ul className="header_nav_ul">
                <li className="header_nav_li">
                    <a className={`header_nav_link ${currentPage == "/" ? "active" : ""}`}  id="home_link" aria-label="Acceuil " href="/">Accueil</a>
                </li>
                <li className="header_nav_li">
                    <a className={`header_nav_link ${currentPage == "/about" ? "active" : ""}`} id="about_link" aria-label="À propos" href="/a-propos">A Propos</a>
                </li>
            </ul>
        </nav>
    </header>
    );
  }
  
  export default App;
  