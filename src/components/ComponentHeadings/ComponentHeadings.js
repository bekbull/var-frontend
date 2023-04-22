import './ComponentHeadings.css';
import React from 'react';


function ComponentHeadings(props) {
    return (
        <h2 className="component-heading">{props.heading}</h2>
  );
}

export default ComponentHeadings;
