import Discord from "discord.js"
import joinCommand from "./subcommands/workshop/admin/forcejoin"
import leaveCommand from "./subcommands/workshop/admin/forceleave"

function command(interaction: Discord.CommandInteraction) {
	switch (interaction.options.getSubcommand()) {
		case "forcejoin":
			joinCommand.command(interaction)
			break
		case "forceleave":
			leaveCommand.command(interaction)
			break
	}
}

export default {
	command: command
}