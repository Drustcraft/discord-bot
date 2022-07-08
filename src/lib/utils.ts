import flags from "./flags/flags"
import { ChannelType } from "discord-api-types/v10"
import configSecret from "../config.secret"
import Discord from "discord.js"

let botClient = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })
botClient.login(configSecret.config.token)

async function createCategoryIfItDoesntExist(name: string) {
	let category: any | undefined = botClient.guilds.cache.get(configSecret.config.guildId)?.channels.cache.find(channel => channel.name === name)
	
	if (category == undefined) {
		await botClient.guilds.cache.get(configSecret.config.guildId)?.channels.create(name, { type: "GUILD_CATEGORY" })
	}
}

async function createRoleForWorkshop(name: string) {
	let role: any = await botClient.guilds.cache.get(configSecret.config.guildId)?.roles.create({
		name: `${name} workshop`,
		color: `RANDOM`
	})

	return role
}

export default {
	createCategoryIfItDoesntExist: createCategoryIfItDoesntExist,
	createRoleForWorkshop: createRoleForWorkshop
}