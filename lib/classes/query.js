const nl = require("npmlog")
const fetch = require("./../httpCondensed").getJsonS

class Query {
	constructor() {
		// Do nothing as promises are not possible in this context.
	}

	async init() {
		await fetch("https://www.drustcraft.com.au/api/query").then((data) => {
			this.list = data.list
			this.players = parseInt(data.players)
			this.tps = parseInt(data.tps)
			this.mspt = parseInt(data.mspt)
			// Return this, emulating Constructor()
			return this
		})
	}
}

module.exports = {
	Query: Query
}