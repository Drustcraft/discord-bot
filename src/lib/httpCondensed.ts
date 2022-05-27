import secure from "./httpCondensed/secure.js"
import insecure from "./httpCondensed/insecure.js"

export default {
	getTextNS: insecure.getTextNS,
	getJsonNS: insecure.getJsonNS,
	getTextS: secure.getTextS,
	getJsonS: secure.getJsonS,
}