let nl = require("./../log.js")
let https;
try {
  	https = require('https');
} catch (err) {
	nl.error("HttpCondensed", "This version of Node.JS was compiled without crypto support! Aborting!")
	var CryptoSupportError = new Error("No Crypto Support in Node.JS, update Node.JS to the latest version.")
	CryptoSupportError.name = "HttpCondensed"
	nl.error("HttpCondensed", CryptoSupportError)
  	process.abort()
}

function getTextS(url) {
	nl.http("HttpCondensed", url)
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
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
			nl.error("HttpCondensed", `Got error: ${e.message}`);
		});
	})
}

function getJsonS(url) {
	return new Promise((resolve) => {
		getTextS(url).then((data) => {
			resolve(JSON.parse(data))
		})
	})
}

module.exports = {
	getJsonS: getJsonS,
	getTextS: getTextS,
}