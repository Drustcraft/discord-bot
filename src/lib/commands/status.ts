const Discord = require("discord.js")

function command(interaction) {
	interaction.editReply("You can view the Drustcraft network status at https://status.drustcraft.com.au/")
}

module.exports = {
	command: command
}