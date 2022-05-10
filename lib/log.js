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

function info(title, text) {
	nl.info(title, text)
	appendLog(title, `Info    | ${text}`)
}

function verbose(title, text) {
	if (configJson.debug == 1) {
		nl.verbose(title, text)
	}
	appendLog(title ,`Verbose | ${text}`)
}

function http(title, text) {
	if (configJson.debug == 1) {
		nl.http(title, text)
	}
	appendLog(`HTTP    | [${title}] ${text}`)
}

function error(title, text) {
	nl.error(title, text)
	appendLog(`ERROR   | [${title}] ${text}`)
}

function appendLog(title, text) {
	for (textLine of text.split("\n")) {
		fs.appendFileSync(logFile, `[${dayjs().format("YYYY/MM/DD h:mm:ss A")}] | [${title}] ${c.stripColor(textLine)}\n`)
	}
}

module.exports = {
	info: info,
	verbose: verbose,
	http: http,
	error: error
}