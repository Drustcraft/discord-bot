// Functions that the program shouldn't normally operate in, like clearing the logs directory.

import nl from "./lib/log"
import regsc from "./lib/alternativeFunctions/registerSlashCommands"
import process from "node:process"

function registerSlashCommands() {
	regsc.regsc()
}

function run() {
	nl.warn("Alternative Functions", "This log contains alternative functions log, this is not for the main bot!")

	switch (process.argv[2]) {
		case "registerSlashCommands":
			nl.info("Alternative Functions", `Running registerSlashCommand`)

			registerSlashCommands()
			break;
		default:
			nl.error("Alternate Functions", "Invaild command!")
	}
}


export default {
	run: run
}