import Discord from "discord.js"

function command(interaction: Discord.CommandInteraction) {
	interaction.editReply("You can view the Drustcraft network status at https://status.drustcraft.com.au/")
}

export default {
	command: command
}