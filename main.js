require('dotenv').config()
const Discord = require("discord.js")
const configJson = require('./config.json');
const token = process.env.token;
const clientId = process.env.clientId;
const nl = require("npmlog");
const baseCommandModulePath = "./lib/commands/"
const fs = require("fs");
const { config } = require('dotenv');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

if (configJson.versionInfo.enviornment == 0) {
	nl.level = Infinity
}

nl.heading = "Drustcraft Bot"

client.once('ready', () => {
	client.user.setActivity('www.drustcraft.com.au', { type: 'WATCHING' });
	nl.info('Base Bot', `Ready.`);
	if (!configJson.versionInfo.noStartAlert) {
		if (configJson.versionInfo.enviornment == 0) {
			client.channels.cache.get('963968336847327355').send('Ready, running on development environment!')
		} else {
			client.channels.cache.get('963968336847327355').send('Ready, running on production environment!')
		}
	}
});

client.on('warn', (string) => {
	nl.verbose("Discord.JS Warning", string)
})

if (configJson.versionInfo.enviornment == 0) {
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
	try {
		if (fs.existsSync(`${baseCommandModulePath}${interaction.commandName}.js`)) {
			const module = require(`${baseCommandModulePath}${interaction.commandName}.js`)
			module.command(interaction)
		} else {
			const module = require(`${baseCommandModulePath}fallback.js`)
			module.command(interaction)
		}
	} catch {
		interaction.editReply("An error occurred while running this command.\It's most likely because the server is offline.")
	}
});

client.login(token);