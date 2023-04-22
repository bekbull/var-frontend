import './AboutMe.css';
import ComponentHeadings from '../ComponentHeadings/ComponentHeadings'
import React from 'react';


function AboutMe() {
    return (
    <div className="aboutme">
        <ComponentHeadings heading="Студент"/>
        <div className="student">
          <div className="student__wrapper">
            <h2 className="student__name">Purples</h2>
            <p className="student__desc">iOS &gt;&gt;&gt; Web Frontend</p>
            <p className="student__about">
              Мы - команда из 5 человек, которая занимается разработкой приложений для iOS и Web Frontend.
            </p>
            <ul className="student__links">
              <li className="student__link-wrapper"><a href="https://www.facebook.com/zuck" rel="noreferrer" target="_blank" className="student__link">Facebook</a></li>
              <li className="student__link-wrapper"><a href="https://github.com/bekbull" rel="noreferrer" target="_blank" className="student__link">Github</a></li>
            </ul>
          </div>
          <img src={require('../../images/ddd.png').default} alt="student" className="student__image" />
        </div>
        
    </div>
  );
}

export default AboutMe;
