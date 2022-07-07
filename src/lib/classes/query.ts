import httpCondensed from "./../httpCondensed"

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
	mspt: number = 0
	players: number = 0
	tps: number = 0
	list: Array<playerInterface> = []

	constructor() {
		fetch("https://www.drustcraft.com.au/api/query").then((data: any) => {
			this.list = data.list
			this.players = parseInt(data.players)
			this.tps = parseInt(data.tps)
			this.mspt = parseInt(data.mspt)
			return this
		})
	}
}

export default {
	Query: Query
}