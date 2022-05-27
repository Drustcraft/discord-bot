import Discord from "discord.js"
import configJson from "../../config"
const nl = require("./../log")

let webhookLink
if (configJson.config.debug == true) {
	webhookLink = `https://discord.com/api/webhooks/${process.env.devCId}/${process.env.devCSecret}`
} else {
	webhookLink = `https://discord.com/api/webhooks/${process.env.productionCId}/${process.env.productionCSecret}`
}

const webhookClient = new Discord.WebhookClient({ url: webhookLink });

if (configJson.config.debug == true) {
	webhookClient.on('debug', (string: string) => {
		nl.verbose("Discord.JS Webhook Debug", string)
	})
	
	webhookClient.on('apiRequest', (apir: Discord.APIRequest) => {
		nl.verbose("Discord.JS Webhook HTTP", apir.method)
		nl.verbose("Discord.JS Webhook HTTP", apir.path)
	})
}

let testNumber = 0

setInterval(() => {
	testNumber += 1

	webhookClient.send({
		content: `test ${testNumber}`
	})

}, 5000)