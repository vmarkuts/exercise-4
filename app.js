var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.render('search');
});

app.get('/results', function(req, res){
	var query = req.query.search;
	var key = '&apikey=thewdb';
	var url = 'http://www.omdbapi.com/?s=' + query + key;

	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render('results', {data:data});
		} else {
			console.log('OMDB doesn\'t response');
		}
	})
});

app.listen(4000, () => {
	console.log('the server is running on localhost:4000');
});