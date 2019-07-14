import React from 'react';
import './Strategy.css';
import Footer from './Footer.js';
import Teams from './Teams.js';
import PickList from './PickList.js';
import axios from 'axios';


import arctos_logo from './arctos_logo.png';

const event_code = "2019onosh";

const API = "http://localhost:3001";

function api(method) {
	return API + "/api/" + method;
}


class Strategy extends React.Component {
	constructor(props) {
		super(props);
		this.state={events: [],
				   event_code: "2019onnob"};
	}

	componentDidMount() {
		console.log("initializing app");
		this.getEvents();
	}

	getEvents() {
		axios.get(api("getEvents"))
			.then((response) => this.setState({ events: response.data.data}))
			.catch(err => console.log(err));
	}

	render() {
		return (
				<div className="Strategy">
				<header className="Strategy-header">
				<img src={arctos_logo}  alt="Artos" height="150" />
				<h1>Arctos Strategy App Prototype</h1>
				</header>
				<Event event_code={this.state.event_code} events={this.state.events || []}/>
				<PickList/>
				<Footer/>
				</div>
		);
	}
}

function Event(props) {
	return (
		<div>
			<h2>Event {props.event_code}</h2>
			<select>
			{props.events.map(evt => <option name={evt.event_code} key={evt.event_code}>{evt.event_code}</option>)}
			</select>
			<Teams event_code={props.event_code}/>
		</div>
	);
}

export default Strategy;
