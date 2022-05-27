import Discord from "discord.js"
import QueryModule from "./../classes/query"

function command(interaction: Discord.CommandInteraction) {
	const ServerQuery = new QueryModule.Query()

	interaction.editReply(`Evalyn MSPT: ${ServerQuery.mspt}ms`)
}

module.exports = {
	command: command
}