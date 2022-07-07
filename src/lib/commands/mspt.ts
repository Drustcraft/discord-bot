import Discord from "discord.js"
import QueryModule from "./../classes/query"

function command(interaction: Discord.CommandInteraction) {
	const ServerQuery = new QueryModule.Query()

	setTimeout(() => {
		interaction.editReply(`Froels MSPT: ${ServerQuery.mspt}ms`)
	}, 1000)
}

export default {
	command: command
}