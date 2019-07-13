import React from 'react';

class PickList extends React.Component {
	render() {
		return (
<div className="pick-list">
				<table>
				  <thead>
					<tr><th>Rank</th><th>Number</th><th>Name</th><th>Desireabilty</th><th>Climb</th></tr>
				  </thead>
				  <tbody>
					<tr><td>1</td><td>259</td><td>Stream Bat Robotics</td><td>12.35</td><td>2.3</td></tr>
					<tr><td>2</td><td>2056</td><td>OP Robotics</td><td>11.07</td><td>2.3</td></tr>
				  </tbody>
				</table>
</div>
				);
	}
}


export default PickList;
