const { Pool, Client } = require('pg');

const pool = new Pool({
	user: 'postgres',
	password: 'postgres',
	//host: 'database.server.com',
	database: 'movies',
	port: 65432,
});

const port    = 3000;
const express = require('express'); 
const app     = express();
const http    = require('http').createServer(app);
const bodyParser   = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());
app.set('views', __dirname + '/static');
app.set("view engine","jade")

app.get('/show', (req, res) => {
	const id = req.query.id;
	let sql = {id: id};
	const query = "SELECT * FROM movies WHERE id = $1 LIMIT 1";
	pool.query(query, [sql.id], (error, resp) => {
		console.log(resp.rows[0]);
		res.render('show', { show: resp.rows[0] });
	});

});

app.post('/searchDB/feed', (req, res) => {
	//apply category and type filters
	let filters = req.body.filters,
		limit = req.body.limit;

	filters.category = filters.category.substring(8);	
	filters.type = filters.type.substring(4);
	let sql = {year : '', type: [], limit: limit};
	if(filters.category == 'New') sql.year = 2020;
	if(filters.category == 'Top') sql.year = 0;
	if(filters.category == 'Hot') sql.year = 2015;
	
	if(filters.type == 'Movies') sql.type = ['movie', 'tvMovie', 'tvShort'];
	if(filters.type == 'Shows') sql.type = ['tvSeries'];
	if(filters.type == 'All') sql.type = ['movie', 'tvMovie', 'tvShort', 'tvSeries'];

	console.log(sql.type.join(','));
	const query = "SELECT * FROM movies WHERE type = ANY($1) AND year = $2 AND votecount > 10000 ORDER BY rating DESC LIMIT $3";
	pool.query(query, [sql.type, sql.year, limit], (error, resp) => {
		console.log(error, resp.rows);
		res.json(resp.rows);
	});

	//send an array of items with IMDB rating, pretend video source, title, length, genres
});

app.post('/searchDB/title', (req, res) => {
	const title = '%' + req.body.title + '%';
	const limit = req.body.limit;
	console.log(title);

	const queryObj = {title: title, limit: limit};
	const query = "SELECT * FROM movies WHERE title LIKE $1 AND votecount > 10000 ORDER BY rating DESC LIMIT $2";
	pool.query(query, [queryObj.title, queryObj.limit], (error, resp) => {
		console.log(error, resp.rows);
		res.json(resp.rows);
	});
});


const server = http.listen(port, () => {
	console.log('Listening on', port);
});
