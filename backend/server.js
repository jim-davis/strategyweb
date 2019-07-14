const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('./db');

const API_PORT = 3001;
const app = express();

app.use(cors());
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send('This is the API server for the Arctos Strategy Web app.  It expects Ajax queries to /api')
})

var connection = null;
db.with_connection(c => connection = c);

// all events
router.get('/getEvents', (req, res) => {
	connection.query(
		`SELECT DISTINCT event_code FROM frc_event ORDER BY event_code`,
		(error, results) => error
			? res.json({success: false, error: error})
		    : res.json({success: true, data: results}));
});

// ?event_code=2019onosh
router.get('/getTeams', (req, res) => {
	try {
		const event_code = req.query.event_code;
		console.log(`Getting teams from event ${event_code}`);
		connection.query(
			`SELECT DISTINCT t.team_number, team.name
             FROM frc_match m 
             INNER JOIN alliance a
                     ON a.match_id = m.match_id
             INNER JOIN alliance_member t
                     ON t.alliance_id = a.alliance_id
             INNER JOIN team
                     ON team.team_number = t.team_number
             WHERE m.event_code = ?
             ORDER BY t.team_number ASC`,
			[event_code],
			(error, results) => error
				? res.json({success: false, error: error})
			: res.json({success: true, data: results}));
	} catch (err) {
		res.json({success: false, error: err});
	}
});

router.get('/getPicklist', (req, res) => 
	// to be replaced by a complicated SQL query
	res.json({success: true, data: [
		{rank: 1, team_number: 259, name: "Stream Bat Robotics", climb: 2.3},
		{rank: 2, team_number: 2056, name: "Overpowered Robotics", climb: 2.1}
		]
			 }));


	
// All API requests are under the url /api, e.g. /api/getTeams
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
