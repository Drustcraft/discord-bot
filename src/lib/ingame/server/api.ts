import configJson from "../../../config"
const configPort = configJson.config.webhookListen.split(":")[1]
import nl from "../../log"
import webhook from "../webhook"

import http from "node:http"

function loadServer() {
	http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
		if (req.method == "PUT") {
			let data = ''
	
			req.on('data', chunk => {
				data += chunk
			});
	
			req.on('end', () => {
				let parsedData = JSON.parse(data)
				if (typeof parsedData.playerUuid == "string" && typeof parsedData.message == "string") {
					res.statusCode = 200
					res.statusMessage = "OK"
					res.end("Request sent sucessfully.")

					webhook.send(parsedData)
				} else {
					res.statusCode = 400
					res.statusMessage = "Invaild Request"
					res.end("The message format was not correct.")
				}
			});
		} else {
			res.statusCode = 405
			res.statusMessage = "Method not supported."
			res.end("Ingame -> Discord Webhook requires the use of PUT.")
		}
	}).listen(configPort)

	nl.info("Ingame Discord Chat Webhook Server", "Online and waiting for requests.")
}

export default loadServer