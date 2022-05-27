const nl = require("npmlog")
const fetch = require("./../httpCondensed").getJsonS

class Player {
	constructor(playerName) {
		fetch(`https://www.drustcraft.com.au/api/player?name=${playerName}`).then((data) => {
			self["uuid"] = data.uuid
			self["name"] = data.name
			fetch(`https://www.drustcraft.com.au/api/session?player=${data.uuid}`).then((dataOfPlayer) => {
				this.data = dataOfPlayer.sessions
				this.data.total_mob_kills = 0;
				for ([key, value] in Object.entries(this.data.mob_kills)) {
					this.data.total_mob_kills += value
				}
			})
		})
	}
}

module.exports = {
	Player: Player
}

console.log(new Player)