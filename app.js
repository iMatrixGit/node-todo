const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mysql = require('mysql');
const config = require('./config');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');
const routerController = require('./controllers/routerController');
const socketController = require('./controllers/socketController');
const chatApiController = require('./controllers/chatApiController');
const configurePassport = require('./config/passport.config');

const port = process.env.PORT || 3000;

mongoose.connect(config.getDBConnectionString());

// Test mysql integration
const dbConnection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'hadzhiev$QL',
   database : 'chat'
 });

dbConnection.connect();

app.use('/assets', express.static(`${__dirname}/public`));
app.use('/js', express.static(`${__dirname}/build`));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'nodetodosecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// configure passport
configurePassport(passport);

// controllers
setupController(app);
apiController(app, passport);
chatApiController(app, dbConnection);
routerController(app);

// server
const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${3000}`);
});

// socket.io controller
socketController(server, dbConnection);





