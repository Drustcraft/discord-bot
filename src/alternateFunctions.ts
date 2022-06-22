// Functions that the program shouldn't normally operate in, like clearing the logs directory.

import nl from "./lib/log"
import regsc from "./lib/alternativeFunctions/registerSlashCommands"

function registerSlashCommands() {
	regsc()
}

function run() {
	nl.warn("Alternative Functions", "This log contains alternative functions log, this is not for the main bot!")

	switch (process.argv[2]) {
		case "registerSlashCommands":
			registerSlashCommands()
			break;
		default:
			nl.error("Alternate Functions", "Invaild command!")
	}

	process.exit(1)
}


export default {
	run: run
}