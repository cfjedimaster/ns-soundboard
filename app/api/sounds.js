
const appSettings = require("application-settings");


const sounds = {
	getSounds() {
		let json = appSettings.getString('sounds', '');
		if(json === '') return [];
		else return JSON.parse(json);
	},
	saveSound(name, fileName) {
		let sounds = this.getSounds();
		sounds.push({
			name:name,
			fileName:fileName
		});
		//persist the bitch	
		//serialize it
		console.log('will this work?');
		let json = JSON.stringify(sounds);	
		console.log('my json brngs all the boys to the yard', json);
		appSettings.setString('sounds', json);
		console.log('i did it');
	}
}

module.exports = sounds;
