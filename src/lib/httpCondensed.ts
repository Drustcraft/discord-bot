const secure = require("./httpCondensed/secure")
const insecure = require("./httpCondensed/insecure")

export default {
	getTextNS: insecure.getTextNS,
	getJsonNS: insecure.getJsonNS,
	getTextS: secure.getTextS,
	getJsonS: secure.getJsonS,
}