import dotenv from "dotenv"
dotenv.config()
import Discord from "discord.js"
import configJson from './config.js'
const token = process.env.token
import nl from "./lib/log.js"
const baseCommandModulePath = "./lib/commands/"
import fs from "fs";
import dayjs from "dayjs"
import af from 'dayjs/plugin/advancedFormat.js'
import webhookServer from "./lib/ingame/server/api.js"
import altFuncs from "./alternateFunctions.js"
dayjs.extend(af)
import mspt from "./lib/commands/mspt.js"
import online from "./lib/commands/online.js"
import ping from "./lib/commands/ping.js"
import skill from "./lib/commands/skill.js"
import status from "./lib/commands/status.js"
import tps from "./lib/commands/tps.js"
import value from "./lib/commands/value.js"
import fallback from "./lib/commands/fallback.js"

if ( process.argv[2] != undefined ) altFuncs.run()

const appStartTime = dayjs().format("x")

nl.info("Main", `Imports loaded.`)

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

nl.heading = "Drustcraft Bot"

client.once('ready', () => {
	client.user?.setActivity('www.drustcraft.com.au', { type: 'WATCHING' });
	nl.info('Main', `Ready after ${parseInt(dayjs().format("x")) - parseInt(appStartTime)}ms.`);
});

client.on('warn', (string: string) => {
	nl.verbose("Discord.JS Warning", string)
})

if (configJson.config.debug == true) {
	client.on('debug', (string: string) => {
		nl.verbose("Discord.JS Debug", string)
	})
	
	client.on('apiRequest', (apir: Discord.APIRequest) => {
		nl.verbose("Discord.JS HTTP", apir.method)
		nl.verbose("Discord.JS HTTP", apir.path)
	})
}

client.on('error', (error: Error) => {
	nl.error("Discord.JS Error", error.name)
	nl.error("Discord.JS Error", error.message)
	if (error.stack != undefined) {
		nl.error("Discord.JS Error", error.stack)
	}
})

client.on('interactionCreate', async (interaction: Discord.Interaction) => {
	if (!interaction.isCommand()) return;
	await interaction.deferReply();
	nl.verbose('Main', `Got command for ${interaction.commandName}.`);
	try {

		switch (interaction.commandName) {
			case "online":
				online.command(interaction)
				break
				
			case "mspt":
				mspt.command(interaction)
				break
				
			case "status":
				status.command(interaction)
				break
				
			case "skill":
				skill.command(interaction)
				break
				
			case "tps":
				tps.command(interaction)
				break
				
			case "value":
				value.command(interaction)
				break
				
			case "ping":
				ping.command(interaction)
				break
			
			default:
				fallback.command(interaction)
				break
		}
	
	} catch(e: any) {
		interaction.editReply("An error occurred while running this command.\It's most likely because the minecraft server is offline.")

		nl.error("HttpCondensed", e.name)
		nl.error("HttpCondensed", e.message)
		if (e.stack != undefined) {
			nl.error("HttpCondensed", e.stack)
		}
	}
});

client.login(token);

nl.info('Main', `Registered bot client events after ${parseInt(dayjs().format("x")) - parseInt(appStartTime)}ms, attempting to login.`);