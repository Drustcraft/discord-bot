import Discord from "discord.js"
import configJson from './config'
import configSecrets from "./config.secret"
const token = configSecrets.config.token
import nl from "./lib/log"
import dayjs from "dayjs"
import af from 'dayjs/plugin/advancedFormat'
import server from "./lib/server/api"
import altFuncs from "./lib/alternateFunctions"
import utils from "./lib/utils"
dayjs.extend(af)

if ( process.argv[2] != undefined ) { altFuncs.run() } else {

	nl.heading = "Drustcraft Bot"

	const appStartTime = dayjs().format("x")

	nl.info("Main", `Imports loaded.`)
	nl.info("Main", `Calling loadServer() for the API server.`)
	server()
	nl.info("Main", `Called.`)

	const client = utils.client

	utils.client.once('ready', () => {
		utils.client.user?.setActivity('www.drustcraft.com.au', { type: 'WATCHING' })
		nl.info('Main', `Ready after ${parseInt(dayjs().format("x")) - parseInt(appStartTime)}ms.`)
	});

	utils.client.on('warn', (string: string) => {
		nl.verbose("Discord.JS Warning", string)
	})

	if (configJson.config.debug == true) {
		utils.client.on('debug', (string: string) => {
			nl.verbose("Discord.JS Debug", string)
		})
	
		utils.client.on('apiRequest', (apir: Discord.APIRequest) => {
			nl.verbose("Discord.JS HTTP", apir.method)
			nl.verbose("Discord.JS HTTP", apir.path)
		})
	}

	utils.client.on('error', (error: Error) => {
		nl.error("Discord.JS Error", error.name)
		nl.error("Discord.JS Error", error.message)
		if (error.stack != undefined) {
			nl.error("Discord.JS Error", error.stack)
		}
	})

	utils.client.on('interactionCreate', async (interaction: Discord.Interaction) => {
		if (!interaction.isCommand()) return;
		await interaction.deferReply();
		nl.verbose('Main', `Got command for ${interaction.commandName}.`);
		try {

			let commandModule = await import(`./lib/commands/${interaction.commandName}.js`)
			commandModule.default.command(interaction)
	
		} catch(e: any) {

			interaction.editReply("An error occurred while running this command.\nIt's most likely because the Minecraft server is offline.\nOr the command just. doesn't exist.")

			nl.error("Main", e.name)
			nl.error("Main", e.message)
			if (e.stack != undefined) {
				nl.error("Main", e.stack)
			}

		}
	});

	nl.info('Main', `Registered bot client events after ${parseInt(dayjs().format("x")) - parseInt(appStartTime)}ms, attempting to login.`);

	utils.client.login(token);

}