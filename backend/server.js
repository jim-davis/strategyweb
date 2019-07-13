const express = require('express');
var cors = require('cors');
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

router.get('/getTeams', (req, res) => 
		   connection.query("SELECT team_number,name FROM team ORDER BY team_number",
							(error, results) => 
							error ? res.json({success: false, error: error})
							: res.json({success: true, data: results})));
			
	
// All API requests are under the url /api, e.g. /api/getTeams
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
