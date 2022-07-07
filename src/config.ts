enum CommandOptionType {
	"STRING",
	"BOOLEAN",
	"USER"
}

enum CommandType {
	"COMMAND",
	"COMMANDS",
	"SCGROUP"
}

interface CommandOption {
	name: string,
	description: string,
	type: CommandOptionType,
	required: boolean,
	choices?: Array<any>
}

interface BaseCommand {
	name: string,
	description: string
}

interface Command extends BaseCommand {
	options?: Array<CommandOption>
	type: CommandType,
	subcommands?: Array<ForcedCommand>
	subcommandgroups?: Array<SubcommandGroup>
}

interface ForcedCommand extends BaseCommand {
	name: string,
	description: string,
	options?: Array<CommandOption>
}

interface SubcommandGroup extends BaseCommand {
	subcommands: Array<ForcedCommand>
}

interface Config {
	commands: Array<Command>,
	version: string,
	debug: boolean,
	webhookListen: string
}

// Actual configuration:

const config: Config = {
	"commands": [
		{
			"name": "online",
			"description": "Lists who is online in Drustcraft.",
			"type": CommandType.COMMAND
		},
		{
			"name": "ping",
			"description": "Show the current ping of a player.",
			"type": CommandType.COMMAND,
			"options": [
				{
					"name": "player",
					"description": "An in-game player.",
					"type": CommandOptionType.STRING,
					"required": true
				}
			]
		},
		{
			"name": "mspt",
			"description": "Show the current server MSPT.",
			"type": CommandType.COMMAND
		},
		{
			"name": "tps",
			"description": "Show the current server TPS.",
			"type": CommandType.COMMAND
		},
		{
			"name": "status",
			"description": "Tells you if you're missing something.",
			"type": CommandType.COMMAND
		},
		{
			"name": "value",
			"description": "Get the value of something in Drustcraft.",
			"type": CommandType.COMMAND,
			"options": [
				{
					"name": "item",
					"description": "The item in Drustcraft (Note that this can be shortened).",
					"type": CommandOptionType.STRING,
					"required": true
				}
			]
		},
		{
			"name": "skill",
			"description": "Show the skill levels of a player.",
			"type": CommandType.COMMAND,
			"options": [
				{
					"name": "player",
					"description": "A player.",
					"type": CommandOptionType.STRING,
					"required": true
				}
			]
		},
		{
			"name": "workshop",
			"description": "Joining and leaving workshops.",
			"type": CommandType.COMMANDS,
			"subcommands": [
				{
					"name": "join",
					"description": "Join a workshop.",
					"options": [
						{
							"name": "workshop",
							"description": "The workshop to join.",
							"type": CommandOptionType.STRING,
							"required": true
						}
					]
				},
				{
					"name": "leave",
					"description": "Leave a workshop.",
					"options": [
						{
							"name": "workshop",
							"description": "The workshop to leave.",
							"type": CommandOptionType.STRING,
							"required": true
						}
					]
				}
			]
		},
		{
			"name": "workshopadmin",
			"description": "Workshop commands for admins. Such as forcing members to join a workshop",
			"type": CommandType.COMMANDS,
			"subcommands": [
				{
					"name": "forcejoin",
					"description": "Make a player force-join a workshop.",
					"options": [
						{
							"name": "workshop",
							"description": "The workshop to join.",
							"type": CommandOptionType.STRING,
							"required": true
						},
						{
							"name": "user",
							"description": "The player to force-join the workshop.",
							"type": CommandOptionType.USER,
							"required": true
						}
					]
				},
				{
					"name": "forceleave",
					"description": "Make a player force-leave a workshop.",
					"options": [
						{
							"name": "workshop",
							"description": "The workshop to leave.",
							"type": CommandOptionType.STRING,
							"required": true
						},
						{
							"name": "user",
							"description": "The player to force-leave the workshop.",
							"type": CommandOptionType.USER,
							"required": true
						}
					]
				}
			]
		}
	],
    "version": "2.0.0",
    "debug": false,
    "webhookListen": "localhost:7443"
}

export default {
	config: config,
	CommandOptionType: CommandOptionType,
	CommandType: CommandType
}