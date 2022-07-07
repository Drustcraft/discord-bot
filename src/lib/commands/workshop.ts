import Discord from "discord.js"
import joinCommand from "./subcommands/workshop/join"
import leaveCommand from "./subcommands/workshop/leave"

function command(interaction: Discord.CommandInteraction) {
	switch (interaction.options.getSubcommand()) {
		case "join":
			joinCommand.command(interaction)
			break
		case "leave":
			leaveCommand.command(interaction)
			break
	}
}

export default {
	command: command
}