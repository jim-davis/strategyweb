import React from 'react';
import './Strategy.css';
import Footer from './Footer.js';
import Matches from './Matches.js';
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
		this.eventSelected = this.eventSelected.bind(this);
        this.state={events: [],
					teams: [],
					matches: [],
					event_code: null};
    }

    componentDidMount() {
        this.getEvents();
		if (this.state.event_code) {
			this.getTeams(this.state.event_code);
		}
    }

	// a new Event has been selected (in the event bar)
	eventSelected(event_code) {
		console.log("An event has been chosen: " + event_code);
		this.setState({event_code: event_code});
		this.getTeams(event_code);
        this.getMatches(event_code);
	}

	// get the list of all events from the server
    getEvents() {
        axios.get(api("getEvents"))
			.then(response => this.setState({ events: response.data.data}));
    }

	getTeams(event_code) {
		console.log("getting teams for " + event_code);
		axios.get("http://localhost:3001/api/getTeams?event_code=" + event_code)
			.then((response) => this.setState({ teams: response.data.data }));
	}

	getMatches(event_code) {
		console.log("getting matches for " + event_code);
		axios.get("http://localhost:3001/api/getMatches?event_code=" + event_code)
			.then((response) => this.setState({ matches: response.data.data }));
	}


    render() {
        return (
                <div className="Strategy">
                  <header>
                    <EventBar 
			            event_code={this.state.event_code} 
                        events={this.state.events}
                        onEventChange={this.eventSelected}/>
                    <div className="titleBar">
                      <img src={arctos_logo}  alt="Artos" height="150" />
                      <h1>Arctos Strategy App Prototype</h1>
                    </div>
  
                </header>
                <div className='app'>
                  <PickList/>
                  <Matches event_code={this.state.event_code} matches={this.state.matches}/>
                  <Teams event_code={this.state.event_code} teams={this.state.teams}/>
                </div>
                <Footer/>
                </div>
        );
    }
}

// Shows the currently selected Event, and a control to select a different one.
// Probably while we are at an event that control should be locked down.
class EventBar extends React.Component {
	constructor(props) {
		super(props);
		this.onEventSelect = this.onEventSelect.bind(this);
	}

	// When user chooses an event from the event dropdown
	onEventSelect(e) {
		// tell our parent that something changed.
		this.props.onEventChange(e.target.value);
	}

	render() {
		return (
        <div className='eventBar'>
            <h3>Event {this.props.event_code}</h3>
            <select onChange={this.onEventSelect}>
				<option key='none' value=''>what event are you at?</option>
            {this.props.events.map(evt =>
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
