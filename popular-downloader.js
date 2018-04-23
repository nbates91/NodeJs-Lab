const request = require('request-promise');
const fs = require('fs');
const url = require('url');
const path = require('path');

let options = {
	method: 'GET',
	uri: 'https://reddit.com/r/popular.json',
};

let mediaArray = [];

async function getData() {
	try {
		let res = await request(options);
		let media = JSON.parse(res).data.children;
		for (let i = 0; i < media.length; i++) {
			// download each file
			let previewUri = media[i].data.preview.images[0].source.url;
			if (previewUri) {
				let options = {
					uri: previewUri,
					encoding: null,
				};
				console.log(options);
				let fileResponse = await request.get(options);
				const buffer = Buffer.from(fileResponse, 'utf8');
				fs.writeFileSync(`./downloads/${media[i].data.id}`, buffer);
			}
		}
	} catch (e) {
		console.log(e);
	}
}

getData();

// request(options)
// 	.then(function(res) {
// 		mediaArray.push(path.extname(media[i].data.url));
// 	})
// 	.then(function(obj) {
// 		const buffer = Buffer.from(mediaArray);
// 		fs.writeFileSync(`./downloads/${media[i].data.id}`, buffer);
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});
