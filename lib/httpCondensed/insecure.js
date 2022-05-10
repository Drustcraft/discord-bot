let nl = require("./../log.js")
let http = require('http');

function getTextNS(url) {
	nl.http("HttpCondensed", url)
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			const { statusCode } = res;
			const contentType = res.headers['content-type'];
		  
			let error;
			// Any 2xx status code signals a successful response but
			// here we're only checking for 200.
			if (statusCode !== 200) {
				var StatusCodeN200 = new Error(`Status code was ${statusCode} and not 200, probably invaild.`)
				StatusCodeN200.name = "HttpCondensed"
				  nl.error("HttpCondensed", StatusCodeN200)
			}
			if (error) {
				nl.error("HttpCondensed", error.message)
				  // Consume response data to free up memory
				  res.resume();
				  return;
			}
		  
			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				resolve(rawData)
			});
		}).on('error', (e) => {
			console.error(`Got error: ${e.message}`);
		});
	})
}

function getJsonNS(url) {
	return JSON.parse(getTextNS(url))
}

module.exports = {
	getJsonNS: getJsonNS,
	getTextNS: getTextNS,
}