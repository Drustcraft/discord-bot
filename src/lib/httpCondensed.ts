const secure = require("./httpCondensed/secure")
const insecure = require("./httpCondensed/insecure")

module.exports = {
	getTextNS: insecure.getTextNS,
	getJsonNS: insecure.getJsonNS,
	getTextS: secure.getTextS,
	getJsonS: secure.getJsonS,
}