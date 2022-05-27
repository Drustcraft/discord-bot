export default {
	"commands": [
		{
			"name": "online",
			"description": "Lists who is online in Drustcraft."
		},
		{
			"name": "ping",
			"description": "Show the current ping of a player.",
			"options": [
				{
					"name": "player",
					"description": "An in-game player.",
					"type": 0,
					"required": true
				}
			]
		},
		{
			"name": "mspt",
			"description": "Show the current server MSPT."
		},
		{
			"name": "tps",
			"description": "Show the current server TPS."
		},
		{
			"name": "status",
			"description": "Tells you if you're missing something."
		},
		{
			"name": "code",
			"description": "Sell some magic beans (or code) to Drustcraft (Currently not being used).",
			"options": [
				{
					"name": "code",
					"description": "The code.",
					"type": 0,
					"required": true
				}
			]
		},
		{
			"name": "value",
			"description": "Get the value of something in Drustcraft.",
			"options": [
				{
					"name": "item",
					"description": "The item in Drustcraft (Note that this can be shortened).",
					"type": 0,
					"required": true
				}
			]
		},
		{
			"name": "skill",
			"description": "Show the skill levels of a player.",
			"options": [
				{
					"name": "player",
					"description": "A player.",
					"type": 0,
					"required": true
				}
			]
		}
	],
    "version": "1.1.0",
    "debug": 1,
    "webhookListen": "localhost:7443"
}