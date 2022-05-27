import Discord from "discord.js"
import QueryModule from "./../classes/query"

function command(interaction: Discord.Interaction) {
	const ServerQuery = new QueryModule.Query
	ServerQuery.init().then(() => {

		interaction.editReply(`Evalyn TPS: ${ServerQuery.tps}`)

	})
}

module.exports = {
	command: command
}