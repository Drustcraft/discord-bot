import Discord from "discord.js"

function command(interaction: Discord.CommandInteraction) {
	interaction.editReply("Oh no! You have ran into a fallback!\nIt's not your fault though, this command simply hasn't been created yet.\nAlthough if you see this message in the Drustcraft server, tell [Project HSI]! This means he has simply messed up, everyone makes mistakes sometimes.")
}

export default {
	command: command
}