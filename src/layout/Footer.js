import logoKasaWhite from '../assets/images/logo_kasa_white.webp';
function Footer() {
    return (
        <footer>
                <div className="footer_logo-container">
                    <img src={logoKasaWhite} alt="Logo kasa" id="logo_kasa_white" className="footer_logo_kasa"/>
                </div>
                <div className="wrapper"><p className="footer_credits">© 2020 Kasa. All rights reserved</p></div>
            </footer>
    );
  }
  
  export default Footer;  