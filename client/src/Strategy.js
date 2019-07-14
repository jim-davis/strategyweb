import React from 'react';
import './Strategy.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Matches from './Matches.js';
import Teams from './Teams.js';
import PickList from './PickList.js';
import axios from 'axios';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";



const API = "http://localhost:3001";

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
            this.getMatches(this.state.event_code);
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
          <Header event_code={this.state.event_code} events={this.state.events} eventSelected={this.eventSelected}/>
          <div className='app'>
            <Tabs>
              <TabList>
                <Tab>Matches</Tab>
                <Tab>Teams</Tab>
                <Tab>Pick List</Tab>
              </TabList>
              <TabPanel>
                <Matches event_code={this.state.event_code} matches={this.state.matches}/>
              </TabPanel>
              <TabPanel>
                <Teams event_code={this.state.event_code} teams={this.state.teams}/>
              </TabPanel>
              <TabPanel>
                <PickList/>
              </TabPanel>
            </Tabs>
          </div>
          <Footer/>
        </div>
        );
    }
}

// return the URL to invoke the API method
function api(method) {
    return API + "/api/" + method;
}


export default Strategy;
