// Functions that the program shouldn't normally operate in, like clearing the logs directory.

const nl = require("npmlog");

function registerSlashCommands() {
	require('dotenv').config()
	const { SlashCommandBuilder } = require('@discordjs/builders');
	const { REST } = require('@discordjs/rest');
	const { Routes } = require('discord-api-types/v9');
	const configJson = require('./config.json');
	const token = process.env.token;
	const clientId = process.env.clientId;

	function errorFunc(error) {
		nl.error("Discord API Down!", error)
		process.exit(1)
	}

	nl.heading = "Drustcraft Bot"

	nl.info("Welcome!", "Registering Slash Commands...")

	nl.level = Infinity

	let commands = []

	for (i in configJson.commands) {
		nl.verbose("Command Table" ,`Regisering command "${configJson.commands[i].name}" with description "${configJson.commands[i].description}".`)
		commands.push(new SlashCommandBuilder().setName(configJson.commands[i].name).setDescription(configJson.commands[i].description))
		if (configJson.commands[i].options != undefined) {
			nl.verbose("Command Table" ,`"${configJson.commands[i].name}" has additional arguments that need to be processed.`)
			for (v in configJson.commands[i].options) {
				if (configJson.commands[i].options[v].type == 0) {
					nl.verbose("Command Table" ,`String Argument "${configJson.commands[i].options[v].name}" has a description of "${configJson.commands[i].options[v].description}" and`)
					if (configJson.commands[i].options[v].required) {
						nl.verbose("Command Table" ,`is required.`)
					} else {
						nl.verbose("Command Table" ,`is not required.`)
					}
					commands[commands.length - 1].addStringOption(option => option.setName(configJson.commands[i].options[v].name).setDescription(configJson.commands[i].options[v].description).setRequired(configJson.commands[i].options[v].required))
				}
				if (configJson.commands[i].options[v].type == 1) {
					nl.verbose("Command Table" ,`Boolean Argument "${configJson.commands[i].options[v].name}" has a description of "${configJson.commands[i].options[v].description}" and`)
					if (configJson.commands[i].options[v].required) {
						nl.verbose("Command Table" ,`is required.`)
					} else {
						nl.verbose("Command Table" ,`is not required.`)
					}
					commands[commands.length - 1].addBooleanOption(option => option.setName(configJson.commands[i].options[v].name).setDescription(configJson.commands[i].options[v].description).setRequired(configJson.commands[i].options[v].required))
				}	
			}
		}
	}

	commands.map(command => command.toJSON());

	nl.info("Command Table", "Finished, sending to Discord.")

	const rest = new REST({ version: '9' }).setToken(token);

	rest.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => nl.info("Complete", 'Successfully registered application commands. Exiting.'))
		.catch(errorFunc)
}

function run() {
	switch (process.argv[2]) {
		case "registerSlashCommands":
			registerSlashCommands()
			break;
		default:
			nl.error("Alternate Functions", "Invaild command!")
	}

	process.exit(1)
}


module.exports = {
	run: run
}