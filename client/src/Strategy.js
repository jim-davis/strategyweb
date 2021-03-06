import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './Strategy.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Matches from './Matches.js';
import Teams from './Teams.js';
import PickList from './PickList.js';
import ScoutingOutput from './ScoutingOutput.js';

// The base URL for the server.
const API = "http://localhost:3001";

class Strategy extends React.Component {
    constructor(props) {
        super(props);
		this.eventSelected = this.eventSelected.bind(this);
        this.state={events: [],
		    teams: [],
		    matches: [],
		    scouting_output: [],
                    picklist: [],
		    event_code: null};
    }

    // React calls this method (once) after the component has been rendered.
    // Ask the server for the set of all known events, and if the user has selected an event,
    // get the event-specific information
    componentDidMount() {
        this.getEvents();
        this.getEventSpecificInfo(this.state.event_code);
        // start an automatic-refresh loop.  Every 10 seconds update things
        this.interval = setInterval(() => this.refresh(), 10 * 1000);
    }

    // When the component is going away it should clean up after itself.
    componentWillUnmount() {
        // we no longer need the automatic update timer
        clearInterval(this.interval);
    }

    // This method does any periodic refreshing we want.
    refresh() {
        // add calls here to refresh any other dynamic component, or a clock, or whatever
        this.getPicklist(this.state.event_code);
	this.getScoutingOutput(this.state.event_code);
    }

	// a new Event has been selected (in the event bar)
	eventSelected(event_code) {
        // Remember the event_code
	    this.setState({event_code: event_code});
	    console.log("event_code:" + event_code);
            this.getEventSpecificInfo(event_code);
	  
	}

    getEventSpecificInfo(event_code) {
        if (event_code) {
	    console.log("getting event info");
	    this.getTeams(event_code);
            this.getMatches(event_code);
            this.getScoutingOutput(event_code);
        }
    }

	// Get the list of all events.  (axios returns a Promise to get it)
    // after it arrives, update our state with the response.
    getEvents() {
        axios.get(api("getEvents"))
	    .then(response => this.setState({ events: response.data.data}));
    }
    
    // get the set of teams at the current event, then update our state
    getTeams(event_code) {
	axios.get("http://localhost:3001/api/getTeams?event_code=" + event_code)
	    .then((response) => this.setState({ teams: response.data.data }));
    }
    
    // get the list of matches at the current event, then update our state
    getMatches(event_code) {
	console.log("getting schedule");
	axios.get("http://localhost:3001/api/getMatches?event_code=" + event_code)
	    .then((response) => this.setState({ matches: response.data.data }));
    }
    
    //get the scouting output, then update our state
    getScoutingOutput(event_code) {
	axios.get(API + "/api/getScoutingOutput?event_code=" + event_code)
	    .then((response) => this.setState({ scouting_output: response.data.data }));
    }
    
    // get the picklist
    getPicklist(event_code) {
		axios.get("http://localhost:3001/api/getPicklist?event_code=" + event_code)
			.then((response) => this.setState({ picklist: response.data.data }));
    }
        
    // draw the entire strategyweb app
    // This method returns the JSX (which looks like fancy HTML) for the component.
    // The only tricky bit is that we need to provide the header object with a callback
    // to be called when the user chooses an event. You need callbacks like this whenever
    // a lower-level component updates state that belongs to a parent.
    render() {
        return (
        <div className="Strategy">
          <Header event_code={this.state.event_code} 
                  events={this.state.events} 
                  eventSelected={this.eventSelected}/>
          <div className='app'>
            <Tabs>
              <TabList>
                <Tab>Schedule</Tab>
		<Tab>Scouting Output</Tab>
                <Tab>Teams</Tab>
                <Tab>Pick List</Tab>
              </TabList>
              <TabPanel>
                <Matches event_code={this.state.event_code} matches={this.state.matches}/>
		</TabPanel>
		<TabPanel>
		<ScoutingOutput event_code={this.state.event_code} scouting_output={this.state.scouting_output}/>
		</TabPanel>
              <TabPanel>
                <Teams event_code={this.state.event_code} teams={this.state.teams}/>
              </TabPanel>
              <TabPanel>
                <PickList event_code={this.state.event_code} picks={this.state.picklist}/>
              </TabPanel>
            </Tabs>
          </div>
          <Footer/>
        </div>
        );
    }
}

// return the URL to invoke the API method on the server.
function api(method) {
    return API + "/api/" + method;
}


export default Strategy;
