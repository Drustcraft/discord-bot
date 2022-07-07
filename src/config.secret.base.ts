interface SecretConfig {
	token: string,
	clientId: string,
	webhookUrl: string,
	guildId: string
}

const config: SecretConfig = {

	token: "Bot token",
	clientId: "Client ID",
	webhookUrl: "Webhook URL",
	guildId: "The primary guild ID the bot will be in."

}

export default {
	config: config
}