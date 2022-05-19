const Discord = require("discord.js")
const debug = require("./../../config.json").debug
const nl = require("./../log")

let webhookLink
if (debug == 1) {
	webhookLink = `https://discord.com/api/webhooks/${process.env.devCId}/${process.env.devCSecret}`
} else {
	webhookLink = `https://discord.com/api/webhooks/${process.env.productionCId}/${process.env.productionCSecret}`
}

const webhookClient = new Discord.WebhookClient({ url: webhookLink });

if (debug == 1) {
	webhookClient.on('debug', (string) => {
		nl.verbose("Discord.JS Webhook Debug", string)
	})
	
	webhookClient.on('apiRequest', (apir) => {
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