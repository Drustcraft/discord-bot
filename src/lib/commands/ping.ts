import Discord from "discord.js"
import QueryModule from "./../classes/query"

function command(interaction: Discord.CommandInteraction) {
	const ServerQuery = new QueryModule.Query()

	for (const i in ServerQuery.list) {
		if (ServerQuery.list[i].name == interaction.options.getString('player')) {
			interaction.editReply(`The player **${ServerQuery.list[i].name}** is showing a ping of ${ServerQuery.list[i].ping}ms.`)
			// Stop execution of reply below.
			return
		}
	}

	interaction.editReply(`**${interaction.options.getString('player')}** does not appear to be online.`)
}

module.exports = {
	command: command
}