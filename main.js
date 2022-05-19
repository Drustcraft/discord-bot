require('dotenv').config()

if ( process.argv[2] != undefined ) { require("./alternateFunctions").run() } else {

	const Discord = require("discord.js")
	const configJson = require('./config.json');
	const token = process.env.token;
	const clientId = process.env.clientId;
	const nl = require("./lib/log");
	const baseCommandModulePath = "./lib/commands/"
	const fs = require("fs");
	const { config } = require('dotenv');
	const dayjs = require("dayjs")
	const af = require('dayjs/plugin/advancedFormat')

	// no export modules:

	const webhookServer = require("./lib/ingame/webhook")

	dayjs.extend(af)

	const appStartTime = dayjs().format("x")

	nl.info("Main", `Imports loaded.`)

	const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

	nl.heading = "Drustcraft Bot"

	client.once('ready', () => {
		client.user.setActivity('www.drustcraft.com.au', { type: 'WATCHING' });
		nl.info('Main', `Ready after ${dayjs().format("x") - appStartTime}ms.`);
	});

	client.on('warn', (string) => {
		nl.verbose("Discord.JS Warning", string)
	})

	if (configJson.debug == 1) {
		client.on('debug', (string) => {
			nl.verbose("Discord.JS Debug", string)
		})
		
		client.on('apiRequest', (apir) => {
			nl.verbose("Discord.JS HTTP", apir.method)
			nl.verbose("Discord.JS HTTP", apir.path)
		})
	}

	client.on('error', (string) => {
		nl.error("Discord.JS Error", string)
	})

	client.on('interactionCreate', async interaction => {
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

	nl.info('Main', `Registered bot client events after ${dayjs().format("x") - appStartTime}ms, attempting to login.`);

}