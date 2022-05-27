// Functions that the program shouldn't normally operate in, like clearing the logs directory.

import nl from "./lib/log"

nl.warn("Alternative Functions", "This log contains alternative functions log, this is not for the main bot!")

function registerSlashCommands() {
	require("./lib/alternativeFunctions/registerSlashCommands")()
}

function run() {
	switch (process.argv[2]) {
		case "registerSlashCommands":
			registerSlashCommands()
			break;
		default:
			nl.error("Alternate Functions", "Invaild command!")
	}

	process.exit(1)
}


module.exports = {
	run: run
}