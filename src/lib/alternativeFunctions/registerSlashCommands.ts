import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption} from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import configJson from '../../config';
import configSecrets from "./../../config.secret"
import nl from "./../log"

function registerSlashCommands() {

	const token = configSecrets.config.token;
	const clientId = configSecrets.config.clientId;

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

	let commands: SlashCommandBuilder[] = []

	for (const i in configJson.config.commands) {

		let currentCommand = configJson.config.commands[i]

		let currentSlashCommandBuilder = new SlashCommandBuilder().setName(configJson.config.commands[i].name).setDescription(configJson.config.commands[i].description)

		if (currentCommand.options != undefined) {

			for (const v in currentCommand.options) {

				let currentOption = currentCommand.options[v]
				
				if (currentOption.type == configJson.CommandOptionType.STRING) {

					currentSlashCommandBuilder.addStringOption((option: SlashCommandStringOption) => {
						return option.setName(currentOption.name).setDescription(currentOption.description).setRequired(currentOption.required);
					})

				}

				if (currentOption.type == configJson.CommandOptionType.BOOLEAN) {

					currentSlashCommandBuilder.addBooleanOption((option: SlashCommandBooleanOption) => {
						return option.setName(currentOption.name).setDescription(currentOption.description).setRequired(currentOption.required);
					})

				}

			}

		}

		commands.push(currentSlashCommandBuilder)

	}

	commands.map(command => command.toJSON());

	nl.info("Command Table", "Finished, sending to Discord.")

	const rest = new REST({ version: '9' }).setToken(configSecrets.config.token);
	//@ts-ignore
	rest.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => nl.info("Complete", 'Successfully registered application commands. Exiting.'))
		.catch(errorFunc)
}

export default registerSlashCommands