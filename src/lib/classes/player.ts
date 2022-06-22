import httpCondensed from "./../httpCondensed"
const fetch = httpCondensed.getJsonS

// Used internally so TypeScript plays nicely with it
interface IPlayerPre {
	uuid: string,
	name: string
}

class Player {
	name: string | undefined
	uuid: string | undefined
	data: Map<any, any> | undefined

	constructor(playerName: string) {
		fetch(`https://www.drustcraft.com.au/api/player?name=${playerName}`).then((data: any) => {
			this.uuid = data.uuid
			this.name = data.name
			fetch(`https://www.drustcraft.com.au/api/session?player=${data.uuid}`).then((dataOfPlayer: any) => {
				this.data = dataOfPlayer.sessions
			})
		})
	}
}

export default {
	Player: Player
}