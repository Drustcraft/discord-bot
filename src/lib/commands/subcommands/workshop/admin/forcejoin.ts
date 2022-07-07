import Discord from "discord.js"
import npmlog from "../../../../log";

function command(interaction: Discord.CommandInteraction) {
	interaction.options.getString("workshop")

	if (interaction.guild == undefined) {
		interaction.editReply("You can not perform this action inside of a direct message, please perform this action in the Drustcraft Guild.")
	} else {
		let workshopRole = interaction.guild.roles.cache.find(role => role.name === `${interaction.options.getString("workshop")} workshop`);
		if (workshopRole == undefined) {
			interaction.editReply(`That workshop doesn't exist.`)
			return
		}
		//@ts-ignore
		interaction.guild.members.cache.find(user => user.displayName === interaction.options.getUser("user")?.username)?.roles.add(workshopRole)
		interaction.editReply(`Given ${interaction.options.getUser("user")?.username} the '${interaction.options.getString("workshop")} workshop' role.`)
	}
}

export default {
	command: command
}