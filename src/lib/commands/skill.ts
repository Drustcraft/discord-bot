import Discord from "discord.js"

function command(interaction: Discord.Interaction) {
	interaction.editReply("Due to a recent update that happened, this command is not avaliable. Please check back, well, frankly, idk when.\n- Project_HSI")
}

module.exports = {
	command: command
}

// CREATED HERE AS BOILER PLATE!