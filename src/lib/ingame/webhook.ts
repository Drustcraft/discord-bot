import Discord from "discord.js"
import configJson from "../../config"
import nl from "./../log"
import httpCondensed from "./../httpCondensed"
import configSecrets from "./../../config.secret"

let webhookLink: string = configSecrets.config.webhookUrl

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

function send(messageTable: { message: string, playerUuid: string }) {
	httpCondensed.getJsonS(`https://sessionserver.mojang.com/session/minecraft/profile/${messageTable.playerUuid}`).then((data) => {
		//@ts-ignore .name will exist
		webhookClient.send({ content: messageTable.message, avatarURL: `https://minotar.net/helm/${messageTable.playerUuid}/128.png`, username: data.name })
	})
}

export default {
	send: send
}