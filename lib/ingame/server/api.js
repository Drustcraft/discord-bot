const configPort = require("../../../config.json").webhookListen
const nl = require("../../log")
const webhook = require("../webhook")

// replaced with the Node HTTP library because express is dead?

const http = require("node:http")

http.createServer((req, res) => {
	if (req.method == "PUT") {
		res.statusCode = 200
		res.statusMessage = "Sent to Discord Chat"
		res.end()
	} else {
		res.statusCode = 405
		res.statusMessage = "Must use PUT"
		res.end("Ingame -> Discord Webhook requires the use of PUT")
	}
}).listen(configPort)

nl.info("Ingame Discord Chat Webhook Server", "Online and waiting for requests.")