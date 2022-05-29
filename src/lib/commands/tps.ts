import Discord from "discord.js"
import QueryModule from "./../classes/query.js"

function command(interaction: Discord.CommandInteraction) {
	const ServerQuery = new QueryModule.Query

	interaction.editReply(`Evalyn TPS: ${ServerQuery.tps}`)

}

export default {
	command: command
}