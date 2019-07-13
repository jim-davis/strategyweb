import React from 'react';
import './Strategy.css';
import Footer from './Footer.js';
import PickList from './PickList.js';

import arctos_logo from './arctos_logo.png';

const event_key = "2019onosh";

function Strategy() {
  return (
    <div className="Strategy">
      <header className="Strategy-header">
        <img src={arctos_logo}  alt="Artos" height="150" />
        <h1>Arctos Strategy App Prototype</h1>
      </header>
	  <Event/>
	  <PickList/>
      <Footer/>
    </div>
  );
}

function Event() {
	return (
	<h2>Event {event_key}</h2>
	);
}

export default Strategy;
