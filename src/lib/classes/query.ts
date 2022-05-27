import httpCondensed from "./../httpCondensed.js"

const fetch = httpCondensed.getJsonS

interface playerInterface {
	name: string,
	ping: number,
	player: string
}

interface queryInterface {
	list: Array<playerInterface> | [],
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
		fetch("https://www.drustcraft.com.au/api/query").then((data: any) => {
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