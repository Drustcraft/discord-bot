require('dotenv').config()
import Discord from "discord.js"
import configJson from './config'
const token = process.env.token
import nl from "./lib/log"
const baseCommandModulePath = "./lib/commands/"
import fs from "fs";
import dayjs from "dayjs"
import af from 'dayjs/plugin/advancedFormat'
import webhookServer = require("./lib/ingame/server/api")
dayjs.extend(af)

if ( process.argv[2] != undefined ) require("./alternateFunctions").run()

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

if (configJson.configJson.debug == true) {
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
		if (fs.existsSync(`${baseCommandModulePath}${interaction.commandName}.js`)) {
			const module = require(`${baseCommandModulePath}${interaction.commandName}.js`)
			module.command(interaction)
		} else {
			const module = require(`${baseCommandModulePath}fallback.js`)
			module.command(interaction)
		}
	} catch {
		interaction.editReply("An error occurred while running this command.\It's most likely because the minecraft server is offline.")
	}
});

client.login(token);

nl.info('Main', `Registered bot client events after ${parseInt(dayjs().format("x")) - parseInt(appStartTime)}ms, attempting to login.`);