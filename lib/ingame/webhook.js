const Discord = require("discord.js")
const debug = require("./../../config.json").versionInfo.debug
let webhookLink
if (debug == 0) {
	webhookLink = `https://discord.com/api/webhooks/${process.env.devCId}/${process.env.devCSecret}`
} else {
	webhookLink = `https://discord.com/api/webhooks/${process.env.productionCId}/${process.env.productionCSecret}`
}
const webhookClient = new Discord.WebhookClient({ url: webhookLink });
/*
devCId=""
devCSecret=""
productionCId=""
productionCSecret=""
*/
webhookClient.send({
	content: ``
})