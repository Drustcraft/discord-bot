import nl from "./../log.js"
import https from "node:https"

function getTextS(url: string) {
	nl.http("HttpCondensed", url)
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			const { statusCode } = res;
			const contentType = res.headers['content-type'];
		  
			if (statusCode !== 200) {
				var StatusCodeN200 = new Error(`Status code was ${statusCode} and not 200, probably invaild.`)
				StatusCodeN200.name = "HttpCondensed"
				nl.error("HttpCondensed", StatusCodeN200.name)
				nl.error("HttpCondensed", StatusCodeN200.message)
				if (StatusCodeN200.stack != undefined) {
					nl.error("HttpCondensed", StatusCodeN200.stack)
				}
				reject(StatusCodeN200)

				res.resume()
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

function getJsonS(url: string) {
	return new Promise((resolve) => {
		// string doesn't work.
		getTextS(url).then((data: any) => {
			resolve(JSON.parse(data))
		})
	})
}

export default {
	getJsonS: getJsonS,
	getTextS: getTextS,
}