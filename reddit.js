const request = require('request-promise');
const path = require('path');
const fs = require('fs');

let dataPath = path.join(__dirname, './popular-articles.json');

const options = {
	method: 'GET',
	uri: 'https://reddit.com/r/popular.json',
};

let articleArray = [];

request(options)
	.then(function(res) {
		let articles = JSON.parse(res).data.children;
		for (var i = 0; i < articles.length; i++) {
			articleArray.push({
				articleTitle: articles[i].data.title,
				url: articles[i].data.url,
				author: articles[i].data.name,
			});
		}
		fs.writeFile(dataPath, JSON.stringify(articleArray), err => {
			if (err) {
				return console.log(err);
			}
			console.log(articleArray);
		});
	})
	.catch(function(err) {
		console.log(err);
	});
