let path = require('path');
let fs = require('fs');

let dataPath = path.join(__dirname, '../chirps.json');

let chirps = [
	{
		message: 'Hello World!',
		username: 'Nick',
	},
	{
		message: 'Come home soon!',
		username: 'Kalyn',
	},
	{
		message: "What's up man!",
		username: 'Zack',
	},
	{
		message: 'I love the park!',
		username: 'Ned',
	},
	{
		message: 'I love food time!',
		username: 'Benny',
	},
];

var chirpsJSON = JSON.stringify(chirps);

fs.writeFile(dataPath, chirpsJSON, err => {
	if (err) {
		console.log(err);
	}
	console.log(chirpsJSON);
});
