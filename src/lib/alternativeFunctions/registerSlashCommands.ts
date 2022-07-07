import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandChannelOption, SlashCommandUserOption, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder} from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import process from 'process';
import configJson from '../../config';
import configSecrets from "./../../config.secret"
import nl from "./../log"

type SlashCommandBuilders = SlashCommandBuilder | SlashCommandSubcommandBuilder

async function registerSlashCommands() {

	const token = configSecrets.config.token;
	const clientId = configSecrets.config.clientId;

	nl.heading = "Drustcraft Bot"

	nl.info("Welcome!", "Registering Slash Commands...")

	let commands: SlashCommandBuilder[] = []

	for (const i in configJson.config.commands) {

		let currentCommand = configJson.config.commands[i]

		const currentSlashCommandBuilder: SlashCommandBuilder = new SlashCommandBuilder().setName(currentCommand.name).setDescription(currentCommand.description);

		nl.info("Register", `Registering a command with the name "${currentCommand.name}" and description "${currentCommand.description}"...`)

		if (currentCommand.type == configJson.CommandType.COMMAND) {

			nl.info("Register", `Which is a command.`)

			registerCommandBasedOnCommandObject(currentCommand, currentSlashCommandBuilder)

		} else if (currentCommand.type == configJson.CommandType.COMMANDS) {

			for (const v in currentCommand.subcommands) {

				nl.info("Register", `Which is a container for subcommands.`)
				
				//@ts-ignore
				let currentSubcommand = currentCommand.subcommands[v]

				let currentSubcommandBuilder = currentSlashCommandBuilder.addSubcommand((subcommand: SlashCommandSubcommandBuilder) => {
					subcommand.setName(currentSubcommand.name).setDescription(currentSubcommand.description)

					registerOptionsForCommand(currentSubcommand, subcommand)

					return subcommand

				})

			}

		} else if (currentCommand.type == configJson.CommandType.SCGROUP) {

			nl.info("Register", `Which is a container for subcommand groups.`)

			for (const v in currentCommand.subcommandgroups) {

				//@ts-ignore
				let currentSubcommandGroup = currentCommand.subcommandgroups[v]

				currentSlashCommandBuilder.addSubcommandGroup((scgroup: SlashCommandSubcommandGroupBuilder) => {

					nl.info("Register", `Registering a subcommand group with the name "${currentSubcommandGroup.name}" and description "${currentSubcommandGroup.description}" under "${currentCommand.name}".`)
					
					scgroup.setName(currentSubcommandGroup.name).setDescription(currentSubcommandGroup.description)

					for (const f in currentSubcommandGroup.subcommands) {
						
						let currentSubcommand = currentSubcommandGroup.subcommands[f]

						nl.info("Register", `Registering a subcommand with the name "${currentSubcommand.name}" and description "${currentSubcommand.description}" under group "${currentSubcommandGroup.name}" which is under "${currentCommand.name}".`)

						scgroup.addSubcommand((subcommand: SlashCommandSubcommandBuilder) => {

							subcommand.setName(currentSubcommand.name).setDescription(currentSubcommand.description)

							registerOptionsForCommand(currentSubcommand, subcommand)

							return subcommand

						})

					}

					return scgroup

				})

			}

		}

		commands.push(currentSlashCommandBuilder)
		
	}

	commands.map(command => command.toJSON())

	nl.info("Command Table", "Finished, sending to Discord.")

	nl.verbose("Command Table", JSON.stringify(commands))

	const rest = new REST({ version: '9' }).setToken(configSecrets.config.token)
	await rest.put(
		Routes.applicationCommands(clientId),
		{ body: commands },
	)

	nl.info("Complete", 'Successfully registered application commands. Exiting.')
	process.exit(0)
}

function registerCommandBasedOnCommandObject(currentCommand: any, builder: SlashCommandBuilders) {

	if (currentCommand.options != undefined) {

		registerOptionsForCommand(currentCommand, builder)

	}

	return builder

}

function registerOptionsForCommand(currentCommand: any, builder: SlashCommandBuilders) {

	nl.info("Register", `Registering options for "${currentCommand.name}"`)
	
	for (const v in currentCommand.options) {

		let currentOption = currentCommand.options[v]

		nl.info("Register", `Registering an option with name "${currentOption.name}" and description "${currentOption.description}" under the command "${currentCommand.name}"...`)
		
		if (currentOption.type == configJson.CommandOptionType.STRING) {

			nl.info("Register", `Which is a string.`)

			builder.addStringOption((option: SlashCommandStringOption) => {
				return option.setName(currentOption.name).setDescription(currentOption.description).setRequired(currentOption.required);
			})

		} else if (currentOption.type == configJson.CommandOptionType.BOOLEAN) {

			nl.info("Register", `Which is a boolean.`)

			builder.addBooleanOption((option: SlashCommandBooleanOption) => {
				return option.setName(currentOption.name).setDescription(currentOption.description).setRequired(currentOption.required);
			})

		} else if (currentOption.type == configJson.CommandOptionType.USER) {

			nl.info("Register", `Which is a user.`)

			builder.addUserOption((option: SlashCommandUserOption) => {
				return option.setName(currentOption.name).setDescription(currentOption.description).setRequired(currentOption.required);
			})

		}

	}

	return builder

}

export default { regsc: registerSlashCommands }