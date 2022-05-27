// Output to a log file.
// Extension to npmlog.
const nl = require("npmlog")
const fs = require("fs")
const configJson = require("./../config.json")
const c = require("ansi-colors")
const dayjs = require('dayjs')
const logFile = `./logs/log-${dayjs().unix()}.log`

if (configJson.debug == 1) {
	nl.level = Infinity
}

function info(title: string, text: string) {
	nl.info(title, text)
	appendLog(title, `Info | ${text}`)
}

function verbose(title: string, text: string) {
	if (configJson.debug == 1) {
		nl.verbose(title, text)
	}
	appendLog(title ,`Verbose | ${text}`)
}

function http(title: string, text: string) {
	if (configJson.debug == 1) {
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