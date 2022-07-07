// Output to a log file.
// Extension to npmlog.
import nl from "npmlog"
import fs from "fs"
import configJson from "../config"
import c from "ansi-colors"
import dayjs from 'dayjs'
const logFile = `logs/log-${dayjs().unix()}.log`

if (configJson.config.debug == true) {
	//@ts-ignore This is possible, hence the ts-ignore.
	nl.level = Infinity
	warn("Logger", "Debug mode is on, this mode is HIGHLY verbose and is for DEBUGGING ONLY!")
}

function info(title: string, text: string) {
	nl.info(title, text)
	appendLog(title, `Info | ${text}`)
}

function verbose(title: string, text: string) {
	if (configJson.config.debug == true) {
		nl.verbose(title, text)
	}
	appendLog(title ,`Verbose | ${text}`)
}

function http(title: string, text: string) {
	if (configJson.config.debug == true) {
		nl.http(title, text)
	}
	appendLog(title, `HTTP | ${text}`)
}

function error(title: string, text: string) {
	nl.error(title, text)
	appendLog(title, `ERROR | ${text}`)
}

function warn(title: string, text: string) {
	nl.warn(title, text)
	appendLog(title, `WARN | ${text}`)
}

function appendLog(title: string, text: string) {
	if (text != undefined) {
		for (const textLine of text.split("\n")) {
			fs.appendFileSync(logFile, `[${dayjs().format("YYYY/MM/DD h:mm:ss A")}] | [${title}] ${c.stripColor(textLine)}\n`)
		}
	}
}

export default {
	info: info,
	verbose: verbose,
	http: http,
	error: error,
	warn: warn,
	heading: nl.heading // Expose npmlog's heading variable.
}

info("Logger", `Logger loaded!`)