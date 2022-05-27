const nl = require("npmlog")
const fetch = require("./../httpCondensed").getJsonS

interface playerInterface {
	name: string,
	ping: string,
	player: string
}

interface queryInterface {
	list: Array<playerInterface>,
	players: string,
	tps: string,
	mspt: string
}

class Query {
	mspt: number | undefined = undefined
	players: number | undefined = undefined
	tps: number | undefined = undefined
	list: Array<playerInterface> | undefined = undefined

	constructor() {
		// Do nothing as promises are not possible in this context.
	}

	async init() {
		await fetch("https://www.drustcraft.com.au/api/query").then((data: queryInterface) => {
			this.list = data.list
			this.players = parseInt(data.players)
			this.tps = parseInt(data.tps)
			this.mspt = parseInt(data.mspt)
			// Return this, emulating Constructor()
			return this
		})
	}
}

export default {
	Query: Query
}