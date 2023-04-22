import './Portfolio.css';
import React from 'react';

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className="portfolio__heading">Портфолио</h2>
            <ul className="protfolio__list">
                <li className="protfolio__elem">
                    <p className="protfolio__linkname">Статичный сайт</p>
                    <a href="" className="protfolio__link"></a>
                </li>
                <li className="protfolio__elem">
                    <p className="protfolio__linkname">Адаптивный сайт</p>
                    <a href="" className="protfolio__link"></a>
                </li>
                <li className="protfolio__elem">
                    <p className="protfolio__linkname">Одностраничное приложение</p>
                    <a href="" className="protfolio__link"></a>
                </li>
            </ul>
        </div>
        
  );
}

export default Portfolio;
