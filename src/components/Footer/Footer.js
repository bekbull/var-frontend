import './Footer.css';
import React from 'react';

function Footer() {
    return (
    <footer className="footer">
        <p className="footer__paragraph">Учебный проект WeSDU х BeatFilm.</p>
        <div className="footer__links-wrapper">
            <p className="footer__paragraph footer__paragraph_light">© 2023</p>
            <ul className="footer__links">
                <li className="footer__link-wrapper"><a href="https://sdu.edu.kz" rel="noreferrer" target="_blank" className="footer__link">Suleyman Demirel University</a></li>
                <li className="footer__link-wrapper"><a href="https://github.com/bekbull" rel="noreferrer" target="_blank" className="footer__link">Github</a></li>
                <li className="footer__link-wrapper"><a href="https://www.facebook.com/zuck" rel="noreferrer" target="_blank" className="footer__link">Facebook</a></li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
