import React from 'react';
import './Promo.css';

import NavTab from '../NavTab/NavTab'

function Promo() {
    return (
    <div className="promo">
        <div className="promo__text-wrapper">
            <h1 className="promo__text">Фигня же</h1>
        </div>
        <NavTab />
    </div>
  );
}

export default Promo;
