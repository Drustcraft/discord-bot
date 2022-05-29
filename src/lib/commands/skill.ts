import Discord from "discord.js"

function command(interaction: Discord.CommandInteraction) {
	interaction.editReply("Due to a recent update that happened, this command is not avaliable. Please check back, well, frankly, idk when.\n- Project_HSI")
}

export default {
	command: command
}

// CREATED HERE AS BOILER PLATE!