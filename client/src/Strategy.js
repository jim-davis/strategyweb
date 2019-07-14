import React from 'react';
import './Strategy.css';
import Footer from './Footer.js';
import Teams from './Teams.js';
import PickList from './PickList.js';
import axios from 'axios';

import arctos_logo from './arctos_logo.png';

const API = "http://localhost:3001";

function api(method) {
    return API + "/api/" + method;
}


class Strategy extends React.Component {
    constructor(props) {
        super(props);
        this.state={events: [],
                   event_code: null};
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        axios.get(api("getEvents"))
			.then(response => this.setState({ events: response.data.data}));
    }

    render() {
        return (
                <div className="Strategy">
                  <header>
                    <EventBar event_code={this.state.event_code} events={this.state.events}/>
                    <div className="titleBar">
                      <img src={arctos_logo}  alt="Artos" height="150" />
                      <h1>Arctos Strategy App Prototype</h1>
                    </div>
  
                </header>
                <div className='app'>
                  <PickList/>
                  <Teams event_code={this.state.event_code}/>
                </div>
                <Footer/>
                </div>
        );
    }
}

class EventBar extends React.Component {
	constructor(props) {
		super(props);
		this.state={event_code: props.event_code,
					events: props.events};
	}

	// Called before render.
	// Our props have changed, but React does not re-render unless we explicitly ask
	static getDerivedStateFromProps(props, state) {
		return {events: props.events, event_code: props.event_code};
	}

	render() {
		return (
        <div className='eventBar'>
            <h2>Event {this.state.event_code}</h2>
            <select onChange={() => console.log("chg")}>
            {this.state.events.map(evt =>
			<option 
               name={evt.event_code} 
               key={evt.event_code}
			   >
              {evt.event_code}
             </option>)}
            </select>
        </div>
    );
	}
}

export default Strategy;
