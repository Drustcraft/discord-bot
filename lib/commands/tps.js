const Discord = require("discord.js")
const QueryModule = require("./../classes/query")

function command(interaction) {
	const ServerQuery = new QueryModule.Query
	ServerQuery.init().then(() => {

		interaction.editReply(`Evalyn TPS: ${ServerQuery.tps}`)

	})
}

module.exports = {
	command: command
}