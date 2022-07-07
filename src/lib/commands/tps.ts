import Discord from "discord.js"
import QueryModule from "./../classes/query"

function command(interaction: Discord.CommandInteraction) {
	const ServerQuery = new QueryModule.Query

	setInterval(() => {
		interaction.editReply(`Froels TPS: ${ServerQuery.tps} ticks / second`)
	}, 1000)

}

export default {
	command: command
}