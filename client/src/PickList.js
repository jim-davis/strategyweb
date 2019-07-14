import React from 'react';
import axios from 'axios';


class PickList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {picks: []};
	}

	// lifecycle events
	componentDidMount() {
		axios.get('http://localhost:3001/api/getPickList')
			.then((response) => this.setState({ picks: response.data.data }));
	}


	render() {
		return (
				<div className="pick-list">
				<table>
				  <thead>
					<tr><th>Rank</th><th>Number</th><th>Name</th><th>Climb</th></tr>
				  </thead>
				  <tbody>
				{this.state.picks.map(p => <Pick pick={p}/>)}
				  </tbody>
				</table>
                </div>
		);
	}
}

function Pick(props) {
	const pick = props.pick;
	return (<tr key={pick.team_number}>
		<td>{pick.rank}</td>
		<td>{pick.team_number}</td>
		<td>{pick.name}</td>
		<td>{pick.climb}</td>
		</tr>);
}

		
export default PickList;
