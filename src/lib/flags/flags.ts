//@ts-nocheck

import fs from "node:fs"
import nl from "./../log"

async function setFlag(groupId: string, setId: string, id: string, value: any, valueId?: string,) {
	let flags = JSON.parse(fs.readFileSync("./dist/flags.json"))

	nl.verbose("Flags", "Set")

	nl.verbose("Flags", value)

	nl.verbose("Flags", flags)

	if (valueId) {
		nl.verbose("Flags", `${groupId}.${setId}.${id}.${valueId}`)
		flags[groupId][setId][id][valueId] = value
	} else {
		nl.verbose("Flags", `${groupId}.${setId}.${id}`)
		flags[groupId][setId][id] = value
	}

	nl.verbose("Flags", flags)

	await fs.writeFileSync("./dist/flags.json", JSON.stringify(flags))
}

async function setFlagByCombinedId(combinedId: string, value: any) {
	let splitCombinedId: Array<string> = combinedId.split(".")
	if (splitCombinedId.length == 4) {
		setFlag(splitCombinedId[0], splitCombinedId[1], splitCombinedId[2], value, splitCombinedId[3])
	} else if (splitCombinedId.length == 3) {
		setFlag(splitCombinedId[0], splitCombinedId[1], splitCombinedId[2], value)
	} else {
		throw new TypeError("Must have atleast 3 Ids")
	}
}

function getFlag(groupId: string, setId: string, id: string, valueId?: string,): any {
	let flags = JSON.parse(fs.readFileSync("./dist/flags.json"))

	nl.verbose("Flags", "Get")

	nl.verbose("Flags", flags)

	if (valueId) {
		nl.verbose("Flags", `${groupId}.${setId}.${id}.${valueId}`)
		nl.verbose("Flags", flags[groupId][setId][id][valueId])
		return flags[groupId][setId][id][valueId]
	} else {
		nl.verbose("Flags", `${groupId}.${setId}.${id}`)
		nl.verbose("Flags", flags[groupId][setId][id])
		return flags[groupId][setId][id]
	}
}

function getFlagByCombinedId(combinedId: string): any {
	let splitCombinedId: Array<string> = combinedId.split(".")
	if (splitCombinedId.length == 4) {
		getFlag(splitCombinedId[0], splitCombinedId[1], splitCombinedId[2], splitCombinedId[3])
	} else if (splitCombinedId.length == 3) {
		getFlag(splitCombinedId[0], splitCombinedId[1], splitCombinedId[2])
	} else {
		throw new TypeError("Must have atleast 3 Ids")
	}
}

export default {
	setFlag: setFlag,
	setFlagByCombinedId: setFlagByCombinedId,
	getFlag: getFlag,
	getFlagByCombinedId: getFlagByCombinedId
}