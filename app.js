var express = require('express')
	, path = require('path')
	, favicon = require('serve-favicon')
	, logger = require('morgan')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')
	, routes = require('./routes/index')
	, users = require('./routes/users')
	, exphbs = require('express-handlebars')
	, mongoose = require('mongoose');

mongoose.connect('mongodb://levassio:test@ds027741.mongolab.com:27741/standupped');

var app = express();

var hb = exphbs.create({
	defaultLayout: 'main',
	helpers: {
		prettifyDate: function (date) {
			return date.toDateString();
		}
	}
});

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hb.engine);

app.set('view engine', 'handlebars');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
