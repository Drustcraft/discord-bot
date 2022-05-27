const configPort = require("../../../config.json").webhookListen
const nl = require("../../log.js")
const webhook = require("../webhook")

// replaced with the Node HTTP library because express is dead?

import http from "node:http"

http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
	if (req.method == "PUT") {
		res.statusCode = 200
		res.statusMessage = "Sent to Discord Chat"
		res.end("Request sent sucessfully.")
	} else {
		res.statusCode = 405
		res.statusMessage = "Must use PUT"
		res.end("Ingame -> Discord Webhook requires the use of PUT.")
	}
}).listen(configPort)

nl.info("Ingame Discord Chat Webhook Server", "Online and waiting for requests.")

export default null