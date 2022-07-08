import configSecret from "../../config.secret"
import configJson from "../../config"
const configPort = configJson.config.webhookListen.split(":")[1]
import nl from "../log"
import webhook from "../ingame/webhook"
import http from "node:http"
import flags from "./../flags/flags"
import { ChannelType } from "discord-api-types/v10"
import Discord from "discord.js"

import utils from "./../utils"

let botClient = utils.client

interface APIFunctionReturn {
	status: {
		statusCode: number,
		statusMessage: string
	},
	message: string
}

async function chatInGameToWebhook(postData: { playerUuid: string; message: string }): Promise<APIFunctionReturn> {
	if (typeof postData.playerUuid == "string" && typeof postData.message == "string") {
		await webhook.send(postData)
		return {
			status: {
				"statusCode": 200,
				"statusMessage": "OK"
			},
			message: "Request sent successfully"
		}
	} else {
		return {
			status: {
				"statusCode": 400,
				"statusMessage": "Invaild Request"
			},
			message: "The message format was not correct."
		}
	}
}

async function createRegion(postData: { type: string; name: string }): Promise<APIFunctionReturn> {
	if (postData.type == "workshop") {
		let role:any = await utils.createRoleForWorkshop(postData.name)

		let channel: any = await botClient.guilds.cache.get(configSecret.config.guildId)?.channels.create(`${postData.name}-workshop`, { type: "GUILD_TEXT" })

		await utils.createCategoryIfItDoesntExist("Workshops")
		utils.moveChannel(`${postData.name}-workshop`, `Workshops`)
		await channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false })

		await channel.permissionOverwrites.create(role, { VIEW_CHANNEL: true })

		return {
			status: {
				statusCode: 200,
				statusMessage: "OK"
			},
			message: `Workshop created.`
		}
	} else {
		return {
			status: {
				statusCode: 400,
				statusMessage: "Invaild Request"
			},
			message: `That region type is not used by anything yet.`
		}
	}
}

async function deleteRegion(postData: { type:string; name: string }): Promise<APIFunctionReturn> {
	if (postData.type == "workshop") {
		let guild: any = await botClient.guilds.cache.get(configSecret.config.guildId)
		await guild.roles.cache.find((role: { name: string }) => role.name === `${postData.name} workshop`).delete()

		await utils.createCategoryIfItDoesntExist("Archived")

		let channel: any = botClient.guilds.cache.get(configSecret.config.guildId)?.channels.cache.find(channel => channel.name === `${postData.name}-workshop` )
		utils.moveChannel(`${postData.name}-workshop`, `Archived`)
		channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: true })

		return {
			status: {
				statusCode: 200,
				statusMessage: "OK"
			},
			message: `Workshop deleted. (If it exists.)`
		}
	} else {
		return {
			status: {
				statusCode: 400,
				statusMessage: "Invaild Request"
			},
			message: `That region type is not used by anything yet.`
		}
	}
}

async function loadServer() {
	http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
		try {
			if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
				let data = ''
				
				req.on('data', chunk => {
					data += chunk
				});

				let returnData: APIFunctionReturn;
	
				req.on('end', async () => {

					let parsedData = JSON.parse(data)
					switch (req.url) {
						case "/ingame":
							if (req.method == "PUT") {
								returnData = await chatInGameToWebhook(parsedData)
							} else {
								res.statusCode = 405
								res.statusMessage = "Method not supported."
								res.end("Method is not yet supported by this API endpoints.")
							}
							break
						case "/region_create":
							if (req.method == "POST") {
								returnData = await createRegion(parsedData)
							} else {
								res.statusCode = 405
								res.statusMessage = "Method not supported."
								res.end("Method is not yet supported by this API endpoints.")
							}
							break
						case "/region_delete":
							if (req.method == "DELETE") {
								returnData = await deleteRegion(parsedData)
							} else {
								res.statusCode = 405
								res.statusMessage = "Method not supported."
								res.end("Method is not yet supported by this API endpoints.")
							}
							break
						default:
							res.statusCode = 404
							res.statusMessage = "Not found."
							res.end("That endpoint does not exist.")
							return
					}
					
					res.statusCode = returnData.status.statusCode
					res.statusMessage = returnData.status.statusMessage
					res.end(returnData.message)
					return
				
				});
			} else {
				res.statusCode = 405
				res.statusMessage = "Method not supported."
				res.end("Method is not yet supported by any API endpoints.")
				return
			}

		} catch {
			res.statusCode = 500
			res.statusMessage = "Internal server error."
			res.end("The server experienced an internal failure.")
		}
	}).listen(configPort)

	nl.info("Bot API Server", "Online and waiting for requests.")
}

export default loadServer