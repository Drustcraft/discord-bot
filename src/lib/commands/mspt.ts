import Discord from "discord.js"
import QueryModule from "./../classes/query"

function command(interaction: Discord.Interaction) {
	const ServerQuery = new QueryModule.Query
	ServerQuery.init().then(() => {

		interaction.editReply(`Evalyn MSPT: ${ServerQuery.mspt}ms`)

	})
}

module.exports = {
	command: command
}