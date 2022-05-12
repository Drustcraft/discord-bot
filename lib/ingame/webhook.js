const Discord = require("discord.js")
const debug = require("./../../config.json").debug

const webhookServer = require("./server/expressApi")

let webhookLink
if (debug == 1) {
	webhookLink = `https://discord.com/api/webhooks/${process.env.devCId}/${process.env.devCSecret}`
} else {
	webhookLink = `https://discord.com/api/webhooks/${process.env.productionCId}/${process.env.productionCSecret}`
}

console.log(webhookLink)

const webhookClient = new Discord.WebhookClient({ url: webhookLink });
webhookClient.send({
	content: `test 1`
})