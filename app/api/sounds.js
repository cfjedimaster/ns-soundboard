
const appSettings = require("application-settings");


const sounds = {
	getSounds() {
		let json = appSettings.getString('sounds', '');
		if(json === '') return [];
		else return JSON.parse(json);
	},
	removeSound(fileName) {
		let sounds = this.getSounds();
		sounds = sounds.filter(s => {
			return s.fileName != fileName;
		});
		//serialize it
		let json = JSON.stringify(sounds);	
		appSettings.setString('sounds', json);
	},
	saveSound(name, fileName) {
		let sounds = this.getSounds();
		sounds.push({
			name:name,
			fileName:fileName
		});
		//serialize it
		let json = JSON.stringify(sounds);	
		appSettings.setString('sounds', json);
	}
}

module.exports = sounds;
