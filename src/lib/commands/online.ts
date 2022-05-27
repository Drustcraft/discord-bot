const Discord = require("discord.js")
const QueryModule = require("./../classes/query")

function command(interaction) {
	const ServerQuery = new QueryModule.Query
	ServerQuery.init().then(() => {

		if (ServerQuery.players == 0) {

			let message = `There are **0** players online.`

			interaction.editReply(message)

		} else if (ServerQuery.players == 1) {

			let message = `There is **1** player online.\nIt is ${ServerQuery.list[0].name}`
			
			interaction.editReply(message)

		} else {

			let message = `There are **${ServerQuery.players}** players online.\nThey are `
			for (i in ServerQuery.list) {
				if (i != 0) {
					message += `, ${ServerQuery.list[i].name}`
				} else {
					message += ServerQuery.list[i].name
				}
			}

			interaction.editReply(message)

		}

	})
}

module.exports = {
	command: command
}