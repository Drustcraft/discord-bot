import Builders from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import configJson from '../../config';
import dotenv from 'dotenv'
dotenv.config()
const token = process.env.token;
const clientId = process.env.clientId;

function registerSlashCommands() {

	function errorFunc(error: Error) {
		nl.error("Alternative Functions", error.name)
		nl.error("Alternative Functions", error.message)
		if (error.stack != undefined) {
			nl.error("Alternative Functions", error.stack)
		}
		process.exit(1)
	}

	nl.heading = "Drustcraft Bot"

	nl.info("Welcome!", "Registering Slash Commands...")

	let commands: Builders.SlashCommandBuilder[] = []

	for (const i in configJson.commands) {

		nl.verbose("Command Table" ,`Regisering command "${configJson.commands[i].name}" with description "${configJson.commands[i].description}".`)
		commands.push(new Builders.SlashCommandBuilder().setName(configJson.commands[i].name).setDescription(configJson.commands[i].description))

		if (configJson.commands[i].options != undefined) {
			nl.verbose("Command Table" ,`"${configJson.commands[i].name}" has additional arguments that need to be processed.`)

			for (const v in configJson.commands[i].options) {

				if (configJson.commands?[i].options?[v].type == 0) {
					nl.verbose("Command Table" ,`String Argument "${configJson.commands[i].options[v].name}" has a description of "${configJson.commands[i].options[v].description}" and`)

					if (configJson.commands[i].options[v].required) {

						nl.verbose("Command Table" ,`is required.`)

					} else {

						nl.verbose("Command Table" ,`is not required.`)

					}
					commands[commands.length - 1].addStringOption((option: Builders.SlashCommandStringOption) => option.setName(configJson.commands[i].options[v].name).setDescription(configJson.commands[i].options[v].description).setRequired(configJson.commands[i].options[v].required))

				}
				if (configJson.commands[i].options?[v].type == 1) {
					nl.verbose("Command Table" ,`Boolean Argument "${configJson.commands[i].options[v].name}" has a description of "${configJson.commands[i].options[v].description}" and`)
					if (configJson.commands[i].options[v].required) {
						nl.verbose("Command Table" ,`is required.`)
					} else {
						nl.verbose("Command Table" ,`is not required.`)
					}
					commands[commands.length - 1].addBooleanOption((option: Builders.SlashCommandBooleanOption) => option.setName(configJson.commands[i].options[v].name).setDescription(configJson.commands[i].options[v].description).setRequired(configJson.commands[i].options[v].required))
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

export default registerSlashCommands