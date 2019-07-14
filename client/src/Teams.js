import React from 'react';

import axios from 'axios';

class Teams extends React.Component {
	constructor(props) {
		super(props);
		this.state = {event_code: props.event_code, teams: []};
	}

	componentDidMount() {
		axios.get("http://localhost:3001/api/getTeams?event_code=" + this.state.event_code)
			.then((response) => this.setState({ teams: response.data.data }));
	}

	static getDerivedStateFromProps(props, state) {
		return {event_code: props.event_code};
	}

	render() {
		return(
			<div>
				<h2>Teams</h2>
				{this.state.event_code ? (
				<table>
				<thead>
				<tr><th>Number</th><th>Name</th></tr>
				</thead>
				<tbody>
				{this.state.teams.map(team => <tr key={team.team_number}><td>{team.team_number}</td><td>{team.name}</td></tr>)}
				</tbody>
				</table>) : <span>Select an event</span>}
				</div>
		);
	}
}

export default Teams;
