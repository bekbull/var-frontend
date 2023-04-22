import './AboutProject.css';
import ComponentHeadings from '../ComponentHeadings/ComponentHeadings'
import React from 'react';

function AboutProject() {
    return (
    <div className="about-project">
        <ComponentHeadings heading="О проекте"/>
        <div className="points">
            <div className="point">
                <h3 className="point__heading">Дипломный проект включал 5 этапов</h3>
                <p className="point__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="point">
                <h3 className="point__heading">На выполнение диплома ушло 5 недель</h3>
                <p className="point__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="time-slider">
            <div className="time-slider__wrapper">
                <p className="time-slider__period">1 неделя</p>
                <p className="time-slider__periodname">Back-end</p>
            </div>
            <div className="time-slider__wrapper_long">
                <p className="time-slider__period time-slider__period_grey">4 недели</p>
                <p className="time-slider__periodname">Front-end</p>
            </div>
        </div>
    </div>
  );
}

export default AboutProject;
