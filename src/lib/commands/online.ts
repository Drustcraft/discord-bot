import Discord from "discord.js"
import QueryModule from "./../classes/query.js"

function command(interaction: Discord.CommandInteraction) {
	const ServerQuery = new QueryModule.Query()

	if (ServerQuery.players == 0) {

		let message = `There are **0** players online.`
		interaction.editReply(message)

	} else if (ServerQuery.players == 1) {
		//@ts-ignore
		let message = `There is **1** player online.\nIt is ${ServerQuery.list[0].name}`
		interaction.editReply(message)

	} else {

		let message = `There are **${ServerQuery.players}** players online.\nThey are `

		for (const i in ServerQuery.list) {

			if (i != "0") {

				message += `, ${ServerQuery.list[parseInt(i)].name}`

			} else {

				message += ServerQuery.list[i].name

			}

		}

		interaction.editReply(message)

	}
}

export default {
	command: command
}