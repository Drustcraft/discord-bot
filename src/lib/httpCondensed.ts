import secure from "./httpCondensed/secure"
import insecure from "./httpCondensed/insecure"

export default {
	getTextNS: insecure.getTextNS,
	getJsonNS: insecure.getJsonNS,
	getTextS: secure.getTextS,
	getJsonS: secure.getJsonS,
}