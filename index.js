const app = require('express')();
const bodyParser = require('body-parser');

// CONFIG
// ============================================================================
app.set('views', 'views');           // In which directory are views located
app.set('view engine', 'ejs');       // Which view engine to use
app.use(express.static('./public')); // Where are static files located


app.use(bodyParser.json());          // Accept JSON objects in requests
// Accept extended form elements in requests
app.use(bodyParser.urlencoded({
	'extended': true
}));

// ROUTES
// ============================================================================
require('./routes/index')(app);

// SERVER INIT
// ============================================================================
app.listen(3000);